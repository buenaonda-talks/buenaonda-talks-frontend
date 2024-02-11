import Image from 'next/image';

import reportero from './el-reportero.png';
import MercurioLink from './MercurioLink';

const LandingTheyTalkAboutUs = () => {
    return (
        <section className="bg-[#6614EE] py-12 text-white">
            <div className="container">
                <h2 className="mb-6 text-center text-3xl font-semibold">
                    ELLOS HABLAN DE BUENA ONDA TALKS
                </h2>

                <div className="flex flex-col items-center justify-center space-y-16 rounded-2xl bg-white px-28 py-16 md:flex-row md:space-x-16 md:space-y-0">
                    <a
                        href="https://elreporterodeiquique.com/emprendedores-exitosos-compartieron-experiencia-con-estudiantes-de-alto-hospicio/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src={reportero}
                            width={500}
                            height={85}
                            alt="El reportero"
                            placeholder="blur"
                            className="h-8 w-auto"
                        />
                    </a>

                    <MercurioLink />
                </div>
            </div>
        </section>
    );
};

export default LandingTheyTalkAboutUs;
