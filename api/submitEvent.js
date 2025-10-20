/**
 * Vercel Serverless Function: Submit Event to Google Sheets
 *
 * This endpoint receives event submissions and appends them to the Google Sheet
 */

import { google } from 'googleapis';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    console.log('📥 Received event submission');

    // Validate environment variables
    const requiredEnvVars = ['GOOGLE_PROJECT_ID', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_CLIENT_EMAIL', 'LIVE_MUSIC_SHEET_ID'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingEnvVars.length > 0) {
      console.error('❌ Missing environment variables:', missingEnvVars);
      return res.status(500).json({
        error: 'Server configuration error',
        missing: missingEnvVars
      });
    }

    // Extract form data
    const {
      bandName,
      genre,
      venueName,
      venueCity,
      venueType,
      date,
      time,
      coverCharge,
      description,
      imageUrl,
      eventUrl,
      submitterName,
      submitterEmail
    } = req.body;

    // Validate required fields
    if (!bandName || !venueName || !date || !time) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['bandName', 'venueName', 'date', 'time']
      });
    }

    console.log('✅ Validation passed');

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare row data to append
    const rowData = [
      bandName || '',
      genre || 'Unknown',
      venueName || '',
      venueCity || '',
      venueType || 'Venue',
      date || '',
      time || '',
      coverCharge || 'Free',
      description || '',
      imageUrl || 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800',
      eventUrl || '',
      new Date().toISOString(), // Submission timestamp
      submitterName || '',
      submitterEmail || ''
    ];

    console.log('📊 Appending to Google Sheet');

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.LIVE_MUSIC_SHEET_ID,
      range: 'submit_events!A:N', // Columns A through N
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData]
      }
    });

    console.log('✅ Event submitted successfully');

    return res.status(200).json({
      success: true,
      message: 'Event submitted successfully! It will appear on the site once approved.',
      event: {
        bandName,
        venueName,
        date,
        time
      }
    });

  } catch (error) {
    console.error('❌ Error submitting event:', error);

    return res.status(500).json({
      error: 'Failed to submit event',
      message: error.message
    });
  }
}
