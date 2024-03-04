import LandingHeader from '@/screens/landing/header';
import LandingFooter from '@/screens/landing/landing-footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Términos y Condiciones | BuenaOnda Talks',
    description: 'Términos y Condiciones de Uso de Buena Onda Talks',
    openGraph: {
        type: 'website',
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_HOST || 'http://localhost:3000'),
    robots: {
        index: process.env.NEXT_PUBLIC_APP_ENV === 'production',
        follow: process.env.NEXT_PUBLIC_APP_ENV === 'production',
    },
};

const Page: React.FC = () => {
    return (
        <main>
            <LandingHeader />

            <section className="container space-y-6 pb-20 pt-36">
                <h1 className="text-3xl font-bold">Términos y Condiciones de Uso</h1>

                <div>
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Bienvenida a Buena Onda Talks
                    </h2>

                    <p>
                        Gracias por utilizar buenaondatalks.com (&quot;Buena Onda
                        Talks&quot;, &quot;nosotros&quot;, &quot;nuestro&quot;). Al
                        acceder a nuestro sitio web y utilizar nuestros servicios, usted
                        (&quot;Usuario&quot;, &quot;usted&quot;) acepta los siguientes
                        términos y condiciones, así como nuestra Política de Privacidad.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Uso de Servicios de Terceros
                    </h2>

                    <div>
                        <h3 className="mb-1 font-bold">Google OAuth</h3>

                        <p>
                            Buena Onda Talks ofrece a los usuarios la opción de
                            registrarse y conectarse a través de OAuth de Google como un
                            método de autenticación. Al utilizar este servicio, usted
                            autoriza a Buena Onda Talks a acceder a cierta información de
                            su cuenta de Google, como su nombre y dirección de correo
                            electrónico, para simplificar el proceso de registro e inicio
                            de sesión.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-1 font-bold">Clerk</h3>

                        <p>
                            Utilizamos Clerk como nuestro Sistema de Gestión de
                            Identidades y Accesos (CIMS) para proporcionar una experiencia
                            de usuario segura y eficiente. Esto incluye la gestión de
                            registros, inicios de sesión y la seguridad de la cuenta de
                            usuario. La información recopilada a través de Clerk se
                            utiliza exclusivamente para estos fines.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-1 font-bold">Google Analytics</h3>

                        <p>
                            Buena Onda Talks utiliza Google Analytics para recopilar y
                            analizar datos sobre cómo los usuarios interactúan con nuestro
                            sitio web. Esto nos ayuda a mejorar nuestros servicios y la
                            experiencia del usuario. Google Analytics recopila información
                            como la frecuencia de visitas al sitio, páginas vistas, y la
                            ruta de navegación de los usuarios, entre otros. Esta
                            información se utiliza de forma agregada y no identifica
                            individualmente a los usuarios.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-1 font-bold">Sentry</h3>

                        <p>
                            Implementamos Sentry para monitorear y corregir en tiempo real
                            los errores y problemas de rendimiento en nuestro sitio web.
                            Sentry nos ayuda a mejorar la estabilidad de la plataforma al
                            proporcionarnos información detallada sobre las incidencias
                            que los usuarios puedan experimentar. La información
                            recopilada por Sentry se utiliza con el único propósito de
                            resolver errores y mejorar la experiencia del usuario en
                            nuestro sitio.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Consentimiento y Uso de la Información
                    </h2>

                    <p>
                        Al utilizar Buena Onda Talks y aceptar estos términos y
                        condiciones, usted da su consentimiento para que recopilemos,
                        almacenemos y usemos su información personal, según lo descrito
                        anteriormente y en nuestra Política de Privacidad. Nos
                        comprometemos a proteger su privacidad y a utilizar su información
                        solo para los fines especificados.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Cambios a los Términos y Condiciones
                    </h2>

                    <p>
                        Nos reservamos el derecho de modificar estos términos y
                        condiciones en cualquier momento. Los cambios entrarán en vigor
                        inmediatamente después de su publicación en nuestro sitio web. Le
                        recomendamos revisar periódicamente esta página para estar al
                        tanto de cualquier actualización.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Contacto
                    </h2>

                    <p>
                        Si tiene preguntas o preocupaciones sobre estos términos y
                        condiciones, o sobre el uso de Google OAuth, Clerk, Google
                        Analytics, o Sentry en Buena Onda Talks, no dude en contactarnos a
                        través de nuestro sitio web.
                    </p>
                </div>
            </section>

            <LandingFooter />
        </main>
    );
};

export default Page;
