import { getYear } from 'date-fns';
import Link from 'next/link';

const Logo = () => (
    <svg
        className="h-auto w-full"
        width="222"
        height="96"
        viewBox="0 0 222 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.377197 47.4053H19.9523C34.2798 47.4053 39.1736 43.1778 39.1736 35.8206V33.1852C39.1736 27.5302 35.8718 23.632 27.0866 22.8634C34.3388 21.93 37.0511 18.6907 37.0511 14.0787V12.5414C37.0511 5.67841 32.6289 2.65869 20.6009 2.65869H0.377197V47.4053ZM18.6552 11.5531C21.6032 11.5531 22.9004 12.3218 22.9004 15.3964V16.5494C22.9004 19.7338 21.6032 20.2829 18.6552 20.2829H14.5279V11.5531H18.6552ZM19.8933 28.1891C23.431 28.1891 25.023 29.0126 25.023 32.9108V33.5698C25.023 37.5227 23.431 38.511 19.8933 38.511H14.5279V28.1891H19.8933Z"
            fill="#F2F2F2"
        />
        <path
            d="M66.1567 2.65869V29.1774C66.1567 34.3384 64.3879 36.0953 60.4373 36.0953C56.487 36.0953 54.7182 34.3384 54.7182 29.1774V2.65869H40.5674V26.1576C40.5674 42.5191 45.4022 47.68 60.4373 47.68C75.4724 47.68 80.3072 42.5191 80.3072 26.1576V2.65869H66.1567Z"
            fill="#F2F2F2"
        />
        <path
            d="M115.488 35.3814H97.2692V30.001H114.073V19.1299H97.2692V14.6827H115.488V2.65869H83.1184V47.4053H115.488V35.3814Z"
            fill="#F2F2F2"
        />
        <path
            d="M144.012 47.4053H157.868V2.65869H144.955V24.4007L132.102 2.65869H118.069V47.4053H130.982V24.4556L144.012 47.4053Z"
            fill="#F2F2F2"
        />
        <path
            d="M176.126 47.4053H187.564L183.319 2.65869H163.862L159.616 47.4053H170.937L171.585 38.6209H175.477L176.126 47.4053ZM172.175 30.7146L173.59 11.7728L174.947 30.7146H172.175Z"
            fill="#F2F2F2"
        />
        <path
            d="M61.3541 74.8972V72.8033C61.3541 59.433 52.128 51.7007 30.7925 51.7007C9.28387 51.7007 0 59.433 0 72.8033V74.8972C0 88.2675 9.28387 95.9998 30.7925 95.9998C52.128 95.9998 61.3541 88.2675 61.3541 74.8972ZM44.2857 73.6622V74.0383C44.2857 80.1595 40.4801 82.4685 30.6771 82.4685C20.8743 82.4685 17.1261 80.1595 17.1261 74.0383V73.6622C17.1261 67.541 20.8743 65.232 30.6771 65.232C40.4801 65.232 44.2857 67.541 44.2857 73.6622Z"
            fill="#F2F2F2"
        />
        <path
            d="M106.079 95.7314H121.302V51.9692H105.502V74.8973L79.5534 51.9692H64.0419V95.7314H79.8993V72.1588L106.079 95.7314Z"
            fill="#F2F2F2"
        />
        <path
            d="M124.402 95.7314H143.546C158.712 95.7314 163.728 90.4156 163.728 75.4881V72.2125C163.728 57.3387 158.712 51.9692 143.546 51.9692H124.402V95.7314ZM143.489 62.9233C147.929 62.9233 149.889 64.6953 149.889 72.3738V75.3271C149.889 82.8981 147.929 84.7773 143.489 84.7773H138.241V62.9233H143.489Z"
            fill="#F2F2F2"
        />
        <path
            d="M181.124 95.7314H192.311L188.159 51.9692H169.131L164.979 95.7314H176.05L176.684 87.1401H180.49L181.124 95.7314ZM177.261 79.4078L178.645 60.8828L179.971 79.4078H177.261Z"
            fill="#F2F2F2"
        />
        <path
            d="M217.916 18.0656H221.477V1.43577e-07L217.916 0V7.39047H197.292V10.6751L217.916 10.6751V18.0656Z"
            fill="#F2F2F2"
        />
        <path
            d="M197.292 32.5485V35.9428L221.477 27.4027V23.7896L197.292 15.2769V18.6436L203.672 20.8334V30.3588L197.292 32.5485ZM207.233 22.0378L217.589 25.5961L207.233 29.1545V22.0378Z"
            fill="#F2F2F2"
        />
        <path
            d="M197.292 39.4683V53.5649H200.853V42.7529H221.477V39.4683H197.292Z"
            fill="#F2F2F2"
        />
        <path
            d="M197.292 57.3716V60.6563H209.429L197.292 71.906V76.2857L209.785 64.8442L221.477 75.9572V71.7692L209.666 60.6563H221.477V57.3716H197.292Z"
            fill="#F2F2F2"
        />
        <path
            d="M206.046 79.4946H206.194V76.21H205.986C199.814 76.21 197.143 79.139 197.143 86.1189C197.143 92.6608 198.983 96.0001 204.028 96.0001H204.236C208.894 96.0001 210.853 93.7283 211.269 86.2832C211.565 80.836 212.485 79.4946 214.74 79.4946H214.859C216.936 79.4946 218.064 81.2466 218.064 86.0368C218.064 90.6351 216.521 92.7155 213.346 92.7155H213.138V96.0001H213.375C218.391 96.0001 221.625 92.8797 221.625 86.1189C221.625 79.4946 218.836 76.21 214.77 76.21H214.384C210.26 76.21 208.064 78.2904 207.707 86.3378C207.47 91.4562 206.52 92.7429 204.087 92.7429H203.909C201.476 92.7429 200.704 90.553 200.704 86.1736C200.704 81.7393 202.158 79.4946 206.046 79.4946Z"
            fill="#F2F2F2"
        />
    </svg>
);

const LandingFooter = () => {
    return (
        <footer className="bg-[#430AA4] text-sm text-white lg:text-base">
            <div className="container">
                <div className="flex flex-col justify-between border-t border-gray-400 py-20 lg:flex-row lg:space-x-4">
                    <div className="order-2 pt-8 lg:order-1 lg:w-4/12 lg:pt-0">
                        <h2 className="mb-2 text-sm font-bold uppercase">
                            ACERCA DE NOSOTROS
                        </h2>
                        <p className="text-sm">
                            Somos un espacio de oportunidades y movilidad social que
                            inspira, articula y conecta a jóvenes con el mundo tech
                            mediante charlas, becas de formación y opciones laborales.
                        </p>
                    </div>

                    <div className="order-1 flex flex-col space-y-5 font-bold lg:order-2 lg:w-[60%] lg:items-end">
                        <div className="w-4/12 md:w-2/12 lg:w-3/12">
                            <Logo />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#2B2B2B] py-6 text-sm">
                <div className="container lg:flex lg:items-center lg:justify-between">
                    <div>
                        <span className="mb-4 block text-xs text-gray-300 lg:mb-0">
                            Av. Los Conquistadores 1700, Piso 16, Providencia
                        </span>

                        <Link
                            href="/terminos-y-condiciones"
                            className="text-xs text-gray-300 underline lg:mb-0"
                        >
                            Términos y Condiciones
                        </Link>
                    </div>

                    <span>
                        Copyright Ⓒ {getYear(new Date())}. Todos los derechos reservados.
                        Buenaondatalks
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
