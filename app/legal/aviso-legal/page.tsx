import { LegalLayout } from "@/components/legal/legal-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Aviso Legal | Solterra Advisory",
    description: "Información legal de Solterra Advisory - Plataforma de conexión para proyectos de energía renovable",
}

export default function AvisoLegalPage() {
    return (
        <LegalLayout title="Aviso Legal" lastUpdated="31 de octubre de 2025" icon="legal">
            {/* Identificación del titular */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">1. Datos identificativos</h2>
                <div className="bg-card rounded-lg border p-6">
                    <dl className="grid gap-3">
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Titular:</dt>
                            <dd className="text-muted-foreground">Solterra Advisory S.L.</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">NIF/CIF:</dt>
                            <dd className="text-muted-foreground">[PENDIENTE - Completar con CIF real]</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Domicilio social:</dt>
                            <dd className="text-muted-foreground">[PENDIENTE - Completar con dirección real]</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Email de contacto:</dt>
                            <dd className="text-muted-foreground">info@solterraadvisory.com</dd>
                        </div>
                        <div>
                            <dt className="font-semibold text-gray-900 dark:text-white">Registro Mercantil:</dt>
                            <dd className="text-muted-foreground">[PENDIENTE - Completar con datos registrales]</dd>
                        </div>
                    </dl>
                </div>
            </section>

            {/* Objeto y finalidad */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">2. Objeto y finalidad del sitio web</h2>
                <p className="mb-4">
                    <strong>Solterra Advisory</strong> es una plataforma digital que facilita la conexión entre:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>
                        <strong>Propietarios de terrenos</strong> con potencial para proyectos de energía renovable
                    </li>
                    <li>
                        <strong>Promotores y desarrolladores</strong> de proyectos solares, eólicos y de otras energías renovables
                    </li>
                </ul>
                <p className="mb-4">
                    La plataforma actúa exclusivamente como <strong>intermediario tecnológico</strong>, proporcionando herramientas de
                    matching, comunicación y gestión de información. Solterra Advisory no participa en las negociaciones ni es parte de los
                    acuerdos que puedan alcanzar los usuarios.
                </p>
            </section>

            {/* Condiciones de uso */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">3. Condiciones generales de uso</h2>
                <h3 className="mb-3 text-xl font-semibold">3.1. Aceptación de las condiciones</h3>
                <p className="mb-4">
                    El acceso y uso de este sitio web implica la aceptación expresa y sin reservas de todas las condiciones establecidas en
                    este Aviso Legal, así como de la Política de Privacidad, Política de Cookies y Términos y Condiciones de Uso.
                </p>

                <h3 className="mb-3 text-xl font-semibold">3.2. Uso del servicio</h3>
                <p className="mb-4">El usuario se compromete a:</p>
                <ul className="mb-4 list-disc space-y-2 pl-6">
                    <li>Utilizar la plataforma de manera lícita y conforme a la legislación vigente</li>
                    <li>Proporcionar información veraz y actualizada</li>
                    <li>No realizar actividades fraudulentas o que puedan dañar la reputación de la plataforma</li>
                    <li>Respetar los derechos de propiedad intelectual e industrial</li>
                    <li>No utilizar la información obtenida para fines distintos a los previstos en la plataforma</li>
                </ul>

                <h3 className="mb-3 text-xl font-semibold">3.3. Responsabilidad del usuario</h3>
                <p className="mb-4">
                    Los usuarios son los únicos responsables de la información que publican en la plataforma, así como de las comunicaciones
                    que mantengan con otros usuarios. Solterra Advisory no verifica la veracidad de la información publicada ni garantiza el
                    éxito de las negociaciones.
                </p>
            </section>

            {/* Propiedad intelectual */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">4. Propiedad intelectual e industrial</h2>
                <p className="mb-4">
                    Todos los contenidos del sitio web (textos, imágenes, diseños, logotipos, software, estructura, bases de datos, etc.)
                    son propiedad de <strong>Solterra Advisory S.L.</strong> o de terceros que han autorizado su uso, y están protegidos por
                    las leyes españolas e internacionales sobre propiedad intelectual e industrial.
                </p>
                <p className="mb-4">
                    Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de
                    explotación de los contenidos sin autorización expresa y por escrito de Solterra Advisory S.L.
                </p>
            </section>

            {/* Exclusión de responsabilidad */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">5. Exclusión de responsabilidad</h2>
                <h3 className="mb-3 text-xl font-semibold">5.1. Disponibilidad del servicio</h3>
                <p className="mb-4">
                    Solterra Advisory no garantiza la disponibilidad y continuidad del funcionamiento del sitio web. Nos reservamos el
                    derecho de suspender temporalmente el servicio por motivos técnicos, de mantenimiento o por causas ajenas a nuestra
                    voluntad.
                </p>

                <h3 className="mb-3 text-xl font-semibold">5.2. Contenidos de terceros</h3>
                <p className="mb-4">
                    La plataforma puede contener enlaces a sitios web de terceros. Solterra Advisory no se hace responsable del contenido,
                    políticas de privacidad o prácticas de dichos sitios externos.
                </p>

                <h3 className="mb-3 text-xl font-semibold">5.3. Información de usuarios</h3>
                <p className="mb-4">
                    Solterra Advisory actúa como mero canal de comunicación entre usuarios. No verificamos la titularidad de terrenos, la
                    viabilidad técnica de proyectos, ni la capacidad financiera o legal de los usuarios. Se recomienda encarecidamente que
                    los usuarios realicen sus propias verificaciones y consulten con asesores profesionales antes de cerrar cualquier
                    acuerdo.
                </p>
            </section>

            {/* Enlaces externos */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">6. Enlaces externos (links)</h2>
                <p className="mb-4">
                    Este sitio web puede contener enlaces a otras páginas web que consideramos de interés para nuestros usuarios. Sin
                    embargo, no podemos hacernos responsables del contenido de dichas páginas ni de cualquier daño que pudiera derivarse de
                    su uso.
                </p>
                <p className="mb-4">
                    Si cualquier usuario, entidad o sitio web desea establecer algún tipo de enlace con destino a este sitio web deberá
                    solicitar autorización previa por escrito a Solterra Advisory S.L.
                </p>
            </section>

            {/* Protección de datos */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">7. Protección de datos personales</h2>
                <p className="mb-4">
                    El tratamiento de los datos personales de los usuarios se realiza conforme a lo establecido en el Reglamento General de
                    Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD).
                </p>
                <p className="mb-4">
                    Para más información sobre cómo tratamos sus datos personales, consulte nuestra{" "}
                    <a href="/legal/privacidad" className="text-primary hover:underline">
                        Política de Privacidad
                    </a>
                    .
                </p>
            </section>

            {/* Legislación aplicable */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">8. Legislación aplicable y jurisdicción</h2>
                <p className="mb-4">
                    Las presentes condiciones se rigen por la legislación española. Para cualquier controversia que pudiera derivarse del
                    acceso o uso de este sitio web, Solterra Advisory S.L. y el usuario acuerdan someterse a los Juzgados y Tribunales del
                    domicilio del usuario si este tiene la condición de consumidor. En caso contrario, las partes se someten a los Juzgados
                    y Tribunales de [CIUDAD - Completar con la ciudad del domicilio social].
                </p>
            </section>

            {/* Modificaciones */}
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">9. Modificaciones del Aviso Legal</h2>
                <p className="mb-4">
                    Solterra Advisory S.L. se reserva el derecho de modificar el presente Aviso Legal en cualquier momento. Los cambios
                    entrarán en vigor desde su publicación en el sitio web. Se recomienda revisar periódicamente este documento para estar
                    informado de posibles actualizaciones.
                </p>
            </section>

            {/* Contacto */}
            <section>
                <h2 className="mb-4 text-2xl font-bold">10. Contacto</h2>
                <p className="mb-4">Para cualquier consulta relacionada con este Aviso Legal, puede contactar con nosotros a través de:</p>
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        Email:{" "}
                        <a href="mailto:info@solterraadvisory.com" className="text-primary hover:underline">
                            info@solterraadvisory.com
                        </a>
                    </li>
                    <li>
                        Formulario de contacto:{" "}
                        <a href="/contacto" className="text-primary hover:underline">
                            www.solterraadvisory.com/contacto
                        </a>
                    </li>
                </ul>
            </section>
        </LegalLayout>
    )
}
