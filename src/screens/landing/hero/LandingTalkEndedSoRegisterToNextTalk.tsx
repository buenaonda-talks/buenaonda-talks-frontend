import Link from 'next/link';

export const LandingTalkEndedSoRegisterToNextTalk = () => {
    return (
        <div className="pt-8 xl:w-1/2 xl:pt-0">
            <div className="rounded-2xl border-2 border-[#17CEA9] p-10">
                <h2 className="mb-4 text-center">
                    <span className="mb-4 block font-sans text-2xl">
                        LA CHARLA YA TERMINÓ
                    </span>
                    <span className="font-headings block text-5xl font-bold">
                        REGISTRATE PARA LA PRÓXIMA
                    </span>
                </h2>

                <div className="space-y-8 pl-4 md:flex md:justify-center md:space-x-4 md:space-y-0">
                    <div className="md:flex md:justify-end">
                        <div className="flex flex-col items-center space-y-2">
                            <Link
                                className="font-headings rounded-full bg-[#17CEA9] px-4 py-1 font-bold"
                                href="/signup?type=estudiante"
                                style={{
                                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                Quiero una beca
                            </Link>
                            <span className="text-xs font-medium">Soy estudiante</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <Link
                            className="font-headings rounded-full bg-[#17CEA9] px-4 py-1 font-bold"
                            href="/signup"
                            style={{
                                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                            }}
                        >
                            Inscribir a mi colegio
                        </Link>
                        <span className="text-xs font-medium">
                            Represento a un colegio
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
