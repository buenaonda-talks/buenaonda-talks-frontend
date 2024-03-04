'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import routesBuilder from '@/lib/routes';

import { cn } from '@/lib/utils';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { HelpCircle, Megaphone, PanelsTopLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

const ButtonLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <Button
            variant={pathname === href ? 'secondary' : 'ghost'}
            className="w-full justify-start space-x-2"
            asChild
        >
            {children}
        </Button>
    );
};

export const TeacherDashboardSideNavigation = ({ className }: SidebarProps) => {
    const { user, isLoaded } = useUser();

    return (
        <div className={cn('border-r', className)}>
            <div className="flex h-screen flex-col py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <ButtonLink href={routesBuilder.dashboard}>
                            <Link href={routesBuilder.dashboard}>
                                <PanelsTopLeft className="h-4 w-4" />
                                <span>Estudiantes</span>
                            </Link>
                        </ButtonLink>

                        <ButtonLink href={routesBuilder.teacherUpcomingTalk}>
                            <Link href={routesBuilder.teacherUpcomingTalk}>
                                <Megaphone className="h-4 w-4" />
                                <span>Próxima charla</span>
                            </Link>
                        </ButtonLink>

                        <ButtonLink href={routesBuilder.faq}>
                            <Link href={routesBuilder.faq}>
                                <HelpCircle className="h-4 w-4" />
                                <span>Preguntas Frecuentes</span>
                            </Link>
                        </ButtonLink>
                    </div>
                </div>

                <div className="mt-auto px-3 py-2">
                    <div>
                        <h2 className="mb-2 px-4 font-semibold tracking-tight">
                            Escríbenos
                        </h2>

                        <div className="space-y-1">
                            <ButtonLink href="/#">
                                <a href="/#">
                                    <svg
                                        className="h-4 w-4"
                                        role="img"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>WhatsApp</title>
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>

                                    <span>WhatsApp</span>
                                </a>
                            </ButtonLink>
                        </div>
                    </div>

                    <div className="pt-8">
                        <div className="relative">
                            {isLoaded && user ? (
                                <div className="flex items-center">
                                    <SignedIn>
                                        <UserButton afterSignOutUrl="/" />
                                    </SignedIn>

                                    <div className="ml-2">
                                        <p className="text-sm">{user.firstName}</p>
                                        <p className="text-sm">
                                            {user.primaryEmailAddress?.emailAddress}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex h-10 pt-1">
                                    <Skeleton className="h-8 w-8 rounded-full" />

                                    <div className="ml-2">
                                        <Skeleton className="mb-2 h-3 w-24" />
                                        <Skeleton className="h-3 w-40" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};