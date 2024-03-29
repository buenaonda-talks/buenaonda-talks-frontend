import { Metadata } from 'next';
import { Inter, Poppins, Roboto } from 'next/font/google';
import '../styles/globals.scss';
import AppClientProviders from './layout-client-providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['400', '700', '800'],
});

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
    weight: ['300', '400', '700'],
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
                className={`${inter.variable} ${poppins.variable} ${roboto.variable} font-sans`}
            >
                <AppClientProviders>{children}</AppClientProviders>
                <Toaster />
            </body>
        </html>
    );
};

export default RootLayout;
