import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (request, response) => {
  response.json({ status: "ok" });
});

app.post("/api/contact", async (request, response) => {
  const { name, email, businessType, projectNeed } = request.body;

  if (!name || !email || !projectNeed) {
    return response.status(400).json({
      message: "Name, email, and project need are required.",
    });
  }

  const requiredEnv = [
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
    "BUSINESS_EMAIL",
  ];
  const missingEnv = requiredEnv.filter((key) => !process.env[key]);

  if (missingEnv.length > 0) {
    console.error(`Missing email configuration: ${missingEnv.join(", ")}`);
    return response.status(500).json({
      message: `Missing email configuration: ${missingEnv.join(", ")}`,
    });
  }

  try {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeBusinessType = escapeHtml(businessType || "Not shared");
    const safeProjectNeed = escapeHtml(projectNeed).replace(/\n/g, "<br />");

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Enquiry" <${process.env.SMTP_FROM}>`,
      to: process.env.BUSINESS_EMAIL,
      replyTo: email,
      subject: `New website enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Client Email: ${email}`,
        `Business Type: ${businessType || "Not shared"}`,
        "",
        "Project Need:",
        projectNeed,
      ].join("\n"),
      html: `
        <h2>New website enquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Client Email:</strong> ${safeEmail}</p>
        <p><strong>Business Type:</strong> ${safeBusinessType}</p>
        <p><strong>Project Need:</strong></p>
        <p>${safeProjectNeed}</p>
      `,
    });

    response.json({ message: "Enquiry sent successfully." });
  } catch (error) {
    console.error("Email send failed:", error.message);
    response.status(500).json({
      message: `Unable to send enquiry email: ${error.message}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Contact server running on http://localhost:${port}`);
});
