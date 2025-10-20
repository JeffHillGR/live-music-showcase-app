# Google Sheets Integration Setup

## Overview
This guide will help you connect the "Suggest an Event" form to your Google Sheets spreadsheet.

## Spreadsheet Details
- **Spreadsheet ID**: `1IcXPaJ8Zv8pVGIy5ZrNEOclZIQ3PmWpIAdjYBNTSD38`
- **Current URL**: https://docs.google.com/spreadsheets/d/1IcXPaJ8Zv8pVGIy5ZrNEOclZIQ3PmWpIAdjYBNTSD38/edit

## Setup Instructions

### Step 1: Create Google Apps Script
1. Open your Google Sheets spreadsheet
2. Click **Extensions** > **Apps Script**
3. Delete any existing code in the editor
4. Copy the entire contents of `google-apps-script.js` from this project
5. Paste it into the Apps Script editor
6. **IMPORTANT**: Update the `SHEET_NAME` constant (line 21) to match your actual sheet tab name
   - Default is `'Event Suggestions'`
   - If you want to use an existing tab, change it to that tab's name

### Step 2: Deploy as Web App
1. In the Apps Script editor, click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Live Music Event Submissions"
   - **Execute as**: **Me** (your account)
   - **Who has access**: **Anyone** (required for the website to submit data)
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** > **Go to [Your Project Name]** (if you see a warning)
   - Click **Allow**
7. **COPY THE WEB APP URL** - you'll need this in the next step

### Step 3: Update the React Form
1. Open `src/components/SubmitEventForm.tsx`
2. Find line 36: `const scriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';`
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'` with your actual Web App URL (in quotes)
   - Example: `const scriptUrl = 'https://script.google.com/macros/s/AKfycbz.../exec';`
4. Save the file

### Step 4: Test the Integration
1. Go to http://localhost:3004 (or your current dev server port)
2. Click the orange "Suggest an Event" button
3. Fill out the form with test data
4. Click "Suggest Event"
5. Check your Google Sheets - a new row should appear with the submitted data

## Spreadsheet Columns
The script will create these columns automatically if the sheet is new:
1. **Timestamp** - When the form was submitted
2. **Contact Name** - Person who submitted the event
3. **Email** - Their email address
4. **Venue** - Event venue name
5. **Band/Artist** - Performer name
6. **Date** - Event date
7. **Time** - Event time
8. **Description** - Optional event description
9. **Event URL** - Optional link to event page
10. **Status** - Defaults to "Pending Review"

## Troubleshooting

### Form submits but data doesn't appear in sheets
- Check that the Web App URL in `SubmitEventForm.tsx` is correct
- Verify the deployment settings (Execute as: Me, Who has access: Anyone)
- Check the Apps Script execution logs (View > Executions)

### Script authorization errors
- Make sure you authorized the script during deployment
- Re-deploy if you made changes to the script

### Wrong sheet tab
- Update the `SHEET_NAME` constant in the Apps Script to match your tab name
- Redeploy the web app after making changes

## Using the Same Setup for Multiple Projects
If you want to reuse this for BudE or other projects:
1. The same Apps Script can handle multiple forms if you pass a "project" identifier
2. Or create separate Apps Script projects for each spreadsheet
3. Just update the `SPREADSHEET_ID` and deploy each one separately

## Security Note
The Web App URL is publicly accessible (required for web forms), but:
- Only writes data to the spreadsheet (doesn't read or expose data)
- All submissions are logged with timestamps
- You can review and moderate submissions before publishing events
