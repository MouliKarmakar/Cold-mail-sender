# 📧 Cold Mail Sender

A full-stack Node.js application for sending personalized cold mails to HR professionals with email tone customization, real-time preview, and automatic tracking via Google Sheets.

## 🎯 Project Overview

**Cold Mail Sender** is a web-based tool designed to help job seekers craft and send personalized cold emails to HR professionals and hiring managers. The application combines an interactive frontend for email generation with a robust backend for email delivery and tracking, all integrated with Google Sheets for persistent record management.

### Key Features

- 🎨 **Multiple Tone Styles**: Professional, Conversational, Bold, and Humble email templates
- 👁️ **Real-time Preview**: Live preview of the email as you customize it
- 📊 **Automatic Tracking**: Emails automatically logged to Google Sheets upon successful send
- 📱 **Responsive Design**: Beautiful, modern UI with email-style HTML templates
- 🔐 **Secure Email Handling**: Built-in error handling and validation
- 💾 **Data Persistence**: All email records stored in Google Sheets with metadata

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js + TypeScript
- **Frontend**: Vanilla JavaScript + HTML5 + CSS3
- **Database**: Google Sheets (via Google Sheets API)
- **Email Service**: Gmail (via Nodemailer)
- **Authorization**: JWT with Google Service Account

---

## 📦 Dependencies Overview

This project relies on two critical external libraries for its core functionality:

### 1. **Nodemailer** (^8.0.5)
Handles SMTP-based email delivery through Gmail.

**What it does:**
- Sends emails via Gmail's SMTP server
- Provides HTML and plain-text email support
- Handles authentication through app-specific passwords

**Where it's used:**
- `src/controllers/mailer.ts` - Email transporter configuration
- `src/controllers/sevices.ts` - Email dispatch logic

### 2. **googleapis** (^171.4.0)
Google's official library for interacting with Google APIs.

**What it does:**
- Authenticates with Google Sheets API using JWT
- Creates, reads, and appends data to Google Sheets
- Manages spreadsheet ranges and formatting

**Where it's used:**
- `src/controllers/spreadSheetController.ts` - Sheet management and data logging

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+) and npm
- Gmail account with [App Password](https://support.google.com/accounts/answer/185833) enabled
- Google Cloud Project with Sheets API enabled
- Google Service Account JSON credentials

### Step 1: Clone & Install Dependencies

```bash
git clone <repository-url>
cd Cold_Mail_Sender
npm install
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the project root:

```env
# Gmail Configuration (for Nodemailer)
USER_EMAIL=your-email@gmail.com
USER_EMAIL_PASSWORD=your-app-specific-password

# Google Sheets Configuration (for googleapis)
SPREADSHEET_ID=your-spreadsheet-id
SHEET_NAME=Cold_Mail_Tracker
GOOGLE_SERVICE_ACCOUNT={"type":"service_account","project_id":"...","..."}
```

#### Getting Gmail App Password
1. Enable 2-factor authentication on your Google Account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer"
4. Copy the generated password to `.env` as `USER_EMAIL_PASSWORD`

#### Getting Google Sheets Credentials

1. **Create a Google Cloud Project**:
   - Visit [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project

2. **Enable Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create Service Account**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in the name and proceed
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key" → "JSON"
   - Download the JSON file

4. **Generate Spreadsheet ID**:
   - Create a new Google Sheet
   - The ID is in the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

5. **Share Spreadsheet with Service Account**:
   - Copy the `client_email` from the JSON file
   - Share your Google Sheet with this email address

6. **Add to .env**:
   ```env
   GOOGLE_SERVICE_ACCOUNT=<paste the entire JSON content as a string>
   ```

---

## 🔧 How Nodemailer is Implemented

### Email Transport Configuration
**File**: `src/controllers/mailer.ts`

```typescript
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD  // App-specific password
    }
})
export default transporter;
```

### Email Sending Flow
**File**: `src/controllers/sevices.ts`

1. Receives email payload from frontend
2. Validates required fields (hrEmail, role, company, emailBody)
3. Builds HTML email using template builder
4. Sends via Nodemailer transporter
5. Logs entry to Google Sheets on success
6. Returns success/error response to frontend

```typescript
await transporter.sendMail({
    from: `"${senderName}" <${process.env.EMAIL_USER}>`,
    to: hrEmail,
    subject: `${role} — Application | ${senderName}`,
    text: emailBody,      // Plain-text fallback
    html: buildEmailHTML(/*...*/),  // Rich HTML email
});
```

---

## 📊 How Google Sheets API is Implemented

### Authentication with Service Account
**File**: `src/controllers/spreadSheetController.ts`

```typescript
import { google } from "googleapis";

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT!);

