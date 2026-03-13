/**
 * ═══════════════════════════════════════════════════════
 * ADITYA SECURITY LABS — Contact Form → Google Sheets
 * ═══════════════════════════════════════════════════════
 * HOW TO DEPLOY:
 *   1. Open your Google Sheet
 *   2. Extensions → Apps Script
 *   3. Paste this entire file, replacing any existing code
 *   4. Click "Deploy" → "New deployment"
 *   5. Type: Web App
 *   6. Execute as: Me
 *   7. Who has access: Anyone
 *   8. Click "Deploy" → copy the Web App URL
 *   9. Paste that URL into app.js where it says PASTE_YOUR_SCRIPT_URL_HERE
 * ═══════════════════════════════════════════════════════
 */

// ── CONFIG ──────────────────────────────────────────────
const SPREADSHEET_ID = '1piPTmi3f2yu7YSF8a5DUrzgMvpiMtRVa8e5Pz2W1dHY';
const SHEET_NAME     = 'Leads';         // Tab name inside your Google Sheet
const NOTIFY_EMAIL   = '';              // Optional: your email for instant alerts
// ────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data   = JSON.parse(e.postData.contents);
    const sheet  = getOrCreateSheet();
    const now    = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Append the new lead row
    sheet.appendRow([
      now,
      data.name    || '',
      data.company || '',
      data.email   || '',
      data.scope   || '',
      'NEW',          // Status column — you can manually change to "Contacted", "Closed" etc.
    ]);

    // Optional email notification
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to:      NOTIFY_EMAIL,
        subject: `[ASL Lead] ${data.name} from ${data.company}`,
        body:    `New scoping call request:\n\nName: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\n\nScope:\n${data.scope}`,
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles preflight CORS OPTIONS request (browsers send this before POST)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'ASL Lead Collector active' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Creates the "Leads" sheet with header row if it doesn't already exist
function getOrCreateSheet() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet   = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp (IST)', 'Name', 'Company', 'Email', 'Infrastructure / Scope', 'Status']);

    // Style the header row
    const header = sheet.getRange(1, 1, 1, 6);
    header.setBackground('#0d1117');
    header.setFontColor('#00aaff');
    header.setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(5, 320);
  }

  return sheet;
}
