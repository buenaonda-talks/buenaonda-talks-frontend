import { UseCountdownResult } from '@/hooks/useCountdown';
import Link from 'next/link';

type Props = {
    countdownStart: UseCountdownResult;
};

export const TheProcessPageHeroCountdown = ({ countdownStart }: Props) => {
    return (
        <div className="pt-8 xl:pt-0">
            <div className="rounded-2xl border-2 border-[#17CEA9] p-10">
                <h2 className="mb-4 text-center">
                    <span className="mb-4 block font-sans text-2xl">
                        INSCRÍBETE AHORA A LA
                    </span>
                    <span className="font-headings block text-5xl font-bold">
                        PRÓXIMA CHARLA
                    </span>
                </h2>

                <div className="mb-8 flex justify-center space-x-5 md:space-x-10">
                    <div className="flex flex-col items-center space-y-2">
                        <span className="border-2 px-3 text-xl font-semibold md:text-3xl">
                            {countdownStart.days}
                        </span>

                        <span className="text-sm font-light md:text-base">DÍAS</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <span className="border-2 px-3 text-xl font-semibold md:text-3xl">
                            {countdownStart.hours}
                        </span>

                        <span className="text-sm font-light md:text-base">HORAS</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <span className="border-2 px-3 text-xl font-semibold md:text-3xl">
                            {countdownStart.minutes}
                        </span>

                        <span className="text-sm font-light md:text-base">MINUTOS</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <span className="border-2 px-3 text-xl font-semibold md:text-3xl">
                            {countdownStart.seconds}
                        </span>

                        <span className="text-sm font-light md:text-base">SEGUNDOS</span>
                    </div>
                </div>

                <div className="space-y-8 pl-4 md:flex md:justify-center md:space-x-4 md:space-y-0">
                    <div className="md:flex md:justify-end">
                        <div className="flex flex-col items-center space-y-2">
                            <Link
                                className="font-headings rounded-full bg-[#17CEA9] px-4 py-1 font-bold text-white"
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
                            className="font-headings rounded-full bg-[#17CEA9] px-4 py-1 font-bold text-white"
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
