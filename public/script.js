let currentTone = 'professional';

function selectTone(el) {
  document.querySelectorAll('.tone-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  currentTone = el.dataset.tone;
  updatePreview();
}

function v(id) { return document.getElementById(id)?.value?.trim() || ''; }

function generateShortBody() {
  const hr      = v('hrName') || 'Hiring Manager';
  const company = v('company') || '[Company]';
  const role    = v('role') || 'Frontend Developer';
  const source  = v('source');
  const team    = v('team');
  const why     = v('whyCompany');
  const achievement = v('achievement') || 'Shining Star Award for delivering pixel-perfect, high-performance interfaces';
  const cta     = v('cta') || 'a brief call';
  const name    = v('senderName') || 'Mouli Karmakar';
  const portfolio = v('portfolio') || 'https://moulikarmakarportfolio.netlify.app/';
  const linkedin  = v('linkedin') || 'https://www.linkedin.com/in/mouli-karmakar-19631226b/';

  const sourceStr = source ? ` through ${source}` : '';
  const teamStr   = team ? ` (${team})` : '';
  const whyStr    = why ? `\n\n${why}` : '';

  const tones = {
    professional:
      `I am writing to express my interest in the ${role} position at ${company}${teamStr}${sourceStr}.\n\n` +
      `With 2+ years at InspironLabs, I specialize in building scalable, high-performance React.js / Next.js interfaces. ` +
      `Recognized with the ${achievement} — I led a team of 4, architected a reusable component library across 3+ apps, ` +
      `improved Core Web Vitals by 30%, and reduced bundle size by 20%.${whyStr}\n\n` +
      `I'd love the opportunity for ${cta} to explore how I can contribute to your team.`,

    conversational:
      `I came across the ${role} opening at ${company}${sourceStr} and had to reach out!\n\n` +
      `2+ years at InspironLabs building production React.js / Next.js products. Highlights: ${achievement}, ` +
      `led a 4-person team, 20% bundle size reduction, 30% Core Web Vitals boost.${whyStr}\n\n` +
      `Would love to chat — even ${cta} would be great. Portfolio linked below.`,

    bold:
      `I'll keep this short.\n\n` +
      `Frontend Developer. 2+ years. ${achievement}. Led teams. Shipped component libraries to npm. ` +
      `Boosted Core Web Vitals 30%.${whyStr}\n\n` +
      `My work is linked below — takes 2 minutes. If it resonates, let's find ${cta}.`,

    humble:
      `I'd be truly grateful for the opportunity to be considered for the ${role} role at ${company}${teamStr}${sourceStr}.\n\n` +
      `I've spent 2+ years at InspironLabs building component libraries, improving performance, and shipping pixel-perfect UIs. ` +
      `I was fortunate to receive the ${achievement}.${whyStr}\n\n` +
      `I'd be thrilled to get ${cta} to learn more about your team's direction.`
  };

  return tones[currentTone] || tones.professional;
}

// Full body used for sending / copying
function generateFullBody() {
  const hr        = v('hrName') || 'Hiring Manager';
  const company   = v('company') || '[Company]';
  const role      = v('role') || 'Frontend Developer';
  const name      = v('senderName') || 'Mouli Karmakar';
  const portfolio = v('portfolio') || 'https://moulikarmakarportfolio.netlify.app/';
  const linkedin  = v('linkedin') || 'https://www.linkedin.com/in/mouli-karmakar-19631226b/';
  const resume    = v('resume') || '';

  return `Hello ${hr} at ${company},\n\n${generateShortBody()}`;
}

function updatePreview() {
  const hrEmail     = v('hrEmail') || 'hr@company.com';
  const senderEmail = v('senderEmail') || 'moulikarmakar7596@gmail.com';
  const senderName  = v('senderName') || 'Mouli Karmakar';
  const senderPhone = v('senderPhone') || '7596976614';
  const company     = v('company') || '[Company]';
  const role        = v('role') || 'Frontend Developer';
  const hrName      = v('hrName') || 'Hiring Manager';
  const linkedin    = v('linkedin') || 'https://www.linkedin.com/in/mouli-karmakar-19631226b/';
  const portfolio   = v('portfolio') || 'https://moulikarmakarportfolio.netlify.app/';
  const github      = v('github') || 'https://github.com/MouliKarmakar';
  const resume      = v('resume') || '#';
  const cta         = v('cta') || 'a quick conversation';

  // Chrome meta
  document.getElementById('prev-to').textContent      = hrEmail;
  document.getElementById('prev-from').textContent    = senderEmail;
  document.getElementById('prev-subject').textContent = `${role} — Application | ${senderName}`;

  // Hero
  document.getElementById('prev-lh-name').innerHTML = senderName.includes(' ')
    ? senderName.replace(' ', '<br/>')
    : senderName;

  // Greeting
  document.getElementById('prev-hr-greeting').textContent      = hrName;
  document.getElementById('prev-company-greeting').textContent = company;

  // Body
  document.getElementById('prev-body-short').textContent = generateShortBody();

  // CTA closing line
  document.getElementById('prev-cta-text').textContent =
    `I'd love to connect for ${cta} — my work speaks louder than a resume. Links below.`;

  // CTA buttons
  document.getElementById('prev-resume-link').href  = resume || '#';
  document.getElementById('prev-email-link').href   = `mailto:${senderEmail}`;

  // Footer
  document.getElementById('prev-sig').textContent   = senderName;
  document.getElementById('prev-phone').textContent = `+91 ${senderPhone}`;
  document.getElementById('prev-linkedin-link').href  = linkedin;
  document.getElementById('prev-portfolio-link').href = portfolio;
  document.getElementById('prev-github-link').href    = github;
}

async function sendEmail() {
  const hrEmail = v('hrEmail');
  const role    = v('role');
  const company = v('company');

  if (!hrEmail || !role || !company) {
    showToast('⚠ Please fill in HR Email, Role, and Company.', 'error');
    return;
  }

  const btn = document.getElementById('sendBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  const payload = {
    hrName:      v('hrName'),
    hrEmail,
    company,
    role,
    emailBody:   generateFullBody(),
    senderName:  v('senderName'),
    senderEmail: v('senderEmail'),
    senderPhone: v('senderPhone'),
    linkedin:    v('linkedin'),
    portfolio:   v('portfolio'),
    github:      v('github'),
    resume:      v('resume'),
  };

  try {
    const res  = await fetch('http://localhost:8000/api/mail/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    showToast(data.success ? '✓ Email sent successfully!' : `✗ ${data.message}`, data.success ? 'success' : 'error');
    if (data.success) resetForm();
  } catch {
    showToast('✗ Could not reach the server. Is it running?', 'error');
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

function copyEmailBody() {
  const subject = `${v('role') || 'Frontend Developer'} — Application | ${v('senderName') || 'Mouli Karmakar'}`;
  const full    = `Subject: ${subject}\n\n${generateFullBody()}`;
  navigator.clipboard.writeText(full).then(() => showToast('✓ Copied to clipboard!', 'success'));
}

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = `toast ${type}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function resetForm() {
  ['hrName','company','role','hrEmail','source','team','whyCompany','achievement','cta'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('senderName').value  = 'Mouli Karmakar';
  document.getElementById('senderEmail').value = 'moulikarmakar7596@gmail.com';
  document.getElementById('senderPhone').value = '7596976614';
  document.getElementById('linkedin').value    = 'https://www.linkedin.com/in/mouli-karmakar-19631226b/';
  document.getElementById('portfolio').value   = 'https://moulikarmakarportfolio.netlify.app/';
  document.getElementById('github').value      = 'https://github.com/MouliKarmakar';
  document.getElementById('resume').value      = 'https://drive.google.com/file/d/1TwPa_8O4Sq6m7hpV0ELemFRIfleBE1dZ/view?usp=sharing';
  selectTone(document.querySelector('[data-tone="professional"]'));
  updatePreview();
}

updatePreview();
