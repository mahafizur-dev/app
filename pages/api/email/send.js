import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fullName, email, meetingDate, meetingTime, meetingPlatform } =
    req.body;

  if (!email || !fullName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email Content
    const mailOptions = {
      from: `"Presswayy Team" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email, // Client's email
      subject: "Meeting Confirmation - Presswayy Demo",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2EC866;">Meeting Confirmed!</h2>
          <p>Hi <strong>${fullName}</strong>,</p>
          <p>Thanks for scheduling a demo with Presswayy. We are excited to show you how our AI platform can transform your business.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Meeting Details</h3>
            <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${meetingDate}</p>
            <p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${meetingTime}</p>
            <p style="margin: 5px 0;"><strong>💻 Platform:</strong> ${meetingPlatform}</p>
          </div>

          <p>A calendar invitation will follow shortly.</p>
          
          <br/>
          <p>Best regards,</p>
          <p><strong>The Presswayy Team</strong></p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email API Error:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
