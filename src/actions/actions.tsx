'use server';

import { InvoiceInfo, InvoicePdf } from '@/app/InvoiceDocument';
import { renderToBuffer } from '@react-pdf/renderer';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const generateAndEmailPdf = async (
  invoiceInfo: InvoiceInfo,
  destinationAddress: string,
) => {
  const buffer = await renderToBuffer(<InvoicePdf info={invoiceInfo} />);
  await sendEmailWithAttachment(buffer, destinationAddress);
};

const sendEmailWithAttachment = async (
  buffer: Buffer<ArrayBufferLike>,
  destinationAddress: string,
) => {
  // copied from nodemailer docs https://nodemailer.com/
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'maddison53@ethereal.email',
      pass: 'jn7jnAPss4f63QBp6D',
    },
  });

  const mailOptions: Mail.Options = {
    from: 'hunt.liamjoseph@gmail.com',
    to: destinationAddress,
    subject: 'Your invoice from garage',
    text: 'Please see the attached PDF invoice.',
    attachments: [
      {
        // might be nice to put the invoice number here
        filename: 'garage_invoice.pdf',
        content: buffer,
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

