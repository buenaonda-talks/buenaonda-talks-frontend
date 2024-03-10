import { LANDING_HABILITIES } from './constants';

export type LandingHabilityType = {
    icon: React.ReactNode;
    label: string;
    description: React.ReactNode;
};

type HabilityProps = {
    hability: LandingHabilityType;
};

const Hability: React.FC<HabilityProps> = ({ hability }) => (
    <li className="relative z-0 flex h-full w-full flex-col items-center">
        <div className="relative z-20 flex h-32 w-32 flex-none items-center justify-center rounded-full border-[3px] border-[#430AA4] bg-white">
            {hability.icon}
        </div>

        <div className="relative -mt-16 h-full w-full">
            <div className="absolute -inset-0.5 z-0 rounded-2xl bg-gradient-to-b from-[#430AA4] to-[#DB055D]"></div>

            <div className="relative z-10 flex h-full flex-col rounded-2xl bg-white px-4 pb-10 pt-28 text-center">
                <span className="mb-4 block border-b border-gray-200 pb-4 text-xl font-medium">
                    {hability.label}
                </span>

                <span className="block font-light">{hability.description}</span>
            </div>
        </div>
    </li>
);

const LandingHabilities = () => {
    return (
        <section className="py-20">
            <div className="container">
                <h2 className="mb-12 text-center text-5xl font-extrabold text-[#430AA4]">
                    Con las Buena Onda Talks (BOT) podrás adquirir
                </h2>

                <ul className="grid gap-y-8 md:grid-cols-2 md:gap-8 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-0">
                    {LANDING_HABILITIES.map((hability) => (
                        <Hability key={hability.label} hability={hability} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default LandingHabilities;
