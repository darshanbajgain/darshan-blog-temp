import { NextResponse } from 'next/server';
import { watchPosts } from '@/lib/post-watcher';

// Initialize the watcher when the API route is first loaded
if (process.env.NODE_ENV === 'production') {
  console.log('🚀 Starting post watcher in production mode...');
  watchPosts();
} else {
  console.log('⚠️ Post watcher not started in development mode');
}

export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const FORM_ID = process.env.CONVERTKIT_FORM_ID
    const API_KEY = process.env.CONVERTKIT_API_KEY
    const TAG_ID = process.env.CONVERTKIT_TAG_ID

    if (!API_KEY || !FORM_ID || !TAG_ID) {
      throw new Error(`Missing ConvertKit configuration: ${!API_KEY ? 'API_KEY ' : ''}${!FORM_ID ? 'FORM_ID ' : ''}${!TAG_ID ? 'TAG_ID' : ''}`)
    }

    // First, check if the subscriber exists
    const checkSubscriberUrl = `https://api.convertkit.com/v3/subscribers?api_secret=${API_KEY}&email_address=${email}`

    const checkResponse = await fetch(checkSubscriberUrl)
    const checkData = await checkResponse.json()

    // If subscriber exists (total_subscribers > 0)
    if (checkData.total_subscribers > 0) {
      return NextResponse.json(
        { message: 'You\'re already subscribed to the newsletter!' },
        { status: 200 }
      )
    }

    // If not subscribed, proceed with subscription
    const convertKitUrl = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`

    const requestBody = {
      api_key: API_KEY,
      email: email,
      first_name: firstName || '',
      tags: [parseInt(TAG_ID)],
      fields: {
        source: 'Website Newsletter Form'
      }
    }

    const response = await fetch(
      convertKitUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to subscribe')
    }

    return NextResponse.json({
      message: 'Thanks for subscribing!',
      subscriber: responseData.subscription
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      {
        error: 'Failed to subscribe to the newsletter. Please try again later.',
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
