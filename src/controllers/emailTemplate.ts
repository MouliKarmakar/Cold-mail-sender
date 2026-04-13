interface TemplateData {
  hrName: string;
  company: string;
  role: string;
  emailBody: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  linkedin: string;
  portfolio: string;
  github: string;
  resume:string;
}

export function buildEmailHTML(data: TemplateData): string {
  const {
    hrName, company, role, emailBody,
    senderName, senderEmail, senderPhone,
    linkedin, portfolio, github, resume
  } = data;

  // Convert plain text body newlines to <br> for HTML
  const bodyHTML = emailBody
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Application for ${role} — ${senderName}</title>
</head>
<body style="margin:0;padding:0;background:#f5f2ec;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f2ec;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0"
          style="max-width:620px;width:100%;border-radius:12px;overflow:hidden;
                 box-shadow:0 4px 24px rgba(14,14,16,0.10);border:1px solid #d4cfc4;">

          <!-- ── LETTERHEAD ── -->
          <tr>
            <td style="background:#0e0e10;padding:28px 32px 22px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-family:Georgia,serif;font-size:26px;font-weight:900;
                                color:#f5f2ec;letter-spacing:-0.5px;">${senderName}</div>
                    <div style="font-family:monospace;font-size:11px;color:#c84b2f;
                                letter-spacing:1.5px;text-transform:uppercase;margin-top:4px;">
                      Frontend Developer · React.js · Next.js
                    </div>
                  </td>
                  <td align="right" style="font-family:monospace;font-size:11px;
                                           color:#9a9690;line-height:1.7;vertical-align:top;">
                    ${senderEmail}<br/>
                    ${senderPhone}<br/>
                    Bengaluru, KA
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── ACCENT BAR ── -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#c84b2f 0%,#2f6ec8 100%);
                       font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- ── SUBJECT LINE ── -->
          <tr>
            <td style="background:#ffffff;padding:28px 32px 0;">
              <div style="font-family:Georgia,serif;font-size:18px;font-weight:700;
                          color:#0e0e10;padding-bottom:14px;
                          border-bottom:1.5px solid #d4cfc4;">
                Application for ${role} — ${company}
              </div>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="background:#ffffff;padding:20px 32px 28px;">
              <div style="font-size:14px;line-height:1.75;color:#2a2826;">
                ${bodyHTML}
              </div>
            </td>
          </tr>

          <!-- ── SKILLS STRIP ── -->
          <tr>
            <td style="background:#f5f2ec;border-top:1.5px solid #d4cfc4;padding:14px 32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:monospace;font-size:10px;color:#7a7670;
                             letter-spacing:1.5px;text-transform:uppercase;
                             padding-right:10px;vertical-align:middle;">Stack:</td>
                  ${['React.js','Next.js','TypeScript','Redux','Tailwind','Node.js','REST APIs','CI/CD']
                    .map(s => `<td style="padding:0 3px;vertical-align:middle;">
                      <span style="background:#ede9e0;border:1px solid #d4cfc4;border-radius:4px;
                                   padding:3px 10px;font-family:monospace;font-size:11px;
                                   color:#0e0e10;">${s}</span>
                    </td>`).join('')}
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:#f7f4ee;border-top:1.5px solid #d4cfc4;padding:16px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:Georgia,serif;font-size:15px;font-weight:700;
                             color:#0e0e10;">${senderName}</td>
                  <td align="right">
                    <a href="${portfolio}" style="font-family:monospace;font-size:11px;
                       color:#2f6ec8;text-decoration:none;margin-left:12px;">Portfolio ↗</a>
                    <a href="${linkedin}" style="font-family:monospace;font-size:11px;
                       color:#2f6ec8;text-decoration:none;margin-left:12px;">LinkedIn ↗</a>
                    <a href="${github}" style="font-family:monospace;font-size:11px;
                       color:#2f6ec8;text-decoration:none;margin-left:12px;">GitHub ↗</a>
                    <a href="${resume}" style="font-family:monospace;font-size:11px;
                       color:#2f6ec8;text-decoration:none;margin-left:12px;">GitHub ↗</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
