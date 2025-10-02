import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com",
    },
  });

  // Generate HTML + plain text
  const emailHTML = mailGenerator.generate(options.mailgenContent);
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "aniketsinghn10@gmail.com",
    to: options.email,   
    subject: options.subject || "Task Manager Notification",
    text: emailTextual,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error(" Email Service Failed. Check your Mailtrap credentials.");
    console.error(error);
  }
};

// Mailgen templates
const emailVerificationMailgenContent = (username, verificationUrl) => ({
  body: {
    name: username,
    intro: "Welcome to our Project Management Website! We’re excited to have you onboard.",
    action: {
      instructions: "To verify your email, click this button:",
      button: {
        color: "#22BC66",
        text: "Verify your email",
        link: verificationUrl,
      },
    },
    outro: "Need help or have questions? Just reply to this email.",
  },
});

const forgotpasswordMailgenContent = (username, passwordResetUrl) => ({
  body: {
    name: username,
    intro: "We received a request to reset your password.",
    action: {
      instructions: "Click the button below to reset your password:",
      button: {
        color: "#22BC66",
        text: "Reset password",
        link: passwordResetUrl,
      },
    },
    outro: "If you didn’t request this, you can safely ignore this email.",
  },
});

export { sendEmail, emailVerificationMailgenContent, forgotpasswordMailgenContent };
