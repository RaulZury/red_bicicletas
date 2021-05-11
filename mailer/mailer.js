const express = require('express');
const mailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'adelia.aufderhar54@ethereal.email',
        pass: 'h2UdgWWCHu6gsyZX2D'
    }
};

module.exports = mailer.createTransport(mailConfig);