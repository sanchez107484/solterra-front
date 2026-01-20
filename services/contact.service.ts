import api from "@/lib/api/client"

export interface ContactData {
    nombre: string
    email: string
    telefono?: string
    tipo: "propietario" | "promotor" | "general" | "soporte"
    mensaje: string
}

export const contactService = {
    async sendMessage(contactData: ContactData): Promise<{ success: boolean; message: string }> {
        const resp = await api.post("/contactos", contactData)
        return resp.data
    },
}
