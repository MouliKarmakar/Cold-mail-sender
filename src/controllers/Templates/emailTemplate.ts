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
  resume?: string;
}

export function buildEmailHTML(data: TemplateData): string {
  const { company, role, emailBody, senderName, senderEmail, senderPhone, linkedin, portfolio, github, resume } = data;

  const bodyHTML = emailBody
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Application — ${senderName}</title>
</head>
<body style="margin:0;padding:0;background:#1a0a00;font-family:Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#1a0a00;padding:32px 14px 48px;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;border-radius:4px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,0.6);">

  <!-- HERO -->
  <tr><td style="background:linear-gradient(160deg,#f97316 0%,#ea580c 40%,#c2410c 100%);padding:48px 40px 36px;">
    <p style="margin:0 0 24px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.6);">Open to Opportunities</p>
    <h1 style="margin:0 0 6px;font-family:Georgia,serif;font-size:52px;font-weight:900;color:#fff;line-height:0.95;letter-spacing:-2px;">${senderName.replace(' ', '<br/>')}</h1>
    <p style="margin:12px 0 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.75);">Frontend Engineer &middot; React.js &middot; Next.js &middot; TypeScript</p>
    <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.5);">&#128205; Bengaluru &nbsp;&middot;&nbsp; Remote</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0;"><tr><td style="border-top:1px solid rgba(255,255,255,0.25);font-size:0;line-height:0;">&nbsp;</td></tr></table>
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;width:65%;">
        <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.9);line-height:1.65;font-weight:300;font-style:italic;font-family:Georgia,serif;">
          &ldquo;Building React ecosystems teams actually reuse &mdash; fast, accessible, and designed to last.&rdquo;
        </p>
      </td>
      <td align="right" style="vertical-align:middle;width:35%;padding-left:20px;">
        <table cellpadding="0" cellspacing="0" style="margin-left:auto;">
          <tr><td style="background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.3);border-radius:3px;padding:10px 16px;text-align:center;">
            <p style="margin:0 0 3px;font-size:20px;font-weight:700;color:#fff;line-height:1;font-family:Georgia,serif;">30</p>
            <p style="margin:0;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Days Notice</p>
          </td></tr>
        </table>
      </td>
    </tr></table>
  </td></tr>

  <!-- STATS -->
  <tr><td style="background:#fdf8f0;border-bottom:1px solid #e8dece;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:25%;padding:18px 0;text-align:center;border-right:1px solid #e8dece;">
          <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#c2410c;line-height:1;font-family:Georgia,serif;">30%</p>
          <p style="margin:0;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#92826a;font-weight:500;">Core Web Vitals</p>
        </td>
        <td style="width:25%;padding:18px 0;text-align:center;border-right:1px solid #e8dece;">
          <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#c2410c;line-height:1;font-family:Georgia,serif;">20%</p>
          <p style="margin:0;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#92826a;font-weight:500;">Bundle Size Reduced</p>
        </td>
        <td style="width:25%;padding:18px 0;text-align:center;border-right:1px solid #e8dece;">
          <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#c2410c;line-height:1;font-family:Georgia,serif;">8+</p>
          <p style="margin:0;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#92826a;font-weight:500;">Reusable Components</p>
        </td>
        <td style="width:25%;padding:18px 0;text-align:center;">
          <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#c2410c;line-height:1;">&#11088;</p>
          <p style="margin:0;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#92826a;font-weight:500;">Shining Star '24</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- GREETING -->
  <tr><td style="background:#fdf8f0;padding:28px 40px 6px;">
    <p style="margin:0;font-size:17px;font-weight:700;color:#1c1008;font-family:Georgia,serif;">Hello at ${company},</p>
  </td></tr>

  <!-- BODY -->
  <tr><td style="background:#fdf8f0;padding:10px 40px 0;">
    <p style="margin:0;font-size:14px;line-height:1.85;color:#3d2b1a;font-weight:300;">${bodyHTML}</p>
  </td></tr>

  <!-- SKILL CARDS -->
  <tr><td style="background:#fdf8f0;padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;border-top:1px solid #e8dece;border-bottom:1px solid #e8dece;">
      <tr>
        <td style="width:33.3%;padding:18px 16px 18px 40px;vertical-align:top;border-right:1px solid #e8dece;">
          <p style="margin:0 0 6px;font-size:18px;">&#9883;&#65039;</p>
          <p style="margin:0 0 5px;font-size:11px;font-weight:700;color:#1c1008;letter-spacing:0.5px;text-transform:uppercase;">Frontend</p>
          <p style="margin:0;font-size:11px;color:#7a6450;line-height:1.6;font-weight:300;">React.js &middot; Next.js &middot; TypeScript &middot; Redux &middot; Tailwind &middot; SASS</p>
        </td>
        <td style="width:33.3%;padding:18px 16px;vertical-align:top;border-right:1px solid #e8dece;">
          <p style="margin:0 0 6px;font-size:18px;">&#127959;&#65039;</p>
          <p style="margin:0 0 5px;font-size:11px;font-weight:700;color:#1c1008;letter-spacing:0.5px;text-transform:uppercase;">Architecture</p>
          <p style="margin:0;font-size:11px;color:#7a6450;line-height:1.6;font-weight:300;">Micro-Frontend &middot; Component Libraries &middot; Storybook &middot; npm Registry</p>
        </td>
        <td style="width:33.3%;padding:18px 40px 18px 16px;vertical-align:top;">
          <p style="margin:0 0 6px;font-size:18px;">&#9881;&#65039;</p>
          <p style="margin:0 0 5px;font-size:11px;font-weight:700;color:#1c1008;letter-spacing:0.5px;text-transform:uppercase;">Tooling</p>
          <p style="margin:0;font-size:11px;color:#7a6450;line-height:1.6;font-weight:300;">Node.js &middot; REST APIs &middot; CI/CD &middot; Jest &middot; Webpack &middot; Figma</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="background:#fdf8f0;padding:22px 40px 32px;">
    <p style="margin:0 0 20px;font-size:13.5px;line-height:1.8;color:#3d2b1a;font-weight:300;">
      I'd love to connect for a quick call — my work speaks louder than a resume. Links below.
    </p>
    <table cellpadding="0" cellspacing="0"><tr>
      ${resume ? `<td style="background:#c2410c;border-radius:3px;">
        <a href="${resume}" style="display:inline-block;padding:12px 22px;color:#fff;text-decoration:none;font-size:13px;font-weight:600;">View My Resume</a>
      </td><td style="width:12px;">&nbsp;</td>` : ''}
      <td style="border:1.5px solid #c2410c;border-radius:3px;">
        <a href="mailto:${senderEmail}" style="display:inline-block;padding:11px 20px;color:#c2410c;text-decoration:none;font-size:13px;font-weight:500;">Schedule a Call</a>
      </td>
    </tr></table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#442f21;padding:22px 40px 24px;">
    <p style="margin:0 0 1px;font-size:12px;color:#6b5540;font-weight:300;">Warm regards,</p>
    <p style="margin:0 0 6px;font-size:17px;color:#f5e6d0;font-family:Georgia,serif;font-weight:700;">${senderName}</p>
    <p style="margin:0 0 10px;font-size:11.5px;color:#7a6450;">+91 ${senderPhone}</p>
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:16px;"><a href="${linkedin}" style="font-size:12.5px;color:#e2a87a;text-decoration:none;font-weight:500;">LinkedIn</a></td>
      <td style="padding-right:16px;"><a href="${portfolio}" style="font-size:12.5px;color:#e2a87a;text-decoration:none;font-weight:500;">Portfolio</a></td>
      <td><a href="${github}" style="font-size:12.5px;color:#e2a87a;text-decoration:none;font-weight:500;">GitHub</a></td>
    </tr></table>
  </td></tr>

  <!-- BOTTOM BAR -->
  <tr><td style="background:#f97316;font-size:4px;line-height:4px;">&nbsp;</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
