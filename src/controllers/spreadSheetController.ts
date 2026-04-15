import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT!);

const auth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const HEADER = [
  "Index",
  "HR Email",
  "Company Name",
  "Position",
  "Response Status",
  "Did Contacted"
];

async function ensureSheetExists() {
  const res = await sheets.spreadsheets.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
  });

  const sheetExists = res.data.sheets?.some(
    (s) => s.properties?.title === process.env.SHEET_NAME
  ) ?? false;

  if (!sheetExists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: process.env.SHEET_NAME,
              },
            },
          },
        ],
      },
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${process.env.SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [HEADER],
      },
    });
  }
}

async function getNextIndex() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: `${process.env.SHEET_NAME}!A:A`,
  });

  return (res.data.values?.length || 1);
}

async function addEntry(data:{
  hrEmail: string;
  companyName: string;
  position: string;
  responseStatus?: string;
  didContacted?: string;
}) {
  await ensureSheetExists();

  const index = await getNextIndex();

  const row = [
    index,
    data.hrEmail,
    data.companyName,
    data.position,
    data.responseStatus || "Pending",
    data.didContacted || "No",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: `${process.env.SHEET_NAME}!A1`,
    valueInputOption: "RAW",
    requestBody: {
      values: [row],
    },
  });
}

export { addEntry };

