
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Details = require('../models/Userinfo');
const User = require("../models/Login");
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const checkTextInPDF = async (filePath, textToCheck) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        const text = data.text.toLowerCase();
        return textToCheck.every(textItem => text.includes(textItem.toLowerCase()));
    } catch (err) {
        console.error('Error processing PDF:', err);
        return false;
    }
};

router.post('/', upload.single('file'), async (req, res) => {
    const { firstname, lastname, email, phone, address, state, city, pincode } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.filled) {
            console.log("Form already filled");
            return res.status(400).json({ message: 'Form already filled' });
        }

        const textToCheck = ["22adr073", "naveen"];
        const filePath = path.join(__dirname, '../uploads', file.filename);

        const textFound = await checkTextInPDF(filePath, textToCheck);
        const status = textFound ? 'approved' : 'rejected';
        const fileUrl = `/uploads/${file.filename}`;

        await Details.create({
            firstname,
            lastname,
            email,
            phone,
            address,
            city,
            pincode,
            state,
            date: new Date(),
            fileUrl,
            status
        });

        user.filled = true;
        await user.save();

        res.status(201).send({ message: 'Uploaded successfully' });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ message: 'Server error' });
    }
});

module.exports = router;

