/**
 * Cloudflare Pages Function - Contact Form Handler
 *
 * Sends email via Resend API.
 *
 * Required env var (set in Cloudflare Pages > Settings > Environment variables):
 *   RESEND_API_KEY — your Resend API key
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const RECIPIENT = 'hello@jeffknowlesjr.com'

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return String(text).replace(/[&<>"']/g, m => map[m])
}

export async function onRequestPost(context) {
  const { request, env } = context

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const { name, email, subject, message, _honey } = body

  // Honeypot spam check
  if (_honey) return json({ ok: true })

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json({ error: 'Missing required fields: name, email, message' }, 400)
  }

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return json({ error: 'Email service is not configured. Please try again later.' }, 500)
  }

  const emailSubject = `New message from ${escapeHtml(name)}${subject ? ` — ${escapeHtml(subject)}` : ''}`

  const emailHtml = `
    <h2 style="font-family:sans-serif;color:#0a0e1a;">New Contact Form Submission — jkjrdev.com</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
      <tr>
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;width:120px;">Name</td>
        <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Reply-to</td>
        <td style="padding:10px;border:1px solid #ddd;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Subject</td>
        <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(subject || 'Not specified')}</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Message</td>
        <td style="padding:10px;border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(message).replace(/\n/g, '<br>')}</td>
      </tr>
    </table>
    <p style="margin-top:20px;color:#888;font-size:12px;font-family:sans-serif;">
      Sent via jkjrdev.com contact form
    </p>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'JKJR Digital Development <onboarding@resend.dev>',
        to: [RECIPIENT],
        reply_to: email,
        subject: emailSubject,
        html: emailHtml,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return json({ error: 'Failed to send message. Please try again later.' }, 500)
    }

    return json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return json({ error: 'Failed to send message. Please try again later.' }, 500)
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS })
}
