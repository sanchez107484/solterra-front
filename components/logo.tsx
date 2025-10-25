"use client"

import Image from "next/image"

type LogoProps = {
    size?: number
    className?: string
    bgClass?: string
}

/**
 * Logo
 * - Muestra el icono dentro de un contenedor cuadrado
 * - Añade un borde 'primary' sutil y un glow difuminado para destacar
 * - Centra perfectamente la imagen tanto vertical como horizontalmente
 */
export function Logo({ size = 40, className = "", bgClass = "bg-primary" }: LogoProps) {
    // espacio extra alrededor del icono para el borde/glow
    const outer = size + 16

    return (
        <div className={`relative inline-block ${className}`} style={{ width: outer, height: outer }} aria-hidden={false}>
            {/* Glow / difuminado (detrás) */}
            <div className="pointer-events-none absolute inset-0 rounded-xl">
                <div className="from-primary/30 via-primary/18 absolute inset-0 rounded-xl bg-gradient-to-br to-transparent opacity-95 blur-2xl" />
                {/* Borde más ancho y color primary */}
                <div className="border-primary absolute inset-0 rounded-xl border-4" />
                {/* Anillo/sombra primaria para dar más presencia (usa ring para tintar con primary con opacidad) */}
                <div className="ring-primary/30 pointer-events-none absolute inset-0 rounded-xl ring-1" />
                {/* Sombra general para dar profundidad */}
                <div className="pointer-events-none absolute inset-0 rounded-xl shadow-xl" />
            </div>

            {/* Contenedor cuadrado que contiene el icono centrado y usa bg-icon en todo el área interior */}
            <div
                className="bg-icon relative z-10 flex items-center justify-center overflow-hidden rounded-xl"
                style={{ width: outer, height: outer, padding: 8 }}
            >
                <div className="flex items-center justify-center rounded-md" style={{ width: size, height: size }}>
                    {/* Usar SVG para mejor nitidez y escalado */}
                    <Image src="/solterra-logo2.svg" alt="Solterra logo" width={size} height={size} className="object-contain" />
                </div>
            </div>
        </div>
    )
}

export default Logo
