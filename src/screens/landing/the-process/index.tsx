import Image from 'next/image';

import image from './buena-onda-talks-proceso.jpg';
import Link from 'next/link';

const LandingProcess = () => (
    <section className="py-20">
        <div className="container mb-32 font-light">
            <h2 className="mb-4 text-5xl font-bold text-[#430AA4]">PROCESO</h2>
            <ol className="mb-4 list-decimal pl-4">
                <li>
                    <span className="font-medium">Inscripción:</span>{' '}
                    <ul className="list-disc">
                        <li>
                            Si eres <span className="font-medium">Director</span> o{' '}
                            <span className="font-medium">Profesor</span>, registra a tu
                            colegio y recibirás asistencia de inmediato.
                        </li>
                        <li>
                            Si eres <span className="font-medium">estudiante</span>, crea
                            tu cuenta y recibirás la invitación a la próxima charla
                            informativa.
                        </li>
                    </ul>
                </li>
                <li>
                    <span className="font-medium">Charla:</span> Asiste a la charla
                    informativa por zoom y aprende postular a tus becas
                </li>
                <li>
                    <span className="font-medium">Platzi:</span> Obtén tu primera beca y
                    realiza tu curso introductorio en platzi.
                </li>
                <li>
                    <span className="font-medium">Dev.F:</span> Postula, obtén tu segunda
                    beca y participa de un programa educativo de 6 meses online
                    completamente gratis
                </li>
                <li>
                    <span className="font-medium">Empleabilidad:</span> Prepárate para el
                    mundo laboral, al terminar tu camino contarás con un perfil junior que
                    te permitirá aplicar a multiples puestos laborales.
                </li>
            </ol>

            <Link
                className="font-headings mb-4 rounded-full bg-[#430AA4] px-4 py-1 font-bold text-white"
                href="/becas-y-progresos"
            >
                Saber más sobre el proceso
            </Link>

            <div className="hidden justify-center pt-16 md:flex">
                <div className="md:w-10/12 lg:w-8/12">
                    <Image
                        alt="Proceso de postulación"
                        src={image}
                        width={1660}
                        height={682}
                    />
                </div>
            </div>
        </div>
    </section>
);

export default LandingProcess;
