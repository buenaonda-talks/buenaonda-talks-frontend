import Link from 'next/link';
import { NewLandingHeaderNavMobile } from './site-navigation-mobile';
import { siteConfig } from '../dashboard/student/shared/site-config';
import { NewLandingHeaderNavDesktop } from './site-navigation-desktop';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icons } from '../dashboard/student/shared/icons';

export function NewLandingHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <NewLandingHeaderNavDesktop />
                <NewLandingHeaderNavMobile />

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    buttonVariants({
                                        variant: 'ghost',
                                    }),
                                    'w-9 px-0',
                                )}
                            >
                                <Icons.gitHub className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>

                        <Link
                            href={siteConfig.links.twitter}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    buttonVariants({
                                        variant: 'ghost',
                                    }),
                                    'w-9 px-0',
                                )}
                            >
                                <Icons.twitter className="h-3 w-3 fill-current" />
                                <span className="sr-only">Twitter</span>
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
