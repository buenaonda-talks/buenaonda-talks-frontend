'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import routesBuilder from '@/lib/routes';
import { cn } from '@/lib/utils';

const LandingHeader = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef || !isMenuOpen) return;

        disableBodyScroll(currentRef);

        return () => {
            enableBodyScroll(currentRef);
        };
    }, [isMenuOpen]);

    return (
        <header className="fixed inset-x-0 top-0 z-20 h-24 bg-[#B10273]">
            <div className="container flex h-24 items-center justify-between">
                <Link href={routesBuilder.home}>
                    <Image
                        className="mr-4 max-w-[100px]"
                        src="/bo-talks-logo-white.png"
                        width={105}
                        height={50}
                        alt="Logo"
                    />
                </Link>

                <div
                    ref={ref}
                    className={clsx(
                        'fixed inset-y-0 left-0 flex w-full items-center bg-[#B10273] lg:static lg:h-24 lg:w-auto',
                        isMenuOpen
                            ? 'flex flex-col items-center justify-center lg:flex-row'
                            : 'hidden lg:flex',
                    )}
                >
                    <Link
                        className={clsx(
                            'flex h-24 w-full items-center justify-center px-8 text-center uppercase text-white lg:w-auto',
                            pathname === routesBuilder.home &&
                                'font-bold shadow-[0_4px_15px_0px_rgba(0,0,0,0.3)_inset]',
                        )}
                        href={routesBuilder.home}
                    >
                        Inicio
                    </Link>

                    <Link
                        className={clsx(
                            'flex h-24 w-full items-center justify-center px-8 text-center uppercase text-white lg:w-auto',
                            pathname === routesBuilder.theProcess &&
                                'font-bold shadow-[0_4px_15px_0px_rgba(0,0,0,0.3)_inset]',
                        )}
                        href={routesBuilder.theProcess}
                    >
                        Becas y Proceso
                    </Link>

                    <Link
                        href={routesBuilder.dashboard}
                        className="mt-8 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold uppercase leading-none sm:px-8 sm:py-3 lg:ml-8 lg:mt-0"
                    >
                        Inicia sesión
                    </Link>
                </div>

                <button
                    className={clsx('relative z-50 flex flex-col space-y-2 lg:hidden')}
                    onClick={toggleMenu}
                    type="button"
                >
                    <span
                        className={cn(
                            'block h-[2px] w-8 rounded-full bg-white transition-all duration-200',
                            isMenuOpen && 'translate-y-[10px] rotate-45 transform',
                        )}
                    ></span>
                    <span
                        className={cn(
                            'block h-[2px] w-8 rounded-full bg-white transition-all duration-200',
                            isMenuOpen && 'w-0',
                        )}
                    ></span>
                    <span
                        className={cn(
                            'block h-[2px] w-8 rounded-full bg-white transition-all duration-200',
                            isMenuOpen && '-translate-y-[10px] -rotate-45 transform',
                        )}
                    ></span>
                </button>
            </div>
        </header>
    );
};

export default LandingHeader;
