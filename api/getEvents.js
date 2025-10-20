/**
 * Vercel Serverless Function: Fetch Live Music Events from Google Sheets
 *
 * This endpoint reads event data from a Google Sheet and returns it as JSON
 */

import { google } from 'googleapis';

export default async function handler(req, res) {
  // Only accept GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    console.log('📥 Fetching events from Google Sheet');

    // Validate environment variables are set
    const requiredEnvVars = ['GOOGLE_PROJECT_ID', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_CLIENT_EMAIL', 'LIVE_MUSIC_SHEET_ID'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingEnvVars.length > 0) {
      console.error('❌ Missing environment variables:', missingEnvVars);
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Missing required environment variables',
        missing: missingEnvVars
      });
    }

    // Initialize Google Sheets API with service account credentials
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    console.log('📊 Reading from Google Sheet');
    console.log('Sheet ID:', process.env.LIVE_MUSIC_SHEET_ID);

    // Fetch all event data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.LIVE_MUSIC_SHEET_ID,
      range: 'Events!A2:K', // Skip header row, columns A-K
    });

    const rows = response.data.values || [];
    console.log(`📦 Retrieved ${rows.length} events from sheet`);

    // Transform rows into event objects
    const events = rows
      .filter(row => row[0]) // Filter out empty rows
      .map((row, index) => ({
        id: `event-${index}`,
        bandName: row[0] || '',
        genre: row[1] || 'Unknown',
        venueName: row[2] || '',
        venueCity: row[3] || '',
        venueType: row[4] || 'Venue',
        date: row[5] || '',
        time: row[6] || '',
        coverCharge: row[7] || 'Free',
        description: row[8] || '',
        imageUrl: row[9] || 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800',
        eventUrl: row[10] || ''
      }));

    console.log('✅ Successfully fetched and transformed events');

    // Return events as JSON
    return res.status(200).json({
      success: true,
      count: events.length,
      events: events,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error fetching events:', error);

    return res.status(500).json({
      error: 'Failed to fetch events',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
