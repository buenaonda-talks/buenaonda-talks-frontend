import Link from 'next/link';
import routesBuilder from '@/lib/routes';
import Image from 'next/image';

import photoBenja from '../resources/estudiante-benja.png';
import photoDreyco from '../resources/estudiante-dreyco.jpg';
import photoMary from '../resources/estudiante-mary-avril.png';
import background from './hero-background.jpg';
import { LandingButtonCTA } from '../landing-button-cta';

const Header = () => {
    return (
        <header className="container absolute inset-x-0 top-0 flex items-center justify-between py-8">
            <Link href={routesBuilder.home}>
                <svg
                    width="85"
                    height="41"
                    viewBox="0 0 85 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.144043 20.2521H7.62316C13.0973 20.2521 14.9671 18.4906 14.9671 15.4251V14.327C14.9671 11.9708 13.7055 10.3465 10.349 10.0263C13.1198 9.63737 14.1561 8.28764 14.1561 6.36601V5.72546C14.1561 2.86588 12.4665 1.60767 7.87095 1.60767H0.144043V20.2521ZM7.12755 5.31368C8.25391 5.31368 8.74952 5.63395 8.74952 6.91504V7.39546C8.74952 8.7223 8.25391 8.95107 7.12755 8.95107H5.55063V5.31368H7.12755ZM7.60062 12.2453C8.95228 12.2453 9.56051 12.5885 9.56051 14.2127V14.4873C9.56051 16.1343 8.95228 16.5461 7.60062 16.5461H5.55063V12.2453H7.60062Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M25.2767 1.60767V12.6571C25.2767 14.8075 24.6009 15.5396 23.0914 15.5396C21.5821 15.5396 20.9063 14.8075 20.9063 12.6571V1.60767H15.4997V11.3989C15.4997 18.2161 17.347 20.3665 23.0914 20.3665C28.8359 20.3665 30.6832 18.2161 30.6832 11.3989V1.60767H25.2767Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M44.1248 15.2421H37.1638V13.0003H43.5841V8.47066H37.1638V6.61765H44.1248V1.60767H31.7571V20.2521H44.1248V15.2421Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M55.0231 20.2521H60.317V1.60767H55.3835V10.6668L50.4726 1.60767H45.111V20.2521H50.0446V10.6897L55.0231 20.2521Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M67.2927 20.2521H71.6631L70.0412 1.60767H62.6071L60.985 20.2521H65.3103L65.5581 16.5919H67.045L67.2927 20.2521ZM65.7834 13.2976L66.3241 5.40519L66.8423 13.2976H65.7834Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M23.4417 31.7072V30.8347C23.4417 25.2638 19.9167 22.042 11.7649 22.042C3.54711 22.042 0 25.2638 0 30.8347V31.7072C0 37.2782 3.54711 40.4999 11.7649 40.4999C19.9167 40.4999 23.4417 37.2782 23.4417 31.7072ZM16.9203 31.1926V31.3493C16.9203 33.8998 15.4663 34.8619 11.7209 34.8619C7.97548 34.8619 6.54343 33.8998 6.54343 31.3493V31.1926C6.54343 28.6421 7.97548 27.68 11.7209 27.68C15.4663 27.68 16.9203 28.6421 16.9203 31.1926Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M40.5298 40.388H46.3461V22.1538H40.3095V31.7071L30.3951 22.1538H24.4686V40.388H30.5273V30.5661L40.5298 40.388Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M47.5305 40.388H54.845C60.6394 40.388 62.556 38.1731 62.556 31.9533V30.5885C62.556 24.3911 60.6394 22.1538 54.845 22.1538H47.5305V40.388ZM54.823 26.718C56.5194 26.718 57.2684 27.4563 57.2684 30.6557V31.8862C57.2684 35.0408 56.5194 35.8238 54.823 35.8238H52.8181V26.718H54.823Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M69.2025 40.388H73.4768L71.8904 22.1538H64.62L63.0337 40.388H67.2638L67.5062 36.8083H68.9602L69.2025 40.388ZM67.7265 33.5865L68.2552 25.8678L68.7619 33.5865H67.7265Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M83.2596 8.02732H84.6201V0.5L83.2596 0.5V3.57936H75.3797V4.94796L83.2596 4.94797V8.02732Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M75.3797 14.062V15.4763L84.6201 11.9179V10.4125L75.3797 6.86548V8.26829L77.8174 9.1807V13.1496L75.3797 14.062ZM79.1778 9.68252L83.1349 11.1652L79.1778 12.6478V9.68252Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M75.3797 16.9451V22.8187H76.7402V18.3137H84.6201V16.9451H75.3797Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M75.3797 24.4048V25.7734H80.0169L75.3797 30.4608V32.2856L80.153 27.5184L84.6201 32.1488V30.4038L80.1076 25.7734H84.6201V24.4048H75.3797Z"
                        fill="#6614EE"
                    />
                    <path
                        d="M78.7244 33.6228H78.7811V32.2542H78.7018C76.3435 32.2542 75.3231 33.4746 75.3231 36.3829C75.3231 39.1087 76.0261 40.5 77.9535 40.5H78.0328C79.8129 40.5 80.5612 39.5535 80.72 36.4513C80.8333 34.1817 81.1848 33.6228 82.0465 33.6228H82.0918C82.8855 33.6228 83.3163 34.3527 83.3163 36.3487C83.3163 38.2646 82.7267 39.1314 81.5136 39.1314H81.4342V40.5H81.5249C83.4411 40.5 84.6769 39.1999 84.6769 36.3829C84.6769 33.6228 83.6112 32.2542 82.0578 32.2542H81.9104C80.3345 32.2542 79.4955 33.121 79.3594 36.4741C79.2687 38.6068 78.9058 39.1429 77.9761 39.1429H77.9082C76.9784 39.1429 76.6837 38.2304 76.6837 36.4057C76.6837 34.558 77.2391 33.6228 78.7244 33.6228Z"
                        fill="#6614EE"
                    />
                </svg>
            </Link>

            <nav className="flex items-center space-x-6 text-sm">
                <Link className="hidden xl:inline-block" href={routesBuilder.home}>
                    Cómo funciona
                </Link>

                <Link className="hidden xl:inline-block" href={routesBuilder.home}>
                    Preguntas frecuentes
                </Link>

                <Link className="hidden xl:inline-block" href={routesBuilder.theProcess}>
                    Becas y proceso
                </Link>

                <Link
                    className="rounded-xl border border-dark bg-white px-8 py-2.5"
                    href={routesBuilder.dashboard}
                >
                    Iniciar sesión
                </Link>
            </nav>
        </header>
    );
};

