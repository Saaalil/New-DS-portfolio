"use server";

import nodemailer from "nodemailer";

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export async function sendContactEmail(data: ContactFormData) {
    const { name, email, message } = data;

    if (!name || !email || !message) {
        return { success: false, error: "All fields are required." };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, error: "Invalid email address." };
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS, // Gmail App Password (not your real password)
            },
        });

        // Email sent TO you (the portfolio owner)
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            html: `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
                    <div style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); padding: 24px 32px;">
                        <h1 style="margin: 0; font-size: 20px; color: #fff;">📬 New Contact Form Message</h1>
                    </div>
                    <div style="padding: 32px;">
                        <div style="margin-bottom: 20px; padding: 16px; background: #111827; border-radius: 8px; border-left: 3px solid #06b6d4;">
                            <p style="margin: 0 0 4px; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">From</p>
                            <p style="margin: 0; font-size: 16px; font-weight: 600;">${name}</p>
                        </div>
                        <div style="margin-bottom: 20px; padding: 16px; background: #111827; border-radius: 8px; border-left: 3px solid #8b5cf6;">
                            <p style="margin: 0 0 4px; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Email</p>
                            <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none; font-size: 16px;">${email}</a>
                        </div>
                        <div style="padding: 16px; background: #111827; border-radius: 8px; border-left: 3px solid #10b981;">
                            <p style="margin: 0 0 8px; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                            <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    <div style="padding: 16px 32px; background: #111827; text-align: center; font-size: 12px; color: #64748b;">
                        Sent from your portfolio contact form
                    </div>
                </div>
            `,
        });

        // Auto-reply to the sender
        await transporter.sendMail({
            from: `"Salil Hiremath" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `Thanks for reaching out, ${name}!`,
            html: `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e2e8f0; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
                    <div style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); padding: 24px 32px;">
                        <h1 style="margin: 0; font-size: 20px; color: #fff;">👋 Thanks for reaching out!</h1>
                    </div>
                    <div style="padding: 32px;">
                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hi ${name},</p>
                        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px; color: #cbd5e1;">
                            Thank you for your message! I've received it and will get back to you as soon as possible.
                        </p>
                        <div style="margin: 24px 0; padding: 16px; background: #111827; border-radius: 8px; border-left: 3px solid #06b6d4;">
                            <p style="margin: 0 0 4px; font-size: 12px; color: #94a3b8; text-transform: uppercase;">Your message</p>
                            <p style="margin: 0; font-size: 14px; color: #94a3b8; white-space: pre-wrap;">${message}</p>
                        </div>
                        <p style="font-size: 15px; line-height: 1.6; margin: 0; color: #cbd5e1;">
                            Best regards,<br/>
                            <strong style="color: #06b6d4;">Salil Hiremath</strong>
                        </p>
                    </div>
                    <div style="padding: 16px 32px; background: #111827; text-align: center; font-size: 12px; color: #64748b;">
                        This is an automated response from salilhiremath.vercel.app
                    </div>
                </div>
            `,
        });

        return { success: true };
    } catch (error) {
        console.error("Email send error:", error);
        return { success: false, error: "Failed to send message. Please try again later." };
    }
}
