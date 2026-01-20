import { LegalLayout } from "@/components/legal/legal-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Política de Cookies | Solterra Advisory",
    description: "Información sobre el uso de cookies en Solterra Advisory y cómo gestionarlas",
}

export default function CookiesPage() {
    return (
        <LegalLayout title="Política de Cookies" lastUpdated="31 de octubre de 2025" icon="cookies">
            {/* Introducción */}
            <section className="mb-8">
                <p className="mb-4">
                    En <strong>Solterra Advisory</strong> utilizamos cookies y tecnologías similares para mejorar su experiencia de
                    navegación, analizar el uso de nuestro sitio web y mostrar contenido personalizado. Esta política explica qué son las
                    cookies, qué tipos utilizamos y cómo puede gestionarlas.
                </p>
            </section>

            {/* Qué son las cookies */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">1. ¿Qué son las cookies?</h2>
                <p className="mb-4">
                    Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet o smartphone) cuando
                    visita nuestro sitio web. Estas cookies permiten que el sitio web reconozca su dispositivo y recuerde información sobre
                    su visita, como sus preferencias de idioma o sus datos de inicio de sesión.
                </p>
                <p className="mb-4">
                    Las cookies no pueden acceder a información personal almacenada en su dispositivo ni pueden transmitir virus. Se
                    utilizan únicamente para los fines descritos en esta política.
                </p>
            </section>

            {/* Tipos de cookies */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">2. Tipos de cookies que utilizamos</h2>

                <div className="space-y-6">
                    {/* Cookies técnicas */}
                    <div className="bg-card rounded-lg border p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                                <span className="text-2xl">🔧</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookies Técnicas (Necesarias)</h3>
                                <p className="text-muted-foreground text-sm">Esenciales para el funcionamiento del sitio</p>
                            </div>
                        </div>
                        <p className="mb-3 text-sm">
                            Estas cookies son imprescindibles para que pueda navegar por el sitio web y utilizar sus funciones básicas. Sin
                            ellas, no podríamos proporcionar servicios esenciales como:
                        </p>
                        <ul className="mb-3 list-disc space-y-1 pl-6 text-sm">
                            <li>Mantener su sesión iniciada mientras navega</li>
                            <li>Recordar sus preferencias de idioma</li>
                            <li>Garantizar la seguridad de la plataforma</li>
                            <li>Permitir el funcionamiento del carrito o formularios</li>
                        </ul>
                        <div className="bg-muted mt-4 rounded p-3 text-xs">
                            <strong>Consentimiento:</strong> No requieren consentimiento (son estrictamente necesarias)
                            <br />
                            <strong>Duración:</strong> Sesión o hasta 12 meses
                        </div>
                    </div>

                    {/* Cookies analíticas */}
                    <div className="bg-card rounded-lg border p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookies Analíticas</h3>
                                <p className="text-muted-foreground text-sm">Análisis de uso y rendimiento</p>
                            </div>
                        </div>
                        <p className="mb-3 text-sm">
                            Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio web, permitiéndonos mejorar continuamente
                            la experiencia. Recopilamos información sobre:
                        </p>
                        <ul className="mb-3 list-disc space-y-1 pl-6 text-sm">
                            <li>Páginas visitadas y tiempo de navegación</li>
                            <li>Enlaces y botones en los que hace clic</li>
                            <li>Errores técnicos encontrados</li>
                            <li>Dispositivos y navegadores utilizados</li>
                        </ul>
                        <div className="mt-4 space-y-2">
                            <div className="bg-muted rounded p-3 text-xs">
                                <strong>Proveedor:</strong> Google Analytics, Vercel Analytics
                                <br />
                                <strong>Consentimiento:</strong> Requiere consentimiento previo
                                <br />
                                <strong>Duración:</strong> Hasta 2 años
                            </div>
                        </div>
                    </div>

                    {/* Cookies funcionales */}
                    <div className="bg-card rounded-lg border p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                                <span className="text-2xl">⚙️</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookies Funcionales</h3>
                                <p className="text-muted-foreground text-sm">Mejora de funcionalidades</p>
                            </div>
                        </div>
                        <p className="mb-3 text-sm">
                            Permiten recordar sus preferencias y opciones para ofrecerle una experiencia más personalizada:
                        </p>
                        <ul className="mb-3 list-disc space-y-1 pl-6 text-sm">
                            <li>Preferencias de visualización (modo oscuro/claro)</li>
                            <li>Configuración de notificaciones</li>
                            <li>Preferencias de filtros en búsquedas</li>
                            <li>Historial de búsquedas recientes</li>
                        </ul>
                        <div className="bg-muted mt-4 rounded p-3 text-xs">
                            <strong>Consentimiento:</strong> Requiere consentimiento previo
                            <br />
                            <strong>Duración:</strong> Hasta 12 meses
                        </div>
                    </div>

                    {/* Cookies de marketing (futuro) */}
                    <div className="bg-muted/30 rounded-lg border border-dashed p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookies de Marketing</h3>
                                <p className="text-muted-foreground text-sm">Actualmente no utilizadas</p>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            En el futuro, podríamos utilizar cookies de marketing para mostrar publicidad relevante. Si implementamos estas
                            cookies, actualizaremos esta política y le solicitaremos su consentimiento explícito.
                        </p>
                    </div>
                </div>
            </section>

            {/* Lista detallada de cookies */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">3. Detalle de las cookies utilizadas</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-muted border-b">
                                <th className="p-3 text-left font-semibold">Nombre</th>
                                <th className="p-3 text-left font-semibold">Tipo</th>
                                <th className="p-3 text-left font-semibold">Finalidad</th>
                                <th className="p-3 text-left font-semibold">Duración</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="p-3 font-mono text-xs">session_token</td>
                                <td className="p-3">Técnica</td>
                                <td className="p-3">Mantener la sesión del usuario</td>
                                <td className="p-3">Sesión</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-xs">auth_refresh</td>
                                <td className="p-3">Técnica</td>
                                <td className="p-3">Renovación automática de sesión</td>
                                <td className="p-3">7 días</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-xs">cookie_consent</td>
                                <td className="p-3">Técnica</td>
                                <td className="p-3">Recordar preferencias de cookies</td>
                                <td className="p-3">12 meses</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-xs">theme_preference</td>
                                <td className="p-3">Funcional</td>
                                <td className="p-3">Modo oscuro/claro</td>
                                <td className="p-3">12 meses</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-xs">language</td>
                                <td className="p-3">Funcional</td>
                                <td className="p-3">Idioma preferido</td>
                                <td className="p-3">12 meses</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-xs">_ga</td>
                                <td className="p-3">Analítica</td>
                                <td className="p-3">Google Analytics - ID único de usuario</td>
                                <td className="p-3">2 años</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-mono text-xs">_ga_*</td>
                                <td className="p-3">Analítica</td>
                                <td className="p-3">Google Analytics - Estado de sesión</td>
                                <td className="p-3">2 años</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Cómo gestionar cookies */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">4. Cómo gestionar y eliminar cookies</h2>

                <h3 className="mb-3 text-xl font-semibold">4.1. Panel de preferencias de cookies</h3>
                <p className="mb-4">
                    Puede gestionar sus preferencias de cookies en cualquier momento haciendo clic en el botón{" "}
                    <strong>"Configuración de Cookies"</strong> que aparece en el pie de página de nuestro sitio web.
                </p>

                <h3 className="mb-3 text-xl font-semibold">4.2. Configuración del navegador</h3>
                <p className="mb-4">
                    También puede gestionar las cookies directamente desde la configuración de su navegador. A continuación le indicamos
                    cómo hacerlo en los navegadores más comunes:
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-card rounded-lg border p-4">
                        <h4 className="mb-2 font-semibold">Google Chrome</h4>
                        <p className="text-muted-foreground text-sm">
                            Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
                        </p>
                        <a
                            href="https://support.google.com/chrome/answer/95647"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary mt-2 inline-block text-xs hover:underline"
                        >
                            Más información →
                        </a>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <h4 className="mb-2 font-semibold">Mozilla Firefox</h4>
                        <p className="text-muted-foreground text-sm">Opciones → Privacidad y seguridad → Cookies y datos del sitio</p>
                        <a
                            href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary mt-2 inline-block text-xs hover:underline"
                        >
                            Más información →
                        </a>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <h4 className="mb-2 font-semibold">Safari</h4>
                        <p className="text-muted-foreground text-sm">Preferencias → Privacidad → Gestionar datos de sitios web</p>
                        <a
                            href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary mt-2 inline-block text-xs hover:underline"
                        >
                            Más información →
                        </a>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <h4 className="mb-2 font-semibold">Microsoft Edge</h4>
                        <p className="text-muted-foreground text-sm">
                            Configuración → Cookies y permisos de sitios → Administrar y eliminar cookies
                        </p>
                        <a
                            href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary mt-2 inline-block text-xs hover:underline"
                        >
                            Más información →
                        </a>
                    </div>
                </div>

                <div className="mt-4 rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4 dark:bg-orange-900/20">
                    <p className="text-sm">
                        <strong>⚠️ Importante:</strong> Bloquear o eliminar todas las cookies puede afectar negativamente a su experiencia
                        de navegación y algunas funcionalidades del sitio podrían no funcionar correctamente (como mantener su sesión
                        iniciada).
                    </p>
                </div>
            </section>

            {/* Cookies de terceros */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">5. Cookies de terceros</h2>
                <p className="mb-4">Utilizamos servicios de terceros que pueden establecer sus propias cookies en su dispositivo:</p>

                <div className="space-y-4">
                    <div className="bg-card rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-semibold">Google Analytics</h4>
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                Analíticas
                            </span>
                        </div>
                        <p className="text-muted-foreground mb-2 text-sm">
                            Servicio de análisis web que nos proporciona información sobre cómo los usuarios interactúan con nuestro sitio.
                        </p>
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-xs hover:underline"
                        >
                            Política de privacidad de Google →
                        </a>
                        <br />
                        <a
                            href="https://tools.google.com/dlpage/gaoptout"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-xs hover:underline"
                        >
                            Desactivar Google Analytics →
                        </a>
                    </div>

                    <div className="bg-card rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-semibold">Vercel Analytics</h4>
                            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                Rendimiento
                            </span>
                        </div>
                        <p className="text-muted-foreground mb-2 text-sm">
                            Análisis de rendimiento y velocidad del sitio web. No recopila información personal identificable.
                        </p>
                        <a
                            href="https://vercel.com/legal/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-xs hover:underline"
                        >
                            Política de privacidad de Vercel →
                        </a>
                    </div>
                </div>
            </section>

            {/* Actualizaciones */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">6. Actualizaciones de esta política</h2>
                <p className="mb-4">
                    Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en las tecnologías que utilizamos o por
                    requisitos legales. La versión actualizada siempre estará disponible en esta página con la fecha de última modificación
                    en la parte superior.
                </p>
                <p className="mb-4">
                    Le recomendamos revisar esta política regularmente. Si realizamos cambios significativos, se lo notificaremos mediante
                    un aviso destacado en el sitio web.
                </p>
            </section>

            {/* Más información */}
            <section>
                <h2 className="mb-4 text-2xl font-bold">7. Más información y contacto</h2>
                <p className="mb-4">
                    Si tiene dudas sobre nuestra Política de Cookies o sobre cómo gestionamos las cookies, puede contactar con nosotros:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        Email:{" "}
                        <a href="mailto:info@solterradvisory.com" className="text-primary hover:underline">
                            info@solterradvisory.com
                        </a>
                    </li>
                    <li>
                        Delegado de Protección de Datos:{" "}
                        <a href="mailto:dpo@solterradvisory.com" className="text-primary hover:underline">
                            dpo@solterradvisory.com
                        </a>
                    </li>
                    <li>
                        Formulario de contacto:{" "}
                        <a href="/contacto" className="text-primary hover:underline">
                            www.solterradvisory.com/contacto
                        </a>
                    </li>
                </ul>
            </section>
        </LegalLayout>
    )
}
