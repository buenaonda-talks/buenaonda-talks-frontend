type StatType = {
    label: string;
    value: string;
    icon: React.ReactNode;
};

const Stat: React.FC<{ type: StatType }> = ({ type: { label, icon, value } }) => (
    <div className="flex items-center space-x-5">
        {icon}

        <div className="flex flex-col items-center">
            <span className="font-light">{value}</span>
            <span className="text-sm font-bold">{label}</span>
        </div>
    </div>
);

const STATS: StatType[] = [
    {
        label: 'Colegios',
        value: '+100',
        icon: (
            <svg
                className="w-10"
                width="36"
                height="35"
                viewBox="0 0 36 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M35.048 5.72361L18.5 0.207617C18.217 0.113249 17.9109 0.113249 17.6278 0.207617L1.07985 5.72361C0.805268 5.81514 0.566447 5.99075 0.39722 6.22557C0.227993 6.46038 0.136941 6.74249 0.136963 7.03193V20.8219C0.136963 21.1876 0.28225 21.5384 0.540862 21.797C0.799474 22.0556 1.15023 22.2009 1.51596 22.2009C1.88169 22.2009 2.23245 22.0556 2.49106 21.797C2.74967 21.5384 2.89496 21.1876 2.89496 20.8219V8.94529L8.68502 10.8742C7.14668 13.3595 6.65749 16.3537 7.32487 19.1993C7.99226 22.045 9.76165 24.5095 12.2446 26.0517C9.14181 27.2687 6.45966 29.4699 4.49804 32.4796C4.39602 32.6312 4.32516 32.8016 4.28957 32.9809C4.25399 33.1601 4.25438 33.3447 4.29075 33.5238C4.32711 33.7029 4.3987 33.873 4.50138 34.0241C4.60405 34.1753 4.73575 34.3046 4.88882 34.4044C5.04189 34.5043 5.21328 34.5727 5.39302 34.6057C5.57277 34.6387 5.75729 34.6357 5.93585 34.5968C6.11441 34.5578 6.28345 34.4838 6.43315 34.379C6.58285 34.2742 6.71022 34.1406 6.80786 33.9862C9.40555 30.0009 13.5081 27.7169 18.0639 27.7169C22.6198 27.7169 26.7223 30.0009 29.32 33.9862C29.5222 34.2868 29.8347 34.4957 30.1898 34.5678C30.5448 34.6399 30.914 34.5693 31.2175 34.3714C31.5209 34.1734 31.7343 33.864 31.8115 33.51C31.8886 33.156 31.8234 32.7859 31.6298 32.4796C29.6682 29.4699 26.9757 27.2687 23.8833 26.0517C26.3638 24.5096 28.1315 22.0467 28.7988 19.2031C29.4661 16.3595 28.9784 13.3674 27.4428 10.8828L35.048 8.34887C35.3226 8.25739 35.5615 8.0818 35.7308 7.84698C35.9001 7.61216 35.9912 7.33003 35.9912 7.04055C35.9912 6.75107 35.9001 6.46893 35.7308 6.23412C35.5615 5.9993 35.3226 5.82371 35.048 5.73222V5.72361ZM26.3379 16.6849C26.3383 17.993 26.0285 19.2825 25.434 20.4477C24.8395 21.6129 23.9772 22.6205 22.9179 23.3879C21.8585 24.1552 20.6324 24.6605 19.3399 24.8623C18.0475 25.064 16.7257 24.9564 15.4829 24.5484C14.2401 24.1403 13.1117 23.4434 12.1904 22.5148C11.2691 21.5863 10.5811 20.4525 10.1828 19.2065C9.78452 17.9605 9.68733 16.6379 9.8992 15.3471C10.1111 14.0563 10.626 12.8341 11.4016 11.7809L17.6278 13.8493C17.9109 13.9437 18.217 13.9437 18.5 13.8493L24.7262 11.7809C25.7739 13.2012 26.3387 14.92 26.3379 16.6849Z"
                    fill="#F2F2F2"
                />
            </svg>
        ),
    },

    {
        label: 'Asistentes',
        value: '+1500',
        icon: (
            <svg
                className="w-10"
                width="39"
                height="29"
                viewBox="0 0 39 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M24.625 14.5C28.4004 14.5 31.4583 11.4421 31.4583 7.66671C31.4583 3.89129 28.4004 0.833374 24.625 0.833374C20.8496 0.833374 17.7916 3.89129 17.7916 7.66671C17.7916 11.4421 20.8496 14.5 24.625 14.5ZM9.24998 11.0834V5.95837H5.83331V11.0834H0.708313V14.5H5.83331V19.625H9.24998V14.5H14.375V11.0834H9.24998ZM24.625 17.9167C20.0637 17.9167 10.9583 20.2059 10.9583 24.75V28.1667H38.2916V24.75C38.2916 20.2059 29.1862 17.9167 24.625 17.9167Z"
                    fill="#F2F2F2"
                />
            </svg>
        ),
    },
    {
        label: 'Becas',
        value: '+300',
        icon: (
            <svg
                className="w-10"
                width="53"
                height="31"
                viewBox="0 0 53 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M26.4026 0.838257L25.8861 0.995022L5.2591 7.9059L0.569336 9.4521L3.30035 10.3267V24.7656C2.31521 25.3382 1.65019 26.3828 1.65019 27.6039C1.65019 28.4792 1.9979 29.3186 2.61683 29.9376C3.23577 30.5565 4.07522 30.9042 4.95052 30.9042C5.82582 30.9042 6.66527 30.5565 7.2842 29.9376C7.90313 29.3186 8.25084 28.4792 8.25084 27.6039C8.25084 26.3828 7.58583 25.3382 6.60068 24.7656V11.4653L9.901 12.5462V21.0032C9.901 22.3564 10.7261 23.4785 11.7063 24.2541C12.6865 25.0247 13.9043 25.5692 15.3663 26.0577C18.2937 27.0313 22.1518 27.6039 26.4026 27.6039C30.6534 27.6039 34.5115 27.0329 37.4389 26.056C38.901 25.5692 40.1188 25.0247 41.099 24.2524C42.0792 23.4785 42.9043 22.3564 42.9043 21.0032V12.5462L47.5462 10.9983L52.2359 9.4521L47.5445 7.90425L26.9175 0.995022L26.4026 0.838257ZM26.4026 4.29535L41.8729 9.4521L26.4026 14.6089L10.9324 9.4521L26.4026 4.29535ZM13.2013 13.6815L25.8878 17.9092L26.4026 18.0643L26.9191 17.9075L39.6039 13.6798V21.0032C39.6039 21.0197 39.6105 21.2112 39.0874 21.6221C38.566 22.0346 37.6303 22.5544 36.4059 22.9636C33.9604 23.7772 30.3548 24.3036 26.4026 24.3036C22.4505 24.3036 18.8449 23.7788 16.3977 22.962C15.1766 22.5544 14.2393 22.0329 13.7178 21.6221C13.1931 21.2095 13.2013 21.0197 13.2013 21.0032V13.6815Z"
                    fill="#F2F2F2"
                />
            </svg>
        ),
    },
];

const LandingStats = () => (
    <section className="bg-[#6614EE] py-8 text-white sm:py-4">
        <div className="container flex flex-col items-center space-y-8 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center sm:space-x-[20%] sm:space-y-0">
            {STATS.map((stat) => (
                <Stat key={stat.label} type={stat} />
            ))}
        </div>
    </section>
);

export default LandingStats;
