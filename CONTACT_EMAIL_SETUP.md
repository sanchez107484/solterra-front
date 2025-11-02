# Implementación de Envío de Emails - Solterra Advisory

## Estado Actual

✅ Formulario de contacto funcional con validación
✅ API route `/api/contact` creada
✅ Toasts para feedback de usuario
✅ SEO optimizado en página de contacto
✅ Diccionarios actualizados (es/en)

## Pendiente: Integración con Resend

### Opción 1: Resend (Recomendado) ⭐

**Ventajas:**

- 100 emails/día gratis
- Muy fácil de integrar
- Excelente para Next.js
- Soporte TypeScript nativo

**Pasos para implementar:**

1. **Instalar Resend:**

```bash
npm install resend
```

2. **Obtener API Key:**

- Registrarse en https://resend.com
- Crear API key en el dashboard
- Agregar dominio verificado (o usar dominio de prueba)

3. **Configurar variables de entorno:**
   Crear/actualizar `.env.local`:

```env
RESEND_API_KEY=re_tu_api_key_aqui
```

4. **Descomentar código en `/app/api/contact/route.ts`:**

```typescript
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Descomentar el bloque de código marcado con "TODO"
await resend.emails.send({
    from: "Solterra Advisory <contacto@solterraadvisory.com>",
    to: "info@solterraadvisory.com",
    replyTo: email,
    subject: `Nuevo mensaje de contacto: ${tipo}`,
    html: `...`, // Ya está en el código
})
```

5. **Configurar dominio (producción):**

- En Resend dashboard, agregar dominio `solterraadvisory.com`
- Configurar registros DNS (MX, TXT, CNAME)
- Verificar dominio

### Opción 2: SendGrid

**Ventajas:**

- Muy robusto
- 100 emails/día gratis
- Usado por empresas grandes

**Pasos:**

1. **Instalar:**

```bash
npm install @sendgrid/mail
```

2. **Configurar:**

```typescript
import sgMail from "@sendgrid/mail"
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

await sgMail.send({
    to: "info@solterraadvisory.com",
    from: "contacto@solterraadvisory.com",
    replyTo: email,
    subject: `Nuevo mensaje: ${tipo}`,
    html: `...`,
})
```

### Opción 3: Nodemailer con Gmail SMTP

**Ventajas:**

- Gratuito
- No requiere servicio externo

**Desventajas:**

- Menos profesional
- Puede tener problemas de deliverability
- Requiere configurar app passwords

**Pasos:**

1. **Instalar:**

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

2. **Configurar Gmail:**

- Activar 2FA en cuenta Gmail
- Crear "App Password" en configuración de cuenta
- Usar ese password en `.env.local`

3. **Código:**

```typescript
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
})

await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: "info@solterraadvisory.com",
    replyTo: email,
    subject: `Nuevo mensaje: ${tipo}`,
    html: `...`,
})
```

## Mejoras Opcionales

### Email Template con React Email

Para emails más profesionales:

```bash
npm install react-email @react-email/components
```

Crear template en `emails/contact-notification.tsx`:

```tsx
import { Html, Head, Body, Container, Text, Hr } from "@react-email/components"

export default function ContactNotification({ nombre, email, tipo, mensaje }) {
    return (
        <Html>
            <Head />
            <Body style={{ fontFamily: "Arial, sans-serif" }}>
                <Container>
                    <Text>Nuevo mensaje de contacto</Text>
                    <Hr />
                    <Text>
                        <strong>Nombre:</strong> {nombre}
                    </Text>
                    <Text>
                        <strong>Email:</strong> {email}
                    </Text>
                    <Text>
                        <strong>Tipo:</strong> {tipo}
                    </Text>
                    <Text>
                        <strong>Mensaje:</strong>
                    </Text>
                    <Text>{mensaje}</Text>
                </Container>
            </Body>
        </Html>
    )
}
```

### Rate Limiting

Proteger contra spam con `@upstash/ratelimit`:

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 mensajes por hora
})

// En la API route:
const identifier = request.headers.get("x-forwarded-for") ?? "anonymous"
const { success } = await ratelimit.limit(identifier)

if (!success) {
    return NextResponse.json({ error: "Demasiados intentos. Intenta más tarde." }, { status: 429 })
}
```

## Estado del Formulario

**Actualmente funciona:**

- ✅ Validación de campos
- ✅ Loading state durante envío
- ✅ Toast notifications (éxito/error)
- ✅ Reset del form después de envío exitoso
- ✅ Logs en consola del servidor
- ✅ Respuestas correctas (200, 400, 500)

**Para producción:**

- ⏳ Integrar Resend (u otro servicio)
- ⏳ Configurar dominio y DNS
- ⏳ (Opcional) Rate limiting
- ⏳ (Opcional) Templates profesionales
- ⏳ (Opcional) Auto-respuesta al usuario

## Testing

Probar el formulario:

1. Llenar todos los campos
2. Enviar
3. Verificar toast de éxito
4. Verificar logs en consola del servidor
5. Una vez integrado Resend, verificar email recibido

## Costos

- **Resend:** Gratis hasta 100 emails/día, $20/mes para 50,000 emails
- **SendGrid:** Gratis hasta 100 emails/día, $15/mes para 40,000 emails
- **Nodemailer + Gmail:** Gratis (límite 500 emails/día por cuenta Gmail)
