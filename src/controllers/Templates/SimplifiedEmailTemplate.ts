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
  resume: string;
}

export function buildSimplifiedEmailHTML(data: TemplateData): string {
  const {
    hrName,
    company,
    role,
    emailBody,
    senderName,
    senderEmail,
    senderPhone,
    linkedin,
    portfolio,
    github,
    resume,
  } = data;

  // Convert plain text body newlines to <br> for HTML
  const bodyHTML = emailBody
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ subject }}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

      @media only screen and (max-width: 680px) {
        .container-card { width:100% !important; max-width:100% !important; }
        .highlights-cell { padding-left:16px !important; padding-right:16px !important; }
        .stat-cell {
          display:inline-block !important;
          width:48% !important; max-width:48% !important;
          vertical-align:top; box-sizing:border-box;
          margin-bottom:2px !important;
        }
        .hero-pad { padding:32px 20px 28px !important; }
        .body-pad { padding-left:24px !important; padding-right:24px !important; }
        .big-name { font-size:44px !important; }
      }
    </style>
  </head>

  <body style="margin:0;padding:0;background:#000000;font-family:'DM Sans',Arial,sans-serif;color:#1c1008;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;background:#1a0a00;">
    <tr>
      <td align="center" style="padding:32px 14px 48px;">

        <table role="presentation" width="620" cellspacing="0" cellpadding="0" border="0"
          style="width:620px;max-width:620px;border-collapse:collapse;border-radius:4px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,0.6);"
          class="container-card">

          <!-- ═══════════════════════════
               HERO — warm amber gradient
               with BIG editorial name
          ═══════════════════════════ -->
          <tr>
            <td class="hero-pad" style="padding:48px 40px 36px;background:linear-gradient(160deg,#f97316 0%,#ea580c 40%,#c2410c 100%);position:relative;">

              <!-- issue label -->
              <p style="margin:0 0 24px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.6);font-weight:500;">
                Open to Opportunities &nbsp;
              </p>

              <!-- BIG name — Playfair Display, editorial -->
              <h1 class="big-name" style="margin:0 0 6px;font-family:'Playfair Display',Georgia,serif;font-size:58px;font-weight:800;color:#ffffff;line-height:0.95;letter-spacing:-2px;">
                Varun<br/>Kanade
              </h1>

              <!-- role under name -->
              <p style="margin:12px 0 0;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.75);font-weight:500;">
                Backend &amp; GenAI Engineer
              </p>

              <!-- location -->
              <p style="margin:8px 0 0;font-size:12px;letter-spacing:1px;color:rgba(255,255,255,0.55);font-weight:400;">
                📍 Bengaluru &nbsp;·&nbsp; Pune &nbsp;·&nbsp; Remote
              </p>

              <!-- divider rule -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin:20px 0;">
                <tr>
                  <td style="border-top:1px solid rgba(255,255,255,0.25);font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- two-col: tagline + availability -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="vertical-align:middle;width:65%;">
                    <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.9);line-height:1.65;font-weight:300;font-style:italic;font-family:'Playfair Display',serif;">
                      "Building systems that hold up under pressure backends that scale, AI that actually works."
                    </p>
                  </td>
                  <td style="vertical-align:middle;width:35%;padding-left:20px;" align="right">
                    <!-- availability pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin-left:auto;">
                      <tr>
                        <td style="background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.3);border-radius:3px;padding:10px 14px;text-align:center;">
                          <p style="margin:0 0 3px;font-size:18px;font-weight:700;color:#ffffff;line-height:1;font-family:'Playfair Display',serif;">30</p>
                          <p style="margin:0;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.7);">Days Notice</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ═══════════════════════════
               CREAM BODY
          ═══════════════════════════ -->
          <tr>
            <td style="padding:0;background:#fdf8f0;">

              <!-- ── STATS ROW — horizontal rule with numbers ── -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;border-bottom:1px solid #e8dece;">
                <tr>
                  <td class="stat-cell" style="width:25%;padding:20px 0;text-align:center;border-right:1px solid #e8dece;">
                    <p style="margin:0 0 3px;font-size:24px;font-weight:700;color:#c2410c;line-height:1;font-family:'Playfair Display',serif;">~3</p>
                    <p style="margin:0;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#92826a;font-weight:500;">Years Exp.</p>
                  </td>
                  <td class="stat-cell" style="width:25%;padding:20px 0;text-align:center;border-right:1px solid #e8dece;">
                    <p style="margin:0 0 3px;font-size:24px;font-weight:700;color:#c2410c;line-height:1;font-family:'Playfair Display',serif;">5K+</p>
                    <p style="margin:0;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#92826a;font-weight:500;">Users Served</p>
                  </td>
                  <td class="stat-cell" style="width:25%;padding:20px 0;text-align:center;border-right:1px solid #e8dece;">
                    <p style="margin:0 0 3px;font-size:24px;font-weight:700;color:#c2410c;line-height:1;font-family:'Playfair Display',serif;">1M+</p>
                    <p style="margin:0;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#92826a;font-weight:500;">Records Migrated</p>
                  </td>
                  <td class="stat-cell" style="width:25%;padding:20px 0;text-align:center;">
                    <p style="margin:0 0 3px;font-size:24px;font-weight:700;color:#c2410c;line-height:1;font-family:'Playfair Display',serif;">⭐</p>
                    <p style="margin:0;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#92826a;font-weight:500;">Shining Star '24</p>
                  </td>
                </tr>
              </table>

              <!-- ── GREETING ── -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td class="body-pad" style="padding:32px 40px 6px;">
                    <p style="margin:0;font-size:18px;font-weight:700;color:#1c1008;font-family:'Playfair Display',serif;">
                      Hello {{ recruiter_name }}{% if company_name %} at {{ company_name }}{% endif %},
                    </p>
                  </td>
                </tr>
              </table>

              <!-- ── BODY TEXT ── -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td class="body-pad" style="padding:10px 40px 0;">
                    <p style="margin:0;font-size:15px;line-height:1.85;color:#3d2b1a;font-weight:300;">
                      {% if custom_message %}
                        {{ custom_message|linebreaksbr }}
                      {% else %}
                        {{ intro_text }}
                      {% endif %}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- ── WHAT I DO — 3 clean cards ── -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin-top:28px;border-top:1px solid #e8dece;border-bottom:1px solid #e8dece;">
                <tr>
                  <!-- card 1 -->
                  <td style="width:33.3%;padding:20px 20px 20px 40px;vertical-align:top;border-right:1px solid #e8dece;">
                    <p style="margin:0 0 6px;font-size:20px;">🏗️</p>
                    <p style="margin:0 0 5px;font-size:12px;font-weight:700;color:#1c1008;letter-spacing:0.5px;text-transform:uppercase;">Backend</p>
                    <p style="margin:0;font-size:12px;color:#7a6450;line-height:1.6;font-weight:300;">Python · Django · FastAPI · PostgreSQL · Kafka</p>
                  </td>
                  <!-- card 2 -->
                  <td style="width:33.3%;padding:20px;vertical-align:top;border-right:1px solid #e8dece;">
                    <p style="margin:0 0 6px;font-size:20px;">🤖</p>
                    <p style="margin:0 0 5px;font-size:12px;font-weight:700;color:#1c1008;letter-spacing:0.5px;text-transform:uppercase;">GenAI</p>
                    <p style="margin:0;font-size:12px;color:#7a6450;line-height:1.6;font-weight:300;">RAG · LangChain · MCP · Agentic AI · pgvector</p>
                  </td>
                  <!-- card 3 -->
                  <td style="width:33.3%;padding:20px 40px 20px 20px;vertical-align:top;">
                    <p style="margin:0 0 6px;font-size:20px;">☁️</p>
                    <p style="margin:0 0 5px;font-size:12px;font-weight:700;color:#1c1008;letter-spacing:0.5px;text-transform:uppercase;">Cloud</p>
                    <p style="margin:0;font-size:12px;color:#7a6450;line-height:1.6;font-weight:300;">AWS · GCP · Docker · CI/CD · Prometheus</p>
                  </td>
                </tr>
              </table>

              <!-- ── CLOSING TEXT + CTA ── -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td class="body-pad" style="padding:24px 40px 32px;">
                    <p style="margin:0 0 22px;font-size:14.5px;line-height:1.8;color:#3d2b1a;font-weight:300;">{{ closing_text }}</p>

                    {% if resume_public_url %}
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                      <tr>
                        <!-- Primary -->
                        <td style="background:#c2410c;border-radius:3px;">
                          <a href="{{ resume_public_url }}"
                             style="display:inline-block;padding:13px 24px;color:#ffffff;text-decoration:none;font-size:13.5px;font-weight:600;letter-spacing:0.3px;">
                            View My Resume
                          </a>
                        </td>
                        <td style="width:12px;font-size:0;">&nbsp;</td>
                        <!-- Secondary -->
                        <td style="border:1.5px solid #c2410c;border-radius:3px;">
                          <a href="mailto:kanadevarun2001@gmail.com" style="display:inline-block;padding:12px 22px;color:#c2410c;text-decoration:none;font-size:13.5px;font-weight:500;">
                            Schedule a Call
                          </a>
                        </td>
                      </tr>
                    </table>
                    {% else %}
                    <p style="margin:0;font-size:13.5px;color:#7a6450;">Resume available on request.</p>
                    {% endif %}

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ═══════════════════════════
               SIGNATURE — dark warm footer
          ═══════════════════════════ -->
          <tr>
            <td style="padding:0;background:#1c1008;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td class="body-pad" style="padding:22px 40px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                      <tr>
                        <td style="vertical-align:middle;">
                          <p style="margin:0 0 1px;font-size:12px;color:#6b5540;font-weight:300;">Warm regards,</p>
                          <p style="margin:0 0 8px;font-size:17px;color:#f5e6d0;font-family:'Playfair Display',serif;font-weight:700;">{{ sender_name|default:"Varun Kanade" }}</p>
                          <p style="margin:0 0 10px;font-size:11.5px;color:#7a6450;letter-spacing:0.3px;">&nbsp;&nbsp; +91 8999817940</p>
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                            <tr>
                              <td style="padding-right:16px;">
                                <a href="https://www.linkedin.com/in/varunkanade2001/" target="_blank"
                                   style="font-size:12.5px;color:#e2a87a;text-decoration:none;font-weight:500;">LinkedIn</a>
                              </td>
                              <td style="padding-right:16px;">
                                <a href="https://xp-portfolio-seven.vercel.app/" target="_blank"
                                   style="font-size:12.5px;color:#e2a87a;text-decoration:none;font-weight:500;">Portfolio</a>
                              </td>
                              <td>
                                <a href="https://github.com/Varun20112001" target="_blank"
                                   style="font-size:12.5px;color:#e2a87a;text-decoration:none;font-weight:500;">GitHub</a>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <!-- right: links only, no CTC -->
                        <td align="right" style="vertical-align:middle;">
                        </td>

                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- thin amber bottom line -->
          <tr>
            <td style="padding:0;background:#f97316;font-size:4px;line-height:4px;">&nbsp;</td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

  </body>
</html>
  `;
}
