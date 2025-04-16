import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Create email content
    const content = {
      to: process.env.SENDGRID_TO_EMAIL || 'darshanbajgai@gmail.com', // Your email
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@darshanbajgain.com.np', // Verified sender in SendGrid
      subject: `Contact Form: ${subject || 'New message from your blog'}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await sgMail.send(content);

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
