'use client';

import { DashboardLinkType } from '@/constants';
import {
    Trophy,
    ClipboardList,
    GraduationCapIcon,
    PanelsTopLeftIcon,
    MegaphoneIcon,
    UserIcon,
} from 'lucide-react';
import routesBuilder from '@/lib/routes';
import { PropsWithChildren } from 'react';
import {
    BaseDashboardLayout,
    DashboardButtonLink,
} from '../../shared/base-dashboard-layout';
import { useUserQuery } from '@/api/query/fetch-user-client';

const ADMIN_DASHBOARD_LINKS: DashboardLinkType[] = [
    {
        icon: GraduationCapIcon,
        href: routesBuilder.students,
        label: 'Estudiantes',
    },
    {
        icon: ClipboardList,
        href: routesBuilder.applications,
        label: 'Postulaciones',
    },
    {
        icon: Trophy,
        href: routesBuilder.scholarships,
        label: 'Becas',
    },
];

const TopLinks = () => {
    const userQuery = useUserQuery();

    return (
        <>
            <DashboardButtonLink
                link={{
                    icon: PanelsTopLeftIcon,
                    href: routesBuilder.dashboard,
                    label: 'Dashboard',
                }}
            />

            <div className="space-y-2">
                <p className="text-sm font-bold">Estudiantes</p>

                <div className="space-y-1">
                    {ADMIN_DASHBOARD_LINKS.map((link) => (
                        <DashboardButtonLink key={link.href} link={link} />
                    ))}
                </div>
            </div>

            {userQuery.data?.user?.isSuperAdmin && (
                <div className="space-y-2">
                    <p className="text-sm font-bold">Super Administración</p>

                    <div className="space-y-1">
                        <DashboardButtonLink
                            link={{
                                icon: MegaphoneIcon,
                                href: routesBuilder.convocatories,
                                label: 'Convocatorias',
                            }}
                        />

                        <DashboardButtonLink
                            link={{
                                icon: UserIcon,
                                href: routesBuilder.users,
                                label: 'Usuarios',
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export const AdminLayout = ({ children }: PropsWithChildren) => (
    <BaseDashboardLayout
        navigationProps={{
            TopLinks,
        }}
    >
        {children}
    </BaseDashboardLayout>
);
