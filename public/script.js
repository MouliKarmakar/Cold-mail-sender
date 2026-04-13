
  let currentTone = 'professional';

  function selectTone(el) {
    document.querySelectorAll('.tone-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    currentTone = el.dataset.tone;
    updatePreview();
  }

  function v(id) { return document.getElementById(id)?.value?.trim() || ''; }

  function generateBody() {
    const hr = v('hrName') || 'Hiring Manager';
    const company = v('company') || '[Company]';
    const role = v('role') || 'Frontend Developer';
    const source = v('source');
    const team = v('team');
    const why = v('whyCompany');
    const achievement = v('achievement') || 'Shining Star Award for delivering pixel-perfect, high-performance interfaces';
    const cta = v('cta') || 'a brief call';
    const name = v('senderName') || 'Mouli Karmakar';
    const portfolio = v('portfolio') || 'https://moulikarmakarportfolio.netlify.app/';
    const linkedin = v('linkedin') || 'https://www.linkedin.com/in/mouli-karmakar-19631226b/';

    const sourceStr = source ? ` through ${source}` : '';
    const teamStr = team ? ` (${team})` : '';
    const whyStr = why ? `\n\n${why}` : '';

    const tones = {
      professional: `Dear ${hr},\n\nI hope this message finds you well. I am writing to express my interest in the ${role} position at ${company}${teamStr}${sourceStr}.\n\nWith over 2 years of experience at InspironLabs, I have specialized in building scalable, high-performance interfaces using React.js, Next.js, and TypeScript. I was recognized with the ${achievement}, and led a team of 4 developers to design a reusable frontend architecture adopted across 3+ production applications — improving Core Web Vitals by 30% and reducing bundle size by 20%.${whyStr}\n\nI architected an internal component library (published to a private npm registry via Storybook), implemented role-based access control for complex platforms, and consistently delivered pixel-perfect UIs from Figma — on time and at production quality.\n\nI would welcome the opportunity for ${cta} to discuss how my experience aligns with your team's goals. Please find my portfolio and resume attached.\n\nThank you for your time and consideration.\n\nWarm regards,\n${name}\n${portfolio} | ${linkedin}`,

      conversational: `Hi ${hr},\n\nI came across the ${role} opening at ${company}${sourceStr} and had to reach out — it genuinely caught my attention!\n\nI've spent the past 2+ years at InspironLabs building fast, accessible, and beautifully crafted React.js / Next.js products. A few highlights: I received the ${achievement}, led a 4-person frontend team, cut bundle size by 20%, and improved Core Web Vitals by 30% across real production apps.${whyStr}\n\nI love the craft of frontend — component architecture, performance budgets, pixel-perfect Figma fidelity — and I'd bring that same energy to ${company}${teamStr}.\n\nWould love to chat! Even ${cta} would be amazing. My portfolio shows the work better than words can — it's at ${portfolio}.\n\nCheers,\n${name}`,

      bold: `${hr} — I'll keep this short.\n\nI'm a Frontend Developer with 2+ years building production React.js / Next.js apps at InspironLabs. I've won awards (${achievement}), led teams, shipped scalable component libraries to npm, and boosted Core Web Vitals by 30%.\n\nI want to bring that same output to the ${role} role at ${company}${teamStr}.\n\nMy work is at ${portfolio}. Takes 2 minutes to see. If it resonates, let's find ${cta}.\n\n— ${name}`,

      humble: `Dear ${hr},\n\nI hope you're doing well. I'm Mouli, a Frontend Developer with 2+ years of experience, and I'd be truly grateful for the opportunity to be considered for the ${role} role at ${company}${teamStr}${sourceStr}.\n\nI've had the chance to work on some meaningful projects at InspironLabs — building component libraries, improving page performance, and collaborating closely with design and backend teams. I was fortunate to receive the ${achievement}, but what I'm most proud of is the clean, maintainable code I leave behind.${whyStr}\n\nI'm genuinely excited about the work ${company} is doing${team ? ` on ${team}` : ''}, and I'd be thrilled to even get ${cta} to learn more about the team's direction.\n\nThank you so much for taking the time to read this.\n\nSincerely,\n${name}\n${portfolio} | ${linkedin}`
    };

    return tones[currentTone] || tones.professional;
  }

  function updatePreview() {
    const hr = v('hrName') || 'Hiring Manager';
    const company = v('company') || '[Company]';
    const role = v('role') || 'Frontend Developer';
    const hrEmail = v('hrEmail') || 'hr@company.com';
    const senderEmail = v('senderEmail') || 'moulikarmakar7596@gmail.com';
    const senderName = v('senderName') || 'Mouli Karmakar';
    const senderPhone = v('senderPhone') || '7596976614';
    const linkedin = v('linkedin') || 'https://www.linkedin.com/in/mouli-karmakar-19631226b/';
    const portfolio = v('portfolio') || 'https://moulikarmakarportfolio.netlify.app/';
    const github = v('github') || 'https://github.com/MouliKarmakar';
    const subject = `${role} — Application | ${senderName}`;

    document.getElementById('prev-to').textContent = hrEmail;
    document.getElementById('prev-from').textContent = senderEmail;
    document.getElementById('prev-subject').textContent = subject;
    document.getElementById('prev-lh-name').textContent = senderName;
    document.getElementById('prev-lh-contact').innerHTML = `${senderEmail}<br/>${senderPhone}<br/>Bengaluru, KA`;
    document.getElementById('prev-body-subject').textContent = `Application for ${role} — ${company}`;
    document.getElementById('prev-body').textContent = generateBody();
    document.getElementById('prev-sig').textContent = senderName;
    document.getElementById('prev-portfolio-link').href = portfolio;
    document.getElementById('prev-portfolio-link').textContent = 'Portfolio ↗';
    document.getElementById('prev-linkedin-link').href = linkedin;
    document.getElementById('prev-github-link').href = github;
  }

    async function sendEmail() {
    const hrEmail = v('hrEmail');
    const role = v('role');
    const company = v('company');

    if (!hrEmail || !role || !company) {
      showToast('⚠ Please fill in HR Email, Role, and Company.', 'error');
      return;
    }

    const btn = document.getElementById('sendBtn');
    btn.classList.add('loading');
    btn.disabled = true;

    const payload = {
      hrName: v('hrName'),
      hrEmail,
      company,
      role,
      emailBody: generateBody(),
      senderName: v('senderName'),
      senderEmail: v('senderEmail'),
      senderPhone: v('senderPhone'),
      linkedin: v('linkedin'),
      portfolio: v('portfolio'),
      github: v('github'),
    };

    try {
      const res = await fetch(`http://localhost:8000/api/mail/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showToast('✓ Email sent successfully!', 'success');
      } else {
        showToast(`✗ ${data.message}`, 'error');
      }
    } catch (err) {
      showToast('✗ Could not reach the server. Is it running?', 'error');
    } finally {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  }

  function copyEmailBody() {
    const full = `Subject: ${v('role') || 'Frontend Developer'} — Application | ${v('senderName') || 'Mouli Karmakar'}\n\n${generateBody()}`;
    navigator.clipboard.writeText(full).then(() => showToast('✓ Copied to clipboard!'));
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  function resetForm() {
    ['hrName','company','role','hrEmail','source','team','whyCompany','achievement','cta'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('senderName').value = 'Mouli Karmakar';
    document.getElementById('senderEmail').value = 'moulikarmakar7596@gmail.com';
    document.getElementById('senderPhone').value = '7596976614';
    document.getElementById('linkedin').value = 'https://www.linkedin.com/in/mouli-karmakar-19631226b/';
    document.getElementById('portfolio').value = 'https://moulikarmakarportfolio.netlify.app/';
    document.getElementById('github').value = 'https://github.com/MouliKarmakar';
    document.getElementById('resume').value = 'https://drive.google.com/file/d/1TwPa_8O4Sq6m7hpV0ELemFRIfleBE1dZ/view?usp=sharing';
    selectTone(document.querySelector('[data-tone="professional"]'));
    updatePreview();
  }

  // Init
  updatePreview()