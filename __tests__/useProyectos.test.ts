// @ts-nocheck
import { useProyectos } from "@/hooks/useProyectos"

// Test mínimo: asegurar que el hook existe y exporta la función esperada.
// Ejecuta con Jest/ Vitest en tu entorno de CI si quieres validar.
describe("useProyectos hook - smoke", () => {
    it("exporta useProyectos", () => {
        expect(typeof useProyectos).toBe("function")
    })
})
