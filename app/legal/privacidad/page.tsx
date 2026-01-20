import { LegalLayout } from "@/components/legal/legal-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Política de Privacidad | Solterra Advisory",
    description: "Política de protección de datos personales de Solterra Advisory conforme al RGPD y LOPDGDD",
}

export default function PrivacidadPage() {
    return (
        <LegalLayout title="Política de Privacidad" lastUpdated="31 de octubre de 2025" icon="privacy">
            {/* Introducción */}
            <section className="mb-8">
                <p className="mb-4">
                    En <strong>Solterra Advisory S.L.</strong> nos tomamos muy en serio la protección de sus datos personales. Esta Política
                    de Privacidad explica cómo recopilamos, utilizamos, almacenamos y protegemos su información personal de acuerdo con el
                    Reglamento General de Protección de Datos (RGPD UE 2016/679) y la Ley Orgánica 3/2018 de Protección de Datos Personales
                    y garantía de los derechos digitales (LOPDGDD).
                </p>
            </section>

            {/* Responsable del tratamiento */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">1. Responsable del tratamiento</h2>
                <div className="bg-card rounded-lg border p-6">
                    <dl className="grid gap-3">
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Identidad:</dt>
                            <dd className="text-muted-foreground">Solterra Advisory S.L.</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">NIF/CIF:</dt>
                            <dd className="text-muted-foreground">[PENDIENTE - Completar con CIF real]</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Dirección:</dt>
                            <dd className="text-muted-foreground">[PENDIENTE - Completar con dirección real]</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Email:</dt>
                            <dd className="text-muted-foreground">info@solterradvisory.com</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Email del Delegado de Protección de Datos:</dt>
                            <dd className="text-muted-foreground">dpo@solterradvisory.com</dd>
                        </div>
                    </dl>
                </div>
            </section>

            {/* Qué datos recopilamos */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">2. Datos personales que recopilamos</h2>
                <p className="mb-4">Dependiendo de su rol en la plataforma, podemos recopilar los siguientes datos:</p>

                <h3 className="mb-3 text-xl font-semibold">2.1. Datos de registro y perfil</h3>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>Nombre y apellidos</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Contraseña encriptada</li>
                    <li>Tipo de usuario (Propietario / Promotor)</li>
                </ul>

                <h3 className="mb-3 text-xl font-semibold">2.2. Datos específicos de propietarios de terrenos</h3>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>Datos catastrales de terrenos</li>
                    <li>Ubicación geográfica (provincia, municipio, coordenadas)</li>
                    <li>Superficie del terreno</li>
                    <li>Características del suelo y topografía</li>
                    <li>Disponibilidad de accesos y servicios</li>
                    <li>Documentación de titularidad (si se proporciona voluntariamente)</li>
                    <li>Fotografías de los terrenos</li>
                </ul>

                <h3 className="mb-3 text-xl font-semibold">2.3. Datos específicos de promotores</h3>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>Nombre de la empresa o razón social</li>
                    <li>CIF/NIF de la empresa</li>
                    <li>Información de proyectos (tipo, potencia, ubicación)</li>
                    <li>Documentación empresarial (si se proporciona voluntariamente)</li>
                    <li>Historial de proyectos y experiencia</li>
                </ul>

                <h3 className="mb-3 text-xl font-semibold">2.4. Datos de navegación y uso</h3>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>Dirección IP</li>
                    <li>Tipo de navegador y dispositivo</li>
                    <li>Páginas visitadas y tiempo de navegación</li>
                    <li>Interacciones con la plataforma (matches, mensajes, búsquedas)</li>
                    <li>Cookies y tecnologías similares (ver Política de Cookies)</li>
                </ul>

                <h3 className="mb-3 text-xl font-semibold">2.5. Datos de verificación KYC (Know Your Customer)</h3>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>Documento de identidad (DNI/NIE/Pasaporte)</li>
                    <li>Verificación facial (opcional)</li>
                    <li>Documentación complementaria para verificación de identidad</li>
                </ul>
            </section>

            {/* Finalidad y base legal */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">3. Finalidad del tratamiento y base legal</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-muted border-b">
                                <th className="p-3 text-left font-semibold">Finalidad</th>
                                <th className="p-3 text-left font-semibold">Base Legal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="p-3">Gestión de registro y creación de cuenta</td>
                                <td className="p-3">Ejecución de contrato / Consentimiento</td>
                            </tr>
                            <tr>
                                <td className="p-3">Prestación del servicio de matching entre usuarios</td>
                                <td className="p-3">Ejecución de contrato</td>
                            </tr>
                            <tr>
                                <td className="p-3">Comunicación entre propietarios y promotores</td>
                                <td className="p-3">Ejecución de contrato</td>
                            </tr>
                            <tr>
                                <td className="p-3">Verificación de identidad (KYC)</td>
                                <td className="p-3">Obligación legal / Interés legítimo</td>
                            </tr>
                            <tr>
                                <td className="p-3">Envío de comunicaciones comerciales y newsletters</td>
                                <td className="p-3">Consentimiento (opt-in)</td>
                            </tr>
                            <tr>
                                <td className="p-3">Mejora de la plataforma y análisis de uso</td>
                                <td className="p-3">Interés legítimo</td>
                            </tr>
                            <tr>
                                <td className="p-3">Cumplimiento de obligaciones legales</td>
                                <td className="p-3">Obligación legal</td>
                            </tr>
                            <tr>
                                <td className="p-3">Prevención de fraude y seguridad</td>
                                <td className="p-3">Interés legítimo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Conservación de datos */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">4. Plazo de conservación de datos</h2>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>
                        <strong>Datos de cuenta activa:</strong> Se conservarán mientras la cuenta permanezca activa
                    </li>
                    <li>
                        <strong>Tras cierre de cuenta:</strong> Los datos se conservarán durante 5 años por obligaciones legales (fiscales,
                        mercantiles)
                    </li>
                    <li>
                        <strong>Datos de comunicaciones comerciales:</strong> Hasta que retire el consentimiento
                    </li>
                    <li>
                        <strong>Datos de verificación KYC:</strong> 10 años desde la última transacción (prevención de blanqueo de
                        capitales)
                    </li>
                    <li>
                        <strong>Cookies:</strong> Según lo especificado en nuestra Política de Cookies (máximo 2 años)
                    </li>
                </ul>
            </section>

            {/* Destinatarios */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">5. Destinatarios de los datos</h2>
                <p className="mb-4">Sus datos personales podrán ser comunicados a:</p>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>
                        <strong>Otros usuarios de la plataforma:</strong> Su información de perfil y terrenos/proyectos será visible para
                        usuarios con los que haga match
                    </li>
                    <li>
                        <strong>Proveedores de servicios tecnológicos:</strong> Hosting, servicios en la nube, análisis de datos (encargados
                        del tratamiento con contratos suscritos)
                    </li>
                    <li>
                        <strong>Servicios de verificación de identidad:</strong> Proveedores externos de KYC certificados
                    </li>
                    <li>
                        <strong>Administraciones públicas:</strong> Cuando exista obligación legal (Agencia Tributaria, autoridades
                        competentes)
                    </li>
                    <li>
                        <strong>Entidades financieras:</strong> Para procesamiento de pagos (si aplicable)
                    </li>
                </ul>
                <p className="mb-4">
                    <strong>Importante:</strong> No vendemos ni cedemos sus datos a terceros con fines comerciales.
                </p>
            </section>

            {/* Transferencias internacionales */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">6. Transferencias internacionales de datos</h2>
                <p className="mb-4">
                    Algunos de nuestros proveedores de servicios pueden estar ubicados fuera del Espacio Económico Europeo (EEE). En estos
                    casos, nos aseguramos de que existan garantías adecuadas mediante:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>Cláusulas Contractuales Tipo aprobadas por la Comisión Europea</li>
                    <li>Decisiones de adecuación de la Comisión Europea</li>
                    <li>Certificaciones Privacy Shield (cuando aplique)</li>
                </ul>
                <p className="mb-4">
                    Puede solicitar información específica sobre las transferencias internacionales contactando con nuestro DPO.
                </p>
            </section>

            {/* Derechos del usuario */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">7. Derechos del usuario</h2>
                <p className="mb-4">Usted tiene derecho a:</p>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-card rounded-lg border p-4">
                        <h3 className="text-primary mb-2 font-semibold">Derecho de Acceso</h3>
                        <p className="text-muted-foreground text-sm">
                            Conocer qué datos personales tratamos sobre usted y obtener una copia
                        </p>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <h3 className="text-primary mb-2 font-semibold">Derecho de Rectificación</h3>
                        <p className="text-muted-foreground text-sm">Corregir datos inexactos o incompletos</p>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <h3 className="text-primary mb-2 font-semibold">Derecho de Supresión</h3>
                        <p className="text-muted-foreground text-sm">Solicitar la eliminación de sus datos cuando ya no sean necesarios</p>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <h3 className="text-primary mb-2 font-semibold">Derecho de Oposición</h3>
                        <p className="text-muted-foreground text-sm">Oponerse al tratamiento de sus datos en determinadas situaciones</p>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <h3 className="text-primary mb-2 font-semibold">Derecho de Limitación</h3>
                        <p className="text-muted-foreground text-sm">Solicitar que limitemos el tratamiento de sus datos</p>
                    </div>
                    <div className="bg-card rounded-lg border p-4">
                        <h3 className="text-primary mb-2 font-semibold">Derecho de Portabilidad</h3>
                        <p className="text-muted-foreground text-sm">
                            Recibir sus datos en formato estructurado y transmitirlos a otro responsable
                        </p>
                    </div>
                </div>

                <div className="border-primary bg-primary/5 mt-6 rounded-lg border-l-4 p-4">
                    <h4 className="mb-2 font-semibold">¿Cómo ejercer sus derechos?</h4>
                    <p className="mb-2 text-sm">Puede ejercer sus derechos en cualquier momento enviando un correo electrónico a:</p>
                    <ul className="list-disc space-y-1 pl-6 text-sm">
                        <li>
                            <strong>Email:</strong> dpo@solterradvisory.com
                        </li>
                        <li>
                            <strong>Formulario:</strong> Disponible en su panel de usuario (Configuración → Privacidad)
                        </li>
                    </ul>
                    <p className="mt-3 text-sm">
                        Deberá acreditar su identidad adjuntando copia de su DNI/NIE. Responderemos en un plazo máximo de 1 mes.
                    </p>
                </div>

                <p className="mt-4">
                    <strong>Derecho a reclamar ante la autoridad de control:</strong> Si considera que sus derechos no han sido debidamente
                    atendidos, puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en{" "}
                    <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        www.aepd.es
                    </a>
                    .
                </p>
            </section>

            {/* Medidas de seguridad */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">8. Medidas de seguridad</h2>
                <p className="mb-4">
                    Hemos implementado medidas técnicas y organizativas apropiadas para proteger sus datos personales contra acceso no
                    autorizado, pérdida, destrucción o alteración:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>
                        <strong>Cifrado SSL/TLS:</strong> Todas las comunicaciones están encriptadas
                    </li>
                    <li>
                        <strong>Contraseñas hasheadas:</strong> Utilizamos algoritmos seguros (bcrypt) para almacenar contraseñas
                    </li>
                    <li>
                        <strong>Acceso restringido:</strong> Solo personal autorizado tiene acceso a datos personales
                    </li>
                    <li>
                        <strong>Auditorías regulares:</strong> Revisiones periódicas de seguridad y privacidad
                    </li>
                    <li>
                        <strong>Backups encriptados:</strong> Copias de seguridad cifradas y almacenadas de forma segura
                    </li>
                    <li>
                        <strong>Formación del personal:</strong> Todo el equipo recibe formación en protección de datos
                    </li>
                </ul>
            </section>

            {/* Menores */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">9. Menores de edad</h2>
                <p className="mb-4">
                    Nuestros servicios están dirigidos a <strong>mayores de 18 años</strong>. No recopilamos intencionadamente datos de
                    menores de edad. Si detectamos que hemos recibido datos de un menor sin consentimiento parental, los eliminaremos de
                    inmediato.
                </p>
                <p className="mb-4">
                    Si es usted padre/madre o tutor legal y cree que su hijo/a menor de edad nos ha proporcionado datos personales, por
                    favor contacte con nosotros inmediatamente.
                </p>
            </section>

            {/* Actualizaciones */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">10. Actualizaciones de la Política de Privacidad</h2>
                <p className="mb-4">
                    Nos reservamos el derecho de actualizar esta Política de Privacidad para reflejar cambios en nuestras prácticas de
                    tratamiento de datos o por motivos legales. Le notificaremos de cualquier cambio significativo mediante:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>Notificación por email a la dirección registrada</li>
                    <li>Aviso destacado en la plataforma durante 30 días</li>
                </ul>
                <p className="mb-4">
                    Le recomendamos revisar periódicamente esta política. La versión actualizada siempre estará disponible en esta página
                    con la fecha de última modificación.
                </p>
            </section>

            {/* Contacto */}
            <section>
                <h2 className="mb-4 text-2xl font-bold">11. Contacto y consultas</h2>
                <p className="mb-4">Para cualquier consulta sobre esta Política de Privacidad o sobre el tratamiento de sus datos:</p>
                <div className="bg-card rounded-lg border p-6">
                    <dl className="grid gap-3">
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Responsable de Protección de Datos:</dt>
                            <dd className="text-muted-foreground">dpo@solterradvisory.com</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Atención al cliente:</dt>
                            <dd className="text-muted-foreground">info@solterradvisory.com</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Formulario de contacto:</dt>
                            <dd>
                                <a href="/contacto" className="text-primary hover:underline">
                                    www.solterradvisory.com/contacto
                                </a>
                            </dd>
                        </div>
                    </dl>
                </div>
            </section>
        </LegalLayout>
    )
}
