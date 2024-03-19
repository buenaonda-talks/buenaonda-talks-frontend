import { LandingButtonCTA } from './landing-button-cta';

const Arrow = () => {
    return (
        <svg
            width="65"
            height="15"
            viewBox="0 0 65 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M63.988 10.2692C64.47 9.99969 64.6424 9.39042 64.3729 8.90835L59.9812 1.05258C59.7117 0.570515 59.1024 0.39819 58.6203 0.667685C58.1383 0.937181 57.966 1.54644 58.2355 2.02851L62.1392 9.01142L55.1563 12.9151C54.6742 13.1846 54.5019 13.7939 54.7714 14.276C55.0409 14.758 55.6501 14.9304 56.1322 14.6609L63.988 10.2692ZM0.704554 10.3398C11.7116 6.47339 20.6004 4.58973 30.0767 4.60375C39.5671 4.61779 49.7093 6.53496 63.2278 10.3586L63.7722 8.43407C50.1855 4.59121 39.839 2.61819 30.0796 2.60375C20.3061 2.58929 11.1841 4.53887 0.0417226 8.45283L0.704554 10.3398Z"
                fill="#212121"
            />
        </svg>
    );
};

export const LandingSteps = () => {
    return (
        <section className="container space-y-6">
            <div className="space-y-2">
                <div className="space-y-1 text-center">
                    <h3 className="text-[#5522AB]">¿Cómo funciona?</h3>
                    <h2 className="text-3xl font-semibold">
                        3 pasos para obtener tu beca
                    </h2>
                </div>

                <div className="flex flex-col xl:flex-row xl:items-stretch">
                    <div className="flex-1 text-center">
                        <span className="text-[9rem] font-bold text-dark/10">1</span>

                        <div className="-mt-20">
                            <h4 className="text-xl font-bold">Escríbenos por Whatsapp</h4>

                            <p className="text-muted-foreground">
                                Envíanos un mensaje
                                <br /> pidiendo más información
                            </p>
                        </div>
                    </div>

                    <div className="hidden xl:flex xl:items-center">
                        <Arrow />
                    </div>

                    <div className="flex-1 text-center">
                        <span className="text-[9rem] font-bold text-dark/10">2</span>

                        <div className="-mt-20">
                            <h4 className="text-xl font-bold">Charla Informativa</h4>

                            <p className="text-muted-foreground">
                                Asiste a una charla informativa por Zoom donde
                                explicaremos más a fondo los detalles de la beca y
                                pasaremos un enlace para que puedas postular
                            </p>
                        </div>
                    </div>

                    <div className="hidden xl:flex xl:items-center">
                        <Arrow />
                    </div>

                    <div className="flex-1 text-center">
                        <span className="text-[9rem] font-bold text-dark/10">3</span>

                        <div className="-mt-20">
                            <h4 className="text-xl font-bold">Postulación</h4>

                            <p className="text-muted-foreground">
                                Completa un formulario de 20 preguntas para conocerte
                                mejor y obtén tu beca en un período de 1 semana
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <LandingButtonCTA />
            </div>
        </section>
    );
};
