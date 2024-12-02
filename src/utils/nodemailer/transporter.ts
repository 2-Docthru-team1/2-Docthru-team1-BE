import nodemailer from 'nodemailer';
import transportOption from '#utils/nodemailer/transport-option.js';

const transporter = nodemailer.createTransport(transportOption);

export default transporter;
