/**
 * Template de email HTML profesional para notificaciones de contacto
 *
 * Uso en /app/api/contact/route.ts:
 *
 * import { generateContactEmailHTML } from '@/lib/email-templates'
 *
 * const html = generateContactEmailHTML({
 *   nombre,
 *   email,
 *   telefono,
 *   tipo,
 *   mensaje
 * })
 *
 * await resend.emails.send({
 *   html: html,
 *   ...
 * })
 */

interface ContactEmailData {
    nombre: string
    email: string
    telefono?: string
    tipo: string
    mensaje: string
}

const tipoLabels: Record<string, string> = {
    propietario: "Propietario de terreno",
    promotor: "Promotor de proyectos",
    general: "Consulta general",
    soporte: "Soporte técnico",
}

export function generateContactEmailHTML(data: ContactEmailData): string {
    const { nombre, email, telefono, tipo, mensaje } = data
    const tipoLabel = tipoLabels[tipo] || tipo

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje de contacto - Solterra Advisory</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                                ⚡ Nuevo Mensaje de Contacto
                            </h1>
                            <p style="margin: 8px 0 0 0; color: #ffffff; opacity: 0.95; font-size: 14px;">
                                Solterra Advisory
                            </p>
                        </td>
                    </tr>

                    <!-- Badge -->
                    <tr>
                        <td style="padding: 24px 30px 0 30px;">
                            <span style="display: inline-block; background-color: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                                ${tipoLabel}
                            </span>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 24px 30px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                
                                <!-- Nombre -->
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                                        <p style="margin: 0 0 4px 0; font-size: 12px; color: #737373; font-weight: 600; text-transform: uppercase;">
                                            Nombre
                                        </p>
                                        <p style="margin: 0; font-size: 16px; color: #262626; font-weight: 500;">
                                            ${nombre}
                                        </p>
                                    </td>
                                </tr>

                                <!-- Email -->
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                                        <p style="margin: 0 0 4px 0; font-size: 12px; color: #737373; font-weight: 600; text-transform: uppercase;">
                                            Email
                                        </p>
                                        <p style="margin: 0;">
                                            <a href="mailto:${email}" style="font-size: 16px; color: #22c55e; text-decoration: none; font-weight: 500;">
                                                ${email}
                                            </a>
                                        </p>
                                    </td>
                                </tr>

                                ${
                                    telefono
                                        ? `
                                <!-- Teléfono -->
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                                        <p style="margin: 0 0 4px 0; font-size: 12px; color: #737373; font-weight: 600; text-transform: uppercase;">
                                            Teléfono
                                        </p>
                                        <p style="margin: 0;">
                                            <a href="tel:${telefono}" style="font-size: 16px; color: #22c55e; text-decoration: none; font-weight: 500;">
                                                ${telefono}
                                            </a>
                                        </p>
                                    </td>
                                </tr>
                                `
                                        : ""
                                }

                                <!-- Mensaje -->
                                <tr>
                                    <td style="padding: 20px 0 0 0;">
                                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #737373; font-weight: 600; text-transform: uppercase;">
                                            Mensaje
                                        </p>
                                        <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
                                            <p style="margin: 0; font-size: 15px; color: #262626; line-height: 1.6; white-space: pre-wrap;">
${mensaje}
                                            </p>
                                        </div>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>

                    <!-- Action Button -->
                    <tr>
                        <td style="padding: 24px 30px 30px 30px; text-align: center;">
                            <a href="mailto:${email}" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
                                Responder a ${nombre}
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #fafafa; padding: 20px 30px; border-top: 1px solid #e5e5e5;">
                            <p style="margin: 0; font-size: 12px; color: #737373; text-align: center;">
                                Este mensaje fue enviado desde el formulario de contacto de<br>
                                <strong>Solterra Advisory</strong> - Plataforma de energía renovable
                            </p>
                            <p style="margin: 12px 0 0 0; font-size: 11px; color: #a3a3a3; text-align: center;">
                                ${new Date().toLocaleString("es-ES", {
                                    dateStyle: "full",
                                    timeStyle: "short",
                                })}
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim()
}
