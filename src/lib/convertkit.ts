interface Broadcast {
  subject: string;
  content: string;
  description?: string;
  email_layout_template?: string;
}

export async function sendBroadcast(post: {
  title: string;
  description: string;
  content: string;
  slug: string;
}) {
  const API_KEY = process.env.CONVERTKIT_API_KEY;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/';

  if (!API_KEY) {
    throw new Error('Missing ConvertKit API key');
  }

  // Create HTML content for the email
  const emailContent = `
    <h2>${post.title}</h2>
    <p>${post.description}</p>
    <p>Read the full post here: <a href="${SITE_URL}/posts/${post.slug}">${SITE_URL}/posts/${post.slug}</a></p>
  `;

  const broadcast: Broadcast = {
    subject: `New Blog Post: ${post.title}`,
    content: emailContent,
    description: `Broadcast for new blog post: ${post.title}`,
  };

  try {
    const response = await fetch('https://api.convertkit.com/v3/broadcasts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ broadcast }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Failed to send broadcast:', error);
    throw error;
  }
}