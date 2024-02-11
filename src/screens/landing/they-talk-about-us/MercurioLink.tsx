'use client';

import mercurio from './el-mercurio.png';
import mercurioPhaway from './el-mercurio-phaway.jpeg';
import { useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Image from 'next/image';
import { DeprecatedPortal } from '../../../components/deprecated-portal';

const MercurioLink = () => {
    const [showModal, setShowModal] = useState(false);
    const portalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!showModal) return;

        const element = portalRef.current;
        if (!element) return;

        disableBodyScroll(element);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                setShowModal(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            enableBodyScroll(element);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [showModal]);

    return (
        <>
            <button
                onClick={() => {
                    setShowModal(true);
                }}
            >
                <Image
                    src={mercurio}
                    width={255}
                    height={26}
                    alt="El mercurio"
                    placeholder="blur"
                    className="max-h-8 w-[210px]"
                    quality={100}
                />
            </button>

            {showModal && (
                <DeprecatedPortal>
                    <div className="fixed inset-0 z-50" ref={portalRef}>
                        <div
                            onClick={(e) => {
                                if ((e.target as HTMLElement).id === 'mercurio-image') {
                                    return;
                                }

                                setShowModal(false);
                            }}
                            className="relative h-screen overflow-y-scroll bg-black/50"
                        >
                            <div className="container flex min-h-screen items-center justify-center">
                                <div className="mx-auto px-8 py-20 pb-8 pt-4 lg:w-9/12">
                                    <div className="mb-4 flex justify-end">
                                        <button
                                            className="pointer-events-auto h-3 w-3 hover:opacity-50"
                                            aria-label="Cerrar"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512"
                                            >
                                                <path
                                                    className="fill-white"
                                                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <Image
                                        id="mercurio-image"
                                        className="pointer-events-auto"
                                        src={mercurioPhaway}
                                        alt=""
                                        placeholder="blur"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </DeprecatedPortal>
            )}
        </>
    );
};

export default MercurioLink;
