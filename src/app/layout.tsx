import { Metadata } from 'next';
import { Poppins, Roboto_Flex } from 'next/font/google';
import '../styles/globals.scss';
import AppClientProviders from './layout-client-providers';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['400', '600'],
});

const roboto = Roboto_Flex({
    variable: '--font-roboto',
    subsets: ['latin'],
    weight: ['400', '700'],
});

export const metadata: Metadata = {
    title: 'BuenaOnda Talks',
    description: 'Obtén una beca para programar',
    openGraph: {
        type: 'website',
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_HOST || 'http://localhost:3000'),
    robots: {
        index: process.env.NEXT_PUBLIC_APP_ENV === 'production',
        follow: process.env.NEXT_PUBLIC_APP_ENV === 'production',
    },
};

export const dynamic = 'force-dynamic';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="es">
            <head />

            <body
                className={`${poppins.variable} ${roboto.variable} font-sans text-dark`}
            >
                <AppClientProviders>{children}</AppClientProviders>
                <Toaster />
            </body>
        </html>
    );
};

export default RootLayout;
