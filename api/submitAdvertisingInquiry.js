/**
 * Vercel Serverless Function: Submit Advertising Inquiry to Google Sheets
 *
 * This endpoint receives advertising inquiries and appends them to the Google Sheet
 */

import { google } from 'googleapis';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    console.log('📥 Received advertising inquiry');

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
      businessName,
      contactName,
      contactEmail,
      message
    } = req.body;

    // Validate required fields
    if (!businessName || !contactName || !contactEmail) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['businessName', 'contactName', 'contactEmail']
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
      businessName || '',
      contactName || '',
      contactEmail || '',
      message || '',
      new Date().toISOString(), // Submission timestamp
    ];

    console.log('📊 Appending to Google Sheet');

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.LIVE_MUSIC_SHEET_ID,
      range: 'advertising_inquiries!A:E', // Columns A through E
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData]
      }
    });

    console.log('✅ Advertising inquiry submitted successfully');

    return res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you soon.',
      inquiry: {
        businessName,
        contactName,
        contactEmail
      }
    });

  } catch (error) {
    console.error('❌ Error submitting advertising inquiry:', error);

    return res.status(500).json({
      error: 'Failed to submit inquiry',
      message: error.message
    });
  }
}