const auth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
```

### Key Functions

#### `ensureSheetExists()`
- Checks if the tracking sheet exists
- Creates it if missing with column headers
- Headers: `Index | HR Email | Company Name | Position | Response Status | Did Contacted`

#### `getNextIndex()`
- Reads column A to determine the next row number
- Ensures sequential indexing of records

#### `addEntry(data)`
- Called after successful email send
- Appends new row with email metadata:
  - HR Email
  - Company Name
  - Position Applied
  - Response Status (Sent/Failed/Pending)
  - Contact Status (Yes/No)

### Data Flow

```
sendEmail() → transporter.sendMail() → addEntry() → Google Sheets
```

---

## 📁 Project Structure

```
Cold_Mail_Sender/
├── src/
│   ├── app.ts                          # Express app setup
│   ├── server.ts                       # HTTP server entry point
│   ├── routes/
│   │   └── mail.ts                     # Mail API routes
│   └── controllers/
│       ├── mailer.ts                   # Nodemailer configuration
│       ├── sevices.ts                  # Email sending logic
│       ├── spreadSheetController.ts    # Google Sheets operations
│       └── Templates/
│           ├── emailTemplate.ts        # HTML email template builder
│           └── SimplifiedEmailTemplate.ts
├── public/
│   ├── index.html                      # Main page
│   ├── script.js                       # Frontend logic (tone selection, preview, sending)
│   ├── styles.css                      # Styling
│   └── default.html
├── package.json                        # Dependencies & scripts
├── tsconfig.json                       # TypeScript configuration
└── .env                                # Environment variables (not in git)
```

---

## 🔌 API Endpoints

### POST `/api/mail/send`
Sends a cold email and logs the attempt to Google Sheets.

**Request Body:**
```json
{
  "hrName": "John Doe",
  "hrEmail": "hr@company.com",
  "company": "Tech Corp",
  "role": "Frontend Developer",
  "emailBody": "Custom email body",
  "senderName": "Your Name",
  "senderEmail": "you@gmail.com",
  "senderPhone": "1234567890",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "portfolio": "https://yourportfolio.com",
  "github": "https://github.com/yourprofile",
  "resume": "https://drive.google.com/file/d/..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Missing required fields." || "Failed to send email. Check your credentials."
}
```

---

## 🎨 Email Template Features

The application generates professional HTML emails with:
- Gradient header with sender name
- Performance statistics (30% Core Web Vitals, 20% Bundle Size, Component docs, Shining Star award)
- Skill cards (Frontend, Architecture, Tooling)
- Call-to-action buttons (Resume, Schedule Call)
- Footer with contact links (LinkedIn, Portfolio, GitHub)

**File**: `src/controllers/Templates/emailTemplate.ts`

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
# Starts with hot reload using tsx
# Server runs on http://localhost:8000
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## 🔒 Security Considerations

1. **Keep `.env` secret** - Never commit it to version control
2. **Use App-Specific Passwords** - Not your actual Gmail password
3. **Restrict Service Account Permissions** - Only use Sheets scope
4. **Validate Inputs** - All fields are validated on the backend
5. **CORS Enabled** - Set to allow requests from your frontend domain only in production

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `USER_EMAIL` | Gmail account for sending emails | `your-email@gmail.com` |
| `USER_EMAIL_PASSWORD` | App-specific password | `xxxx xxxx xxxx xxxx` |
| `SPREADSHEET_ID` | Google Sheet ID for tracking | `1a2b3c4d5e6f...` |
| `SHEET_NAME` | Sheet tab name for records | `Cold_Mail_Tracker` |
| `GOOGLE_SERVICE_ACCOUNT` | Full Service Account JSON | `{...}` (as string) |

---

## 🐛 Troubleshooting

**Issue**: "Failed to send email. Check your credentials."
- Verify `USER_EMAIL` and `USER_EMAIL_PASSWORD` are correct
- Ensure 2FA is enabled and app password is generated
- Check that Gmail account allows less secure apps (or use app password)

**Issue**: "Spreadsheet not found" or API errors
- Verify `SPREADSHEET_ID` matches the actual sheet URL
- Ensure service account email has access to the spreadsheet
- Check that Sheets API is enabled in Google Cloud Console

**Issue**: "Cannot read property 'private_key'"
- Verify `GOOGLE_SERVICE_ACCOUNT` JSON is properly formatted
- Ensure it's parsed correctly as a string in `.env`

---

## 📚 References

- [Nodemailer Documentation](https://nodemailer.com/)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Express.js Guide](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👨‍💻 Author

**Mouli Karmakar** - Frontend Engineer | React.js | Next.js | TypeScript

---

## 📄 License

ISC

---

**Last Updated**: April 2026
