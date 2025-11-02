import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { nombre, email, telefono, tipo, mensaje } = body

        // Validación básica
        if (!nombre || !email || !tipo || !mensaje) {
            return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Email inválido" }, { status: 400 })
        }

        // TODO: Implementar envío real con Resend
        // Por ahora, simulamos el envío
        console.log("Mensaje de contacto recibido:", {
            nombre,
            email,
            telefono,
            tipo,
            mensaje,
            fecha: new Date().toISOString(),
        })

        // Aquí irá la integración con Resend:
        /*
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        await resend.emails.send({
            from: 'Solterra Advisory <contacto@solterraadvisory.com>',
            to: 'info@solterraadvisory.com',
            replyTo: email,
            subject: `Nuevo mensaje de contacto: ${tipo}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
                <p><strong>Tipo de consulta:</strong> ${tipo}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `
        })
        */

        return NextResponse.json(
            {
                success: true,
                message: "Mensaje enviado correctamente",
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error al procesar mensaje de contacto:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
