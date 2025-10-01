import axios from 'axios';
import crypto from 'crypto';

function hashData(data) {
  return data ? crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex') : null;
}

export async function POST(req) {
  try {
    const { eventName, eventId, emails, phones, firstName, lastName, country, userAgent, sourceUrl, products, value, currency } = await req.json();
    
    // Check if required environment variables are present
    if (!process.env.FB_ACCESS_TOKEN) {
      console.warn('FB_ACCESS_TOKEN environment variable is missing - Facebook events will be skipped');
      return new Response(JSON.stringify({ 
        message: 'Facebook tracking not configured - event logged but not sent to Facebook',
        eventData: { eventName, eventId }
      }), { status: 200 });
    }
    
    if (!process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
      console.warn('NEXT_PUBLIC_FB_PIXEL_ID environment variable is missing - Facebook events will be skipped');
      return new Response(JSON.stringify({ 
        message: 'Facebook tracking not configured - event logged but not sent to Facebook',
        eventData: { eventName, eventId }
      }), { status: 200 });
    }
    
    // Validate required fields
    if (!eventName || !eventId) {
      console.error('Missing required fields: eventName or eventId');
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Safely parse total value
    const valueParsed = value ? parseFloat(value.replace(/,/g, '')) : 0;
    
    // Map product details safely
    const contents = products && Array.isArray(products) ? products.map((product) => ({
      id: (product.sku || product.productid || "").toString(),
      title: product.productname || "",
      quantity: product.quantity || 1,
      item_price: product.item_price || parseFloat((product.unit_price || "0").replace(/,/g, "")),
    })) : [];

    const fbPayload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          user_data: {
            em: emails ? [hashData(emails)] : [],
            ph: phones ? [hashData(phones)] : [],
            fn: firstName ? hashData(firstName) : null,
            ln: lastName ? hashData(lastName) : null,
            country: country ? hashData(country) : null,
            client_user_agent: userAgent,
            client_ip_address: req.headers.get('x-forwarded-for') || req.ip || null,
          },
          custom_data: {
            currency: currency || "INR",
            value: valueParsed,
            contents,
            content_type: "product",
          },
          action_source: "website",
          event_source_url: sourceUrl,
          event_id: eventId,
        },
      ],
      access_token: process.env.FB_ACCESS_TOKEN,
    };

    const pixel_id = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    console.log('Sending Facebook event:', { eventName, eventId, pixel_id });
    
    const fbResponse = await axios.post(`https://graph.facebook.com/v18.0/${pixel_id}/events`, fbPayload);
    
    console.log('Facebook API response:', fbResponse.data);
    return new Response(JSON.stringify(fbResponse.data), { 
      status: fbResponse.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error in Facebook API Request:', error.message);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    console.error('Full error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error',
      details: error.message,
      response: error.response ? error.response.data : null
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}