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
import { UserQuery } from '@/api/graphql';
import { DashboardContentSafeSpace } from '../../shared/dashboard-content-safe-space';

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

type Props = PropsWithChildren<
    | {
          requiresVerification: true;
          user: UserQuery['user'];
      }
    | {
          requiresVerification?: false;
      }
>;

export const TeacherLayout = (props: Props) => {
    if (
        'requiresVerification' in props &&
        'user' in props &&
        props.requiresVerification &&
        !props.user?.teacherProfile?.isVerified
    ) {
        return (
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
                <DashboardContentSafeSpace containerClassName="flex flex-col items-center justify-center min-h-screen text-center">
                    <div className="mx-auto space-y-8 lg:w-8/12">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold">
                                Tu perfil está en proceso de verificación
                            </h1>

                            <p className="text-muted-foreground">
                                Estamos revisando tu perfil, en breve te notificaremos si
                                ha sido verificado.
                            </p>
                        </div>
                    </div>
                </DashboardContentSafeSpace>
            </BaseDashboardLayout>
        );
    }

    return (
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
            {props.children}
        </BaseDashboardLayout>
    );
};
