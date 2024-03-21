export const DISCORD_HREF = 'https://discord.gg/Sbt252RQ';
export const WHATSAPP_HREF = 'https://wa.me/56966716128';

export type DashboardLinkType = {
    icon: React.FC<{
        className?: string;
    }>;
    href: string;
    label: string;
    withNativeTag?: boolean;
    openInNewTab?: boolean;
};
