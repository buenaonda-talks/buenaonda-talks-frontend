'use client';

import { PropsWithChildren } from 'react';
import {
    BaseDashboardLayout,
    DashboardButtonLink,
} from '../../shared/base-dashboard-layout';
import { WhatsAppIcon } from '@/components/icons/WhatsappIcon';
import { DISCORD_HREF, DashboardLinkType, WHATSAPP_HREF } from '@/constants';
import { HelpCircleIcon, PanelsTopLeftIcon } from 'lucide-react';
import routesBuilder from '@/lib/routes';
import { DiscordIcon } from '@/components/icons/DiscordIcon';

const STUDENTS_DASHBOARD_LINKS: DashboardLinkType[] = [
    {
        icon: PanelsTopLeftIcon,
        href: routesBuilder.dashboard,
        label: 'Tu beca',
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
            {STUDENTS_DASHBOARD_LINKS.map((link) => (
                <DashboardButtonLink key={link.href} link={link} />
            ))}
        </div>
    </>
);

export const StudentsLayout = ({ children }: PropsWithChildren) => (
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
                {
                    href: DISCORD_HREF,
                    icon: DiscordIcon,
                    label: 'Discord',
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
