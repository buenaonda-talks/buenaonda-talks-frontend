'use client';

import { PropsWithChildren } from 'react';
import {
    BaseDashboardLayout,
    DashboardButtonLink,
} from '../../shared/base-dashboard-layout';
import { WhatsAppIcon } from '@/components/icons/WhatsappIcon';
import { DashboardLinkType, WHATSAPP_HREF } from '@/constants';
import { HelpCircleIcon, MegaphoneIcon, PanelsTopLeftIcon } from 'lucide-react';
import routesBuilder from '@/lib/routes';

const TEACHER_DASHBOARD_LINKS: DashboardLinkType[] = [
    {
        icon: PanelsTopLeftIcon,
        href: routesBuilder.dashboard,
        label: 'Estudiantes',
    },
    {
        icon: MegaphoneIcon,
        href: routesBuilder.teacherUpcomingTalk,
        label: 'Próxima charla',
    },
    {
        icon: HelpCircleIcon,
        href: routesBuilder.faq,
        label: 'Preguntas Frecuentes',
    },
];

const TopLinks = () => (
    <>
        <div className="space-y-1">
            {TEACHER_DASHBOARD_LINKS.map((link) => (
                <DashboardButtonLink key={link.href} link={link} />
            ))}
        </div>
    </>
);

export const TeacherLayout = ({ children }: PropsWithChildren) => (
    <BaseDashboardLayout
        navigationProps={{
            communicationLinks: [
                {
                    href: WHATSAPP_HREF,
                    icon: WhatsAppIcon,
                    label: 'WhatsApp',
                    openInNewTab: true,
                    withNativeTag: true,
                },
            ],
            TopLinks,
        }}
    >
        {children}
    </BaseDashboardLayout>
);
