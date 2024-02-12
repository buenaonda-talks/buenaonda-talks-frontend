'use client';

import { useUserQuery as useUserQuery } from '@/api/query/fetch-user-client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import routesBuilder from '@/lib/routes';

import { cn } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs';
import {
    Apple,
    GraduationCap,
    Megaphone,
    PanelsTopLeft,
    Trophy,
    User,
} from 'lucide-react';
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

export const AdminDashboardSideNavigation = ({ className }: SidebarProps) => {
    const userQuery = useUserQuery();

    return (
        <div className={cn('border-r', className)}>
            <div className="flex h-screen flex-col py-4">
                <div className="space-y-6 px-3 py-2">
                    <div className="space-y-1">
                        <ButtonLink href={routesBuilder.dashboard}>
                            <Link href={routesBuilder.dashboard}>
                                <PanelsTopLeft className="h-4 w-4" />
                                <span>Dashboard</span>
                            </Link>
                        </ButtonLink>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-bold">Estudiantes</p>

                        <div className="space-y-1">
                            <ButtonLink href={routesBuilder.students}>
                                <Link href={routesBuilder.students}>
                                    <GraduationCap className="h-4 w-4" />
                                    <span>Estudiantes</span>
                                </Link>
                            </ButtonLink>

                            <ButtonLink href={routesBuilder.applications}>
                                <Link href={routesBuilder.applications}>
                                    <Apple className="h-4 w-4" />
                                    <span>Postulaciones</span>
                                </Link>
                            </ButtonLink>

                            <ButtonLink href={routesBuilder.scholarships}>
                                <Link href={routesBuilder.scholarships}>
                                    <Trophy className="h-4 w-4" />
                                    <span>Becas</span>
                                </Link>
                            </ButtonLink>
                        </div>
                    </div>

                    {userQuery.data?.user.isSuperAdmin && (
                        <div className="space-y-2">
                            <p className="text-sm font-bold">Super Administración</p>

                            <div className="space-y-1">
                                <ButtonLink href={routesBuilder.convocatories}>
                                    <Link href={routesBuilder.convocatories}>
                                        <Megaphone className="h-4 w-4" />
                                        <span>Convocatorias</span>
                                    </Link>
                                </ButtonLink>

                                <ButtonLink href={routesBuilder.users}>
                                    <Link href={routesBuilder.users}>
                                        <User className="h-4 w-4" />
                                        <span>Usuarios</span>
                                    </Link>
                                </ButtonLink>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto px-3 py-2">
                    <div className="relative">
                        {userQuery.data?.user ? (
                            <div className="flex items-center">
                                <SignedIn>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>

                                <div className="ml-2">
                                    <p className="text-sm">
                                        {userQuery.data.user.firstName}
                                    </p>
                                    <p className="text-sm">{userQuery.data.user.email}</p>
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
    );
};
