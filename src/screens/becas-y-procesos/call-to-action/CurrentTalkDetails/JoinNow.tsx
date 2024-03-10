import Link from 'next/link';

export const TheProcessPageHeroJoinNow = () => {
    return (
        <div className="pt-8 xl:pt-0">
            <div className="rounded-2xl border-2 border-[#17CEA9] p-10">
                <h2 className="mb-4 text-center">
                    <span className="mb-4 block font-sans text-2xl">INGRESA AHORA</span>
                    <span className="font-headings block text-5xl font-bold">
                        ESTAMOS EN VIVO
                    </span>
                </h2>

                <div className="flex flex-col items-center justify-center space-y-2">
                    <Link
                        className="font-headings rounded-full bg-[#17CEA9] px-4 py-1 font-bold text-white"
                        href="/ingresar-a-charla"
                        style={{
                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        Ingresa a la charla
                    </Link>
                    <span className="text-xs font-medium">Te estamos esperando</span>
                </div>
            </div>
        </div>
    );
};
