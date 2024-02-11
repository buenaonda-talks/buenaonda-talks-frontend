import Image from 'next/image';
import image from './bo-talks-joven-feliz.png';
import Link from 'next/link';

const LandingUniqueOpportunity = () => (
    <section
        className="overflow-hidden text-white"
        style={{
            background: 'linear-gradient(270deg, #430AA4 0.11%, #6614EE 99.9%)',
        }}
    >
        <div className="container flex flex-col lg:flex-row">
            <div className="relative order-2 hidden overflow-hidden pb-[50%] lg:order-1 lg:w-5/12 lg:pb-0 lg:pr-16 xl:block">
                <Image
                    className="absolute inset-0 object-contain object-bottom lg:bottom-auto lg:top-6 lg:h-full lg:w-full"
                    src={image}
                    alt=""
                    placeholder="blur"
                    height={514}
                    width={500}
                    quality={80}
                />
            </div>

            <div className="order-1 pb-36 pt-28 lg:order-2 lg:w-7/12">
                <h2 className="mb-6 text-5xl font-bold">UNA OPORTUNIDAD ÚNICA</h2>
                <p className="mb-4 font-light">
                    Ofrecemos becas de programación frontend dirigida a estudiantes de 2do
                    a 4to medio. Esta beca proporciona una oportunidad única para aprender
                    las bases de la programación web. Solo tienes que inscribirte a la
                    siguiente charla y contar con los siguientes elementos:
                </p>
                <ul className="mb-6 list-disc pl-4">
                    <li>Computador</li>
                    <li>Internet</li>
                    <li>Ganas de aprender</li>
                </ul>

                <Link
                    className="font-headings rounded-full bg-[#17CEA9] px-4 py-1 font-bold"
                    href="/signup"
                    style={{
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    Inscríbete ahora
                </Link>
            </div>
        </div>
    </section>
);

export default LandingUniqueOpportunity;
