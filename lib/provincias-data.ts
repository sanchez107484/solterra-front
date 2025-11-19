/**
 * Mapa de provincias por Comunidad Autónoma en España
 */
export const COMUNIDADES_AUTONOMAS = {
    Andalucía: ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"],
    Aragón: ["Huesca", "Teruel", "Zaragoza"],
    Asturias: ["Asturias"],
    "Islas Baleares": ["Islas Baleares"],
    "Islas Canarias": ["Las Palmas", "Santa Cruz de Tenerife"],
    Cantabria: ["Cantabria"],
    "Castilla y León": ["Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"],
    "Castilla-La Mancha": ["Albacete", "Ciudad Real", "Cuenca", "Guadalajara", "Toledo"],
    Cataluña: ["Barcelona", "Gerona", "Lérida", "Tarragona"],
    "Comunidad Valenciana": ["Alicante", "Castellón", "Valencia"],
    Extremadura: ["Badajoz", "Cáceres"],
    Galicia: ["La Coruña", "Lugo", "Orense", "Pontevedra"],
    "Comunidad de Madrid": ["Madrid"],
    "Región de Murcia": ["Murcia"],
    "Comunidad Foral de Navarra": ["Navarra"],
    "País Vasco": ["Álava", "Guipúzcoa", "Vizcaya"],
    "La Rioja": ["La Rioja"],
    Ceuta: ["Ceuta"],
    Melilla: ["Melilla"],
} as const

/**
 * Obtener la comunidad autónoma de una provincia
 */
export function getComunidadFromProvincia(provincia: string): string | null {
    for (const [comunidad, provincias] of Object.entries(COMUNIDADES_AUTONOMAS)) {
        if ((provincias as readonly string[]).includes(provincia)) {
            return comunidad
        }
    }
    return null
}

/**
 * Obtener provincias de una comunidad autónoma
 */
export function getProvinciasFromComunidad(comunidad: string): string[] {
    const provincias = COMUNIDADES_AUTONOMAS[comunidad as keyof typeof COMUNIDADES_AUTONOMAS]
    return provincias ? [...provincias] : []
}

/**
 * Obtener lista de comunidades autónomas
 */
export function getComunidadesAutonomas(): string[] {
    return Object.keys(COMUNIDADES_AUTONOMAS)
}

/**
 * Obtener todas las provincias
 */
export function getAllProvincias(): string[] {
    return Object.values(COMUNIDADES_AUTONOMAS).flat().sort()
}
