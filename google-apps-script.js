// Google Apps Script to handle form submissions
// Deploy this as a Web App in Google Apps Script

// INSTRUCTIONS:
// 1. Go to https://script.google.com/home
// 2. Click "New Project"
// 3. Paste this code
// 4. Click "Deploy" > "New deployment"
// 5. Select "Web app" type
// 6. Set "Execute as" to "Me"
// 7. Set "Who has access" to "Anyone"
// 8. Click "Deploy"
// 9. Copy the Web App URL and paste it into SubmitEventForm.tsx (replace YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL)

const SPREADSHEET_ID = '1IcXPaJ8Zv8pVGIy5ZrNEOclZIQ3PmWpIAdjYBNTSD38';
const SHEET_NAME = 'Event Suggestions'; // Change this to match your sheet tab name

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // If the sheet doesn't exist, create it
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Timestamp',
        'Contact Name',
        'Email',
        'Venue',
        'Band/Artist',
        'Date',
        'Time',
        'Description',
        'Event URL',
        'Status'
      ]);
    }

    // Add the new row
    sheet.appendRow([
      new Date(data.timestamp),
      data.contactName,
      data.email,
      data.venue,
      data.band,
      data.date,
      data.time,
      data.description,
      data.url,
      'Pending Review'
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testSubmission() {
  const testData = {
    timestamp: new Date().toISOString(),
    contactName: 'Test User',
    email: 'test@example.com',
    venue: 'Test Venue',
    band: 'Test Band',
    date: '2025-10-25',
    time: '20:00',
    description: 'Test event description',
    url: 'https://example.com'
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
