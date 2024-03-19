export const DISCORD_HREF = 'https://discord.gg/8v6Y5s3';
export const WHATSAPP_HREF = 'https://wa.me/56966716128';
export const MANY_CHAT_WHATSAPP_HREF = 'https://wa.me/56949848288';

export type DashboardLinkType = {
    icon: React.FC<{
        className?: string;
    }>;
    href: string;
    label: string;
    withNativeTag?: boolean;
    openInNewTab?: boolean;
};
