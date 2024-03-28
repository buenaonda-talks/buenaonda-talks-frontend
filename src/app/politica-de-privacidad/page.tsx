import LandingHeader from '@/screens/landing/header';
import LandingFooter from '@/screens/landing/landing-footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad | BuenaOnda Talks',
    description: 'Política de Privacidad de Buena Onda Talks',
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
                <h1 className="text-3xl font-bold">Política de Privacidad</h1>

                <div>
                    <p className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        BuenaOnda Talks toma en serio su privacidad. Para proteger mejor
                        su privacidad, BuenaOnda Talks proporciona este aviso de política
                        de privacidad que explica la forma en que se recopila y utiliza su
                        información personal.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Recopilación de información rutinaria
                    </h2>

                    <p>
                        Esta aplicación rastrea información básica sobre sus usuarios.
                        Esta información incluye, entre otros, direcciones IP, detalles
                        del navegador, marcas de tiempo y páginas de referencia. Ninguna
                        de esta información puede identificar personalmente a usuarios
                        específicos de esta aplicación. La información se rastrea con
                        fines de administración y mantenimiento rutinario.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Cookies
                    </h2>

                    <p>
                        Cuando es necesario, esta aplicación utiliza cookies para
                        almacenar información sobre las preferencias y el historial de un
                        visitante a fin de servir mejor al usuario y/o presentarle
                        contenido personalizado.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Publicidad y &quot;Third Parties&quot;
                    </h2>

                    <p>
                        Los socios publicitarios y otros terceros pueden usar cookies,
                        scripts y/o balizas web para rastrear las actividades de los
                        usuarios en esta aplicación para mostrar anuncios y otra
                        información útil. Dicho rastreo lo realizan directamente los
                        terceros a través de sus propios servidores y está sujeto a sus
                        propias políticas de privacidad. Esta aplicación no tiene acceso
                        ni control sobre estas cookies, scripts y/o web beacons que pueden
                        ser utilizados por terceros.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold ">
                        Enlaces a sitios web de terceros
                    </h2>

                    <p>
                        BuenaOnda Talks ha incluido enlaces en esta aplicación para su uso
                        y referencia. BuenaOnda Talks no es responsable de las políticas
                        de privacidad de estos sitios web. Debe tener en cuenta que las
                        políticas de privacidad de estos sitios web pueden diferir de las
                        nuestras.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Seguridad
                    </h2>

                    <p>
                        La seguridad de su información personal es importante para
                        nosotros, pero recuerde que ningún método de transmisión por
                        Internet o método de almacenamiento electrónico es 100% seguro. Si
                        bien BuenaOnda Talks se esfuerza por utilizar medios
                        comercialmente aceptables para proteger su información personal,
                        BuenaOnda Talks no puede garantizar su seguridad absoluta.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Cambios a esta política de privacidad
                    </h2>

                    <p>
                        Esta Política de privacidad entra en vigencia a partir del 11 de
                        noviembre de 2022 y permanecerá vigente excepto con respecto a
                        cualquier cambio en sus disposiciones en el futuro, que entrará en
                        vigencia inmediatamente después de su publicación en esta página.
                    </p>

                    <p>
                        BuenaOnda Talks se reserva el derecho de actualizar o cambiar
                        nuestra Política de Privacidad en cualquier momento y debes
                        revisar esta Política de Privacidad periódicamente. Si BuenaOnda
                        Talks realiza algún cambio sustancial en esta Política de
                        privacidad, BuenaOnda Talks se lo notificará a través de la
                        dirección de correo electrónico que nos proporcionó o colocando un
                        aviso destacado en nuestra aplicación.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="mb-4 border-b border-gray-300 py-4 text-xl font-bold">
                        Información del contacto
                    </h2>

                    <p>
                        Para cualquier pregunta o inquietud con respecto a la política de
                        privacidad, envíanos un correo electrónico a{' '}
                        <a
                            className="text-blue-600 underline"
                            href="mailto:tools@buenaondatalks.com"
                        >
                            tools@buenaondatalks.com
                        </a>
                        .
                    </p>
                </div>
            </section>

            <LandingFooter />
        </main>
    );
};

export default Page;
