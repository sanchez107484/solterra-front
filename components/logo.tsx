"use client"

import Image from "next/image"

type LogoProps = {
    size?: number
    className?: string
    bgClass?: string
}

export function Logo({ size = 40, className = "", bgClass = "bg-primary" }: LogoProps) {
    const outer = size + 4

    return (
        <div className={`rounded-xl shadow-lg ${bgClass}`} style={{ width: outer, height: outer }}>
            <div className="bg-icon overflow-hidden rounded-md p-1" style={{ width: size, height: size }}>
                <Image src="/solterra-logo.svg" alt="Solterra logo" width={size} height={size} className={`object-contain ${className}`} />
            </div>
        </div>
    )
}

export default Logo
