/**
 * Villano.ai - Email Delivery Service
 * Sends product delivery emails after successful payment
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const PDF_DOWNLOAD_URL = process.env.PDF_DOWNLOAD_URL || 'https://villano.ai/download';
const FROM_EMAIL = 'Villano.ai <noreply@villano.ai>';

/**
 * Send product delivery email using Resend
 * Falls back to console log if not configured
 */
async function sendProductEmail(email, name) {
  const customerName = name || 'Operador';

  const subject = 'Tu acceso al Metodo Villano esta listo';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #f0ebe3; font-size: 24px; margin: 0;">VILLANO<span style="color: #c4a35a;">.AI</span></h1>
    </div>

    <div style="background: #161616; border: 1px solid #222; padding: 40px; margin-bottom: 20px;">
      <h2 style="color: #f0ebe3; font-size: 20px; margin: 0 0 20px;">Hola ${customerName},</h2>

      <p style="color: #a89f91; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">
        Tu pago ha sido confirmado. Aqui tienes tu acceso completo al Metodo Villano.
      </p>

      <div style="background: rgba(196, 163, 90, 0.15); border: 1px solid rgba(196, 163, 90, 0.3); padding: 20px; margin: 30px 0;">
        <p style="color: #c4a35a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 10px;">Tu acceso</p>
        <a href="${PDF_DOWNLOAD_URL}" style="display: inline-block; background: #c4a35a; color: #0a0a0a; padding: 15px 30px; text-decoration: none; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">DESCARGAR MATERIAL</a>
      </div>

      <p style="color: #a89f91; font-size: 14px; line-height: 1.7; margin: 20px 0 0;">
        <strong style="color: #f0ebe3;">Que incluye:</strong>
      </p>
      <ul style="color: #a89f91; font-size: 14px; line-height: 1.8; margin: 10px 0; padding-left: 20px;">
        <li>PDF Completo del Metodo (80+ paginas)</li>
        <li>Framework de Bots para Copy</li>
        <li>Plantillas de Copy Listas para Usar</li>
        <li>Lista de Sitios donde Vender Copy</li>
        <li>Guia de Implementacion Rapida (30 dias)</li>
      </ul>
    </div>

    <div style="background: #161616; border: 1px solid #222; padding: 30px; margin-bottom: 20px;">
      <h3 style="color: #f0ebe3; font-size: 16px; margin: 0 0 15px;">Proximos pasos:</h3>
      <ol style="color: #a89f91; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>Descarga todo el material desde el link arriba</li>
        <li>Lee el PDF completo - empieza por las bases de copywriting</li>
        <li>Configura tus bots siguiendo el framework</li>
        <li>Aplica las plantillas y empieza a generar ingresos</li>
      </ol>
    </div>

    <div style="text-align: center; padding: 30px 0; border-top: 1px solid #222;">
      <p style="color: #6b6560; font-size: 12px; margin: 0 0 10px;">
        Preguntas? Escribe a soporte@villano.ai
      </p>
      <p style="color: #6b6560; font-size: 12px; margin: 0;">
        VILLANO.AI &copy; 2026
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const textBody = `
Hola ${customerName},

Tu pago ha sido confirmado. Aqui tienes tu acceso completo al Metodo Villano.

DESCARGAR MATERIAL: ${PDF_DOWNLOAD_URL}

Que incluye:
- PDF Completo del Metodo (80+ paginas)
- Framework de Bots para Copy
- Plantillas de Copy Listas para Usar
- Lista de Sitios donde Vender Copy
- Guia de Implementacion Rapida (30 dias)

Proximos pasos:
1. Descarga todo el material desde el link arriba
2. Lee el PDF completo - empieza por las bases de copywriting
3. Configura tus bots siguiendo el framework
4. Aplica las plantillas y empieza a generar ingresos

Preguntas? Escribe a soporte@villano.ai

VILLANO.AI
  `.trim();

  // If Resend is not configured, just log
  if (!RESEND_API_KEY) {
    console.log('[Email] Would send to:', email);
    console.log('[Email] Subject:', subject);
    console.log('[Email] Download URL:', PDF_DOWNLOAD_URL);
    return { ok: true, simulated: true };
  }

  // Send via Resend with retry
  const maxRetries = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: email,
          subject: subject,
          html: htmlBody,
          text: textBody
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`[Email] Sent successfully to ${email}, id: ${data.id}`);
        return { ok: true, id: data.id };
      }

      const errorData = await response.text();
      lastError = new Error(`Resend API error: ${response.status} - ${errorData}`);
      console.error(`[Email] Attempt ${attempt} failed:`, lastError.message);

    } catch (err) {
      lastError = err;
      console.error(`[Email] Attempt ${attempt} network error:`, err.message);
    }

    // Exponential backoff
    if (attempt < maxRetries) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(r => setTimeout(r, delay));
    }
  }

  throw lastError;
}

module.exports = { sendProductEmail };