const LandingHero = () => (
    <div className="relative flex min-h-screen items-center bg-cover pt-16">
        <Image
            className="absolute inset-0 h-full w-full object-cover"
            src={background}
            width={2560}
            height={1664}
            alt=""
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>

        <Header />

        <div className="relative w-full py-20">
            <div className="container flex flex-col items-center justify-center space-y-10 text-center">
                <div className="space-y-4 xl:w-10/12">
                    <h1 className="text-2xl font-semibold xl:text-6xl">
                        Ingresa al mundo de la tecnología con una beca del 100%
                    </h1>

                    <p className="text-muted-foreground xl:mx-auto xl:w-8/12">
                        Obtén una <b className="text-dark">beca gratuita</b> con la que
                        desarrollarás las habilidades necesarias para entrar en la
                        industria digital y <b className="text-dark">crear tu futuro</b>.
                    </p>

                    <div className="flex justify-center">
                        <LandingButtonCTA />
                    </div>
                </div>

                <div className="flex space-x-3 rounded-full bg-brand-primary/20 p-1">
                    <div className="flex">
                        <Image
                            className="h-20 w-20 rounded-full border border-white bg-gray-100"
                            placeholder="blur"
                            src={photoBenja}
                            alt="Benjamín Quezada"
                            width={80}
                            height={80}
                            priority
                        />

                        <Image
                            className="-ml-10 h-20 w-20 rounded-full border border-white bg-gray-100"
                            placeholder="blur"
                            src={photoDreyco}
                            alt="Dreyco Román"
                            width={80}
                            height={80}
                            priority
                        />

                        <Image
                            className="-ml-10 h-20 w-20 rounded-full border border-white bg-gray-100"
                            placeholder="blur"
                            src={photoMary}
                            alt="Mary Avril"
                            width={80}
                            height={80}
                            priority
                        />
                    </div>

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-dark text-center text-sm text-white">
                        +600 becados
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default LandingHero;
