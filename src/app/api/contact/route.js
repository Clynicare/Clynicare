import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, phoneNumber, email, description } = await req.json();

    console.log("✅ Received data:", { name, phoneNumber, email, description });

    if (!name || !phoneNumber || !email || !description) {
      console.error("❌ Missing fields!");
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // ✅ FIX: Ignore self-signed certificate errors
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OFFICE_EMAIL,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nPhone: ${phoneNumber}\nEmail: ${email}\nDescription: ${description}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);

    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("❌ Error in API:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 });
  }
}
