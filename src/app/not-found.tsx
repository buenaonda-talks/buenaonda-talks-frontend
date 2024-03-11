import { Button } from '@/components/ui/button';
import LandingHeader from '@/screens/landing/header';
import LandingFooter from '@/screens/landing/landing-footer';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col">
            <LandingHeader />

            <div className="container flex flex-1 items-center justify-center pb-32 pt-36 text-center">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold">Parece que te has perdido</h1>

                        <p className="text-muted-foreground">
                            La página que buscas no existe o ha sido movida.
                        </p>
                    </div>

                    <Button asChild className="rounded-full">
                        <Link href="/">Volver al inicio</Link>
                    </Button>
                </div>
            </div>

            <LandingFooter />
        </main>
    );
}
