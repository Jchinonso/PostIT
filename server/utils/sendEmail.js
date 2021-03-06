import nodemailer from 'nodemailer';

const sendEmail = (emails, sentBy, groupName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'noreply.mypostit@gmail.com',
      pass: process.env.PASSWORD
    },
    tls: {
    }
  });

  const mailOptions = {
    from: 'noreply.postitapp@gmail.com',
    to: `${emails}`,
    subject: `New message in group: ${groupName}`,
    html: `<p>You have a new message in <b>${groupName}</b>, <b>sent by:</b> ${sentBy}</p><br />
    <a href="https://mypostit-cp.herokuapp.com">Click here</a> to view the message! <br />
    <p>Note: You received this mail because you have an account on PostIt and belong to the group ${groupName},<br />
    Please ignore if this mail seem to be a mistake.</p>`,
  };
  transporter.sendMail(mailOptions, () => {
  });
};

export default sendEmail;
