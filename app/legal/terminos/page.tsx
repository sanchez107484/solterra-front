import { LegalLayout } from "@/components/legal/legal-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Términos y Condiciones | Solterra Advisory",
    description:
        "Términos y condiciones de uso de la plataforma Solterra Advisory para propietarios de terrenos y promotores de energías renovables.",
}

export default function TerminosPage() {
    return (
        <LegalLayout title="Términos y Condiciones de Uso" lastUpdated="15 de enero de 2025" icon="terms">
            {/* 1. Aceptación de los términos */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">1. Aceptación de los Términos</h2>
                <p className="mb-4">
                    Al acceder y utilizar la plataforma <strong>Solterra Advisory</strong> (en adelante, "la Plataforma"), usted acepta
                    quedar vinculado por estos Términos y Condiciones de Uso. Si no está de acuerdo con alguna parte de estos términos, no
                    debe utilizar nuestros servicios.
                </p>
                <p className="text-muted-foreground">
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor una vez
                    publicados en la Plataforma. Es responsabilidad del usuario revisar periódicamente estos términos.
                </p>
            </section>

            {/* 2. Descripción del servicio */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">2. Descripción del Servicio</h2>
                <p className="mb-4">
                    Solterra Advisory es una <strong>plataforma digital de intermediación</strong> que conecta a:
                </p>
                <ul className="text-muted-foreground mb-4 ml-6 list-disc space-y-2">
                    <li>
                        <strong className="text-gray-900 dark:text-white">Propietarios de terrenos rurales</strong> interesados en ceder sus
                        propiedades para proyectos de energías renovables.
                    </li>
                    <li>
                        <strong className="text-gray-900 dark:text-white">Promotores y desarrolladores</strong> de proyectos de energía
                        solar, eólica y otras renovables que buscan terrenos adecuados.
                    </li>
                </ul>
                <div className="border-accent bg-accent/5 rounded-lg border-l-4 p-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">⚠️ Importante:</p>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Solterra Advisory actúa exclusivamente como intermediario tecnológico. No somos parte en los contratos de
                        arrendamiento, compraventa o desarrollo de proyectos que puedan surgir entre propietarios y promotores.
                    </p>
                </div>
            </section>

            {/* 3. Registro y cuentas de usuario */}
            <section className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">3. Registro y Cuentas de Usuario</h2>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">3.1. Requisitos de registro</h3>
                <ul className="text-muted-foreground mb-6 ml-6 list-disc space-y-2">
                    <li>Ser mayor de 18 años.</li>
                    <li>Proporcionar información veraz, precisa y actualizada.</li>
                    <li>Mantener la confidencialidad de sus credenciales de acceso.</li>
                    <li>Notificar inmediatamente cualquier uso no autorizado de su cuenta.</li>
                </ul>
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">3.2. Tipos de usuarios</h3>
                <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-950/20 dark:to-emerald-950/20">
                        <h4 className="mb-2 font-semibold text-green-900 dark:text-green-100">🌱 Propietarios de Terrenos</h4>
                        <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                            <li>• Registran sus terrenos con información detallada</li>
                            <li>• Reciben matches con proyectos compatibles</li>
                            <li>• Acceden a información de promotores interesados</li>
                        </ul>
                    </div>
                    <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-sky-50 p-4 dark:from-blue-950/20 dark:to-sky-950/20">
                        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">⚡ Promotores de Proyectos</h4>
                        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                            <li>• Publican sus proyectos con requisitos específicos</li>
                            <li>• Reciben matches con terrenos adecuados</li>
                            <li>• Acceden a información de propietarios potenciales</li>
                        </ul>
                    </div>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">3.3. Verificación de identidad</h3>
                <p className="text-muted-foreground">
                    Nos reservamos el derecho de solicitar documentación adicional para verificar su identidad y la legitimidad de los
                    terrenos o proyectos registrados. Los usuarios deben cooperar con estos procesos de verificación.
                </p>
            </section>

            {/* 4. Uso de la plataforma */}
            <section className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">4. Uso de la Plataforma</h2>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">4.1. Obligaciones generales</h3>
                <p className="mb-3">Los usuarios se comprometen a:</p>
                <ul className="text-muted-foreground mb-6 ml-6 list-disc space-y-2">
                    <li>
                        Proporcionar <strong className="text-gray-900 dark:text-white">información veraz y actualizada</strong> sobre
                        terrenos y proyectos.
                    </li>
                    <li>Utilizar la Plataforma de forma legal y conforme a estos términos.</li>
                    <li>No suplantar la identidad de otras personas o entidades.</li>
                    <li>No interferir con el funcionamiento técnico de la Plataforma.</li>
                    <li>Respetar los derechos de propiedad intelectual de Solterra Advisory y terceros.</li>
                </ul>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">4.2. Usos prohibidos</h3>
                <p className="mb-3">Está estrictamente prohibido:</p>
                <ul className="text-muted-foreground ml-6 list-disc space-y-2">
                    <li>Publicar información falsa, engañosa o fraudulenta sobre terrenos o proyectos.</li>
                    <li>Registrar terrenos sobre los que no se tiene derecho de propiedad o representación legal.</li>
                    <li>Utilizar la Plataforma para fines ilegales o actividades fraudulentas.</li>
                    <li>Acosar, amenazar o causar molestias a otros usuarios.</li>
                    <li>
                        Realizar "scraping", minería de datos o recopilación automatizada de información de la Plataforma sin autorización
                        expresa.
                    </li>
                    <li>Intentar acceder a áreas restringidas o cuentas de otros usuarios.</li>
                    <li>Distribuir virus, malware o cualquier código malicioso.</li>
                </ul>
            </section>

            {/* 5. Sistema de matching */}
            <section className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">5. Sistema de Matching</h2>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">5.1. Funcionamiento</h3>
                <p className="mb-3">
                    Nuestra Plataforma utiliza algoritmos automatizados para identificar compatibilidades entre terrenos registrados por
                    propietarios y proyectos publicados por promotores. Los criterios de matching incluyen:
                </p>
                <ul className="text-muted-foreground mb-6 ml-6 list-disc space-y-2">
                    <li>Ubicación geográfica (provincia, municipio)</li>
                    <li>Superficie disponible</li>
                    <li>Tipo de proyecto de energía renovable</li>
                    <li>Características técnicas del terreno</li>
                    <li>Requisitos específicos del proyecto</li>
                </ul>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">5.2. Naturaleza del matching</h3>
                <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950/20">
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                        ⚠️ Aviso importante: El matching es una herramienta orientativa basada en criterios técnicos. No garantizamos que:
                    </p>
                    <ul className="mt-3 ml-4 space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                        <li>• El terreno sea apto para el proyecto desde el punto de vista legal o técnico</li>
                        <li>• Se llegue a un acuerdo comercial entre las partes</li>
                        <li>• El proyecto sea finalmente viable o se ejecute</li>
                        <li>• La información proporcionada por las partes sea completamente precisa</li>
                    </ul>
                </div>
            </section>

            {/* 6. Relaciones entre usuarios */}
            <section className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">6. Relaciones entre Propietarios y Promotores</h2>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">6.1. Independencia de las partes</h3>
                <p className="text-muted-foreground mb-6">
                    <strong className="text-gray-900 dark:text-white">Solterra Advisory no es parte</strong> en las negociaciones, acuerdos
                    o contratos que puedan establecerse entre propietarios de terrenos y promotores de proyectos. Nuestra responsabilidad se
                    limita a facilitar el contacto inicial.
                </p>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">6.2. Due diligence y verificaciones</h3>
                <p className="mb-4">Cada parte es responsable de realizar sus propias verificaciones, incluyendo pero no limitado a:</p>
                <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border bg-gradient-to-br from-purple-50 to-pink-50 p-4 dark:from-purple-950/20 dark:to-pink-950/20">
                        <h4 className="mb-3 text-sm font-semibold text-purple-900 dark:text-purple-100">✓ Propietarios deben verificar:</h4>
                        <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                            <li>• Solvencia y reputación del promotor</li>
                            <li>• Viabilidad técnica y económica del proyecto</li>
                            <li>• Condiciones contractuales propuestas</li>
                            <li>• Impacto ambiental y social del proyecto</li>
                        </ul>
                    </div>
                    <div className="rounded-lg border bg-gradient-to-br from-orange-50 to-amber-50 p-4 dark:from-orange-950/20 dark:to-amber-950/20">
                        <h4 className="mb-3 text-sm font-semibold text-orange-900 dark:text-orange-100">✓ Promotores deben verificar:</h4>
                        <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
                            <li>• Titularidad legal del terreno</li>
                            <li>• Cargas, gravámenes y limitaciones legales</li>
                            <li>• Condiciones urbanísticas y medioambientales</li>
                            <li>• Características técnicas reales del terreno</li>
                        </ul>
                    </div>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">6.3. Asesoramiento profesional</h3>
                <p className="text-muted-foreground">
                    Recomendamos encarecidamente que ambas partes consulten con{" "}
                    <strong className="text-gray-900 dark:text-white">asesores legales, técnicos y financieros</strong> independientes antes
                    de formalizar cualquier acuerdo. Solterra Advisory no proporciona asesoramiento legal, financiero o técnico.
                </p>
            </section>

            {/* 7. Responsabilidades y limitaciones */}
            <section className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">7. Responsabilidades y Limitaciones</h2>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">7.1. Limitación de responsabilidad</h3>
                <p className="mb-3">Solterra Advisory no será responsable de:</p>
                <ul className="text-muted-foreground mb-6 ml-6 list-disc space-y-2">
                    <li>La veracidad, exactitud o completitud de la información proporcionada por los usuarios.</li>
                    <li>El resultado de las negociaciones entre propietarios y promotores.</li>
                    <li>El cumplimiento o incumplimiento de los acuerdos alcanzados entre usuarios.</li>
                    <li>
                        Daños o pérdidas derivados del uso de la Plataforma, incluyendo pérdida de oportunidades comerciales o beneficios
                        esperados.
                    </li>
                    <li>Problemas técnicos, interrupciones del servicio o pérdida de datos.</li>
                    <li>Actuaciones fraudulentas o negligentes de otros usuarios.</li>
                </ul>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">7.2. Exención de garantías</h3>
                <p className="text-muted-foreground mb-6">
                    La Plataforma se proporciona "tal cual" y "según disponibilidad". No garantizamos que el servicio sea ininterrumpido,
                    seguro o libre de errores.
                </p>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">7.3. Indemnización</h3>
                <p className="mb-3">
                    El usuario acepta indemnizar y mantener indemne a Solterra Advisory, sus empleados, directivos y colaboradores, frente a
                    cualquier reclamación, pérdida, daño o gasto (incluyendo honorarios legales razonables) derivados de:
                </p>
                <ul className="text-muted-foreground ml-6 list-disc space-y-2">
                    <li>El incumplimiento de estos Términos y Condiciones.</li>
                    <li>La violación de derechos de terceros.</li>
                    <li>El uso indebido de la Plataforma.</li>
                </ul>
            </section>

            {/* 8. Propiedad intelectual */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">8. Propiedad Intelectual</h2>
                <p className="mb-4">
                    Todos los contenidos de la Plataforma (diseño, código, textos, gráficos, logotipos, iconos, imágenes, software) son
                    propiedad exclusiva de <strong>Solterra Advisory</strong> o de sus licenciantes y están protegidos por las leyes de
                    propiedad intelectual e industrial.
                </p>
                <p className="mb-3">Queda prohibido:</p>
                <ul className="text-muted-foreground ml-6 list-disc space-y-2">
                    <li>Reproducir, distribuir o modificar cualquier contenido de la Plataforma sin autorización expresa.</li>
                    <li>Utilizar las marcas, nombres comerciales o logotipos de Solterra Advisory sin permiso previo por escrito.</li>
                    <li>Realizar ingeniería inversa del software o algoritmos de la Plataforma.</li>
                </ul>
            </section>

            {/* 9. Modificaciones del servicio */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">9. Modificaciones del Servicio</h2>
                <p className="mb-3">Nos reservamos el derecho de:</p>
                <ul className="text-muted-foreground mb-4 ml-6 list-disc space-y-2">
                    <li>Modificar, suspender o discontinuar cualquier aspecto de la Plataforma en cualquier momento.</li>
                    <li>Cambiar o eliminar funcionalidades sin previo aviso.</li>
                    <li>Establecer límites al uso del servicio o al almacenamiento de datos.</li>
                </ul>
                <p className="text-muted-foreground">
                    Haremos esfuerzos razonables para notificar cambios significativos con antelación, pero no estamos obligados a ello.
                </p>
            </section>

            {/* 10. Suspensión y terminación */}
            <section className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">10. Suspensión y Terminación de Cuentas</h2>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">10.1. Por el usuario</h3>
                <p className="text-muted-foreground mb-6">
                    Los usuarios pueden cancelar su cuenta en cualquier momento desde la configuración de su perfil o contactando con
                    nuestro soporte.
                </p>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">10.2. Por Solterra Advisory</h3>
                <p className="mb-3">Nos reservamos el derecho de suspender o cancelar cuentas, sin previo aviso, en caso de:</p>
                <ul className="text-muted-foreground mb-6 ml-6 list-disc space-y-2">
                    <li>Incumplimiento de estos Términos y Condiciones.</li>
                    <li>Sospecha razonable de actividad fraudulenta o ilegal.</li>
                    <li>Falta de cooperación en procesos de verificación.</li>
                    <li>Conducta abusiva hacia otros usuarios o personal de Solterra Advisory.</li>
                    <li>Inactividad prolongada de la cuenta (más de 24 meses).</li>
                </ul>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">10.3. Consecuencias de la terminación</h3>
                <p className="mb-3">Tras la terminación de una cuenta:</p>
                <ul className="text-muted-foreground ml-6 list-disc space-y-2">
                    <li>El usuario perderá acceso a todos los servicios de la Plataforma.</li>
                    <li>Los datos del usuario podrán ser eliminados según nuestra Política de Privacidad.</li>
                    <li>
                        Conservaremos cierta información según lo requerido por ley o para resolver disputas y hacer cumplir nuestros
                        acuerdos.
                    </li>
                </ul>
            </section>

            {/* 11. Protección de datos */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">11. Protección de Datos Personales</h2>
                <p className="mb-4">
                    El tratamiento de datos personales se rige por nuestra{" "}
                    <a href="/legal/privacidad" className="text-primary font-semibold hover:underline">
                        Política de Privacidad
                    </a>
                    , que forma parte integrante de estos Términos y Condiciones.
                </p>
                <p className="mb-3">Al utilizar la Plataforma, el usuario:</p>
                <ul className="text-muted-foreground ml-6 list-disc space-y-2">
                    <li>Consiente el tratamiento de sus datos según lo establecido en la Política de Privacidad.</li>
                    <li>Se compromete a proporcionar datos veraces y actualizados.</li>
                    <li>Reconoce sus derechos ARCO-POL (Acceso, Rectificación, Cancelación, Oposición, Portabilidad y Olvido).</li>
                </ul>
            </section>

            {/* 12. Comunicaciones */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">12. Comunicaciones</h2>
                <p className="mb-3">Al registrarse, el usuario acepta recibir comunicaciones de Solterra Advisory, incluyendo:</p>
                <ul className="text-muted-foreground mb-4 ml-6 list-disc space-y-2">
                    <li>Notificaciones de nuevos matches y mensajes de otros usuarios.</li>
                    <li>Actualizaciones de servicio y avisos importantes.</li>
                    <li>Newsletters y comunicaciones promocionales (pueden desactivarse en cualquier momento).</li>
                </ul>
                <p className="text-muted-foreground">
                    Las comunicaciones se realizarán principalmente por correo electrónico a la dirección proporcionada en el registro. Es
                    responsabilidad del usuario mantener actualizada su información de contacto.
                </p>
            </section>

            {/* 13. Legislación aplicable y jurisdicción */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">13. Legislación Aplicable y Jurisdicción</h2>
                <p className="mb-4">
                    Estos Términos y Condiciones se rigen por la <strong>legislación española</strong>.
                </p>
                <p className="mb-4">
                    Para la resolución de cualquier controversia derivada de estos términos o del uso de la Plataforma, las partes, con
                    renuncia expresa a cualquier otro fuero que pudiera corresponderles, se someten a los{" "}
                    <strong>Juzgados y Tribunales de [CIUDAD - PENDIENTE]</strong>.
                </p>
                <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/20">
                    <p className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100">ℹ️ Resolución alternativa de conflictos</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        En cumplimiento del Reglamento (UE) 524/2013, le informamos de que la Comisión Europea facilita una plataforma de
                        resolución de litigios en línea disponible en:{" "}
                        <a
                            href="https://ec.europa.eu/consumers/odr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-medium hover:underline"
                        >
                            https://ec.europa.eu/consumers/odr
                        </a>
                    </p>
                </div>
            </section>

            {/* 14. Disposiciones generales */}
            <section className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">14. Disposiciones Generales</h2>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">14.1. Integridad del acuerdo</h3>
                <p className="text-muted-foreground mb-6">
                    Estos Términos y Condiciones, junto con la Política de Privacidad y la Política de Cookies, constituyen el acuerdo
                    completo entre el usuario y Solterra Advisory.
                </p>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">14.2. Nulidad parcial</h3>
                <p className="text-muted-foreground mb-6">
                    Si alguna disposición de estos términos se considera inválida o inaplicable, el resto de disposiciones permanecerán en
                    pleno vigor y efecto.
                </p>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">14.3. Renuncia</h3>
                <p className="text-muted-foreground mb-6">
                    La no exigencia por parte de Solterra Advisory de cualquier derecho o disposición de estos términos no constituirá una
                    renuncia a dicho derecho o disposición.
                </p>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">14.4. Cesión</h3>
                <p className="text-muted-foreground">
                    El usuario no podrá ceder o transferir sus derechos u obligaciones bajo estos términos sin el consentimiento previo por
                    escrito de Solterra Advisory. Solterra Advisory podrá ceder libremente estos términos sin restricción.
                </p>
            </section>

            {/* 15. Contacto */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">15. Contacto</h2>
                <p className="mb-4">Para cualquier cuestión relacionada con estos Términos y Condiciones, puede contactarnos en:</p>
                <div className="rounded-lg border bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-900/50 dark:to-gray-800/50">
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="min-w-[120px] font-semibold text-gray-900 dark:text-white">📧 Email:</span>
                            <a href="mailto:legal@solterraadvisory.com" className="text-primary hover:underline">
                                legal@solterraadvisory.com
                            </a>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="min-w-[120px] font-semibold text-gray-900 dark:text-white">📍 Dirección:</span>
                            <span className="text-muted-foreground">[DIRECCIÓN POSTAL - PENDIENTE]</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="min-w-[120px] font-semibold text-gray-900 dark:text-white">🕐 Horario:</span>
                            <span className="text-muted-foreground">Lunes a Viernes, 9:00 - 18:00 (CET)</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Nota final */}
            <div className="border-primary/20 from-primary/5 to-accent/5 mt-8 rounded-lg border-2 bg-gradient-to-br p-6 text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ✅ Al utilizar Solterra Advisory, usted reconoce haber leído, comprendido y aceptado estos Términos y Condiciones en su
                    totalidad.
                </p>
            </div>
        </LegalLayout>
    )
}
