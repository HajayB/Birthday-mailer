const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

exports.sendBirthdayMail = async (to, username)=>{
    const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Happy Birthday</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: Arial, Helvetica, sans-serif;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 24px;
          border-radius: 8px;
        }

        .header {
          text-align: center;
          padding-bottom: 16px;
        }

        .header h1 {
          color: #333333;
          margin: 0;
        }

        .content {
          color: #555555;
          line-height: 1.6;
          font-size: 16px;
        }

        .content p {
          margin: 16px 0;
        }

        .cta {
          display: inline-block;
          margin-top: 24px;
          padding: 12px 20px;
          background-color: #4f46e5;
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        }

        .footer {
          margin-top: 32px;
          text-align: center;
          font-size: 13px;
          color: #999999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Happy Birthday, ${username}! 🎉</h1>
        </div>

        <div class="content">
          <p>
            We just wanted to take a moment to wish you a very happy birthday.
            May this year bring you good health, success, and plenty of reasons
            to smile.
          </p>

          <p>
            Thank you for being a part of our community. We truly appreciate you
            and hope your special day is an amazing one.
          </p>

          <a href="#" class="cta">Celebrate Today 🎂</a>
        </div>

        <div class="footer">
          <p>
            © ${new Date().getFullYear()} Ajayi Basit<br />
            This message was sent with ❤️ just for you.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;
    try{
        await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to,
            subject:"Happy Birthday",
            html, 
        });
        console.log("Birthday mail sent to ", to);
        return true;
    }catch(error){
        console.error("Mail error: ", error);
        return false;
    }
}