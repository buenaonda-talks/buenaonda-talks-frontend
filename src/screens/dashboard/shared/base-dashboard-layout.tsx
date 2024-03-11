import { PropsWithChildren, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { DashboardLinkType } from '@/constants';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

export type BaseDashboardNavigationProps = {
    className?: string;
    TopLinks: React.FC;
    communicationLinks?: DashboardLinkType[];
};

type Props = PropsWithChildren<{
    navigationProps: BaseDashboardNavigationProps;
}>;

export const BaseDashboardLayout = ({ children, navigationProps }: Props) => {
    return (
        <div className="2xl:flex 2xl:h-screen 2xl:overflow-hidden">
            <BaseDashboardDesktopNavigation
                {...navigationProps}
                className="hidden 2xl:block 2xl:w-[270px]"
            />
            <BaseDashboardMobileNavigation {...navigationProps} className="2xl:hidden" />

            <main className="min-w-0 2xl:flex-1">
                <ScrollArea className="2xl:h-screen">{children}</ScrollArea>
            </main>
        </div>
    );
};

type ButtonLinkProps = {
    link: DashboardLinkType;
};

export const DashboardButtonLink = ({ link }: ButtonLinkProps) => {
    const pathname = usePathname();

    return (
        <Button
            variant={pathname === link.href ? 'secondary' : 'ghost'}
            className="flex w-full justify-start space-x-2"
            asChild
        >
            {link.withNativeTag || link.openInNewTab ? (
                <a
                    href={link.href}
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel={link.openInNewTab ? 'noreferrer noopener' : undefined}
                >
                    <link.icon className="h-4 w-4" />
                    <span className="min-w-0 flex-1">{link.label}</span>
                </a>
            ) : (
                <Link href={link.href}>
                    <link.icon className="h-4 w-4" />
                    <span className="min-w-0 flex-1">{link.label}</span>
                </Link>
            )}
        </Button>
    );
};

export const BaseDashboardDesktopNavigation = ({
    className,
    TopLinks,
    communicationLinks,
}: BaseDashboardNavigationProps) => (
    <div className={cn('border-r', className)}>
        <div className="flex h-screen flex-col pt-6">
            <span className="mb-4 px-3 text-sm font-bold tracking-wider">
                BUENAONDA TALKS
            </span>

            <div className="space-y-6 px-3 py-2">
                <TopLinks />
            </div>

            <div className="mt-auto space-y-8 px-3 py-2">
                {communicationLinks && (
                    <div>
                        <h2 className="mb-2 font-semibold tracking-tight">Escríbenos</h2>

                        <div className="space-y-1">
                            {communicationLinks.map((link) => (
                                <DashboardButtonLink key={link.href} link={link} />
                            ))}
                        </div>
                    </div>
                )}

                <UserPreview />
            </div>
        </div>
    </div>
);

export const BaseDashboardMobileNavigation = ({
    TopLinks,
    communicationLinks,
    className,
}: BaseDashboardNavigationProps) => {
    const [sheetOpen, setSheetOpen] = useState(false);

    return (
        <Sheet modal={false} onOpenChange={setSheetOpen} open={sheetOpen}>
            <div className={cn('border-b border-border py-2 shadow-sm', className)}>
                <div className="container flex items-center justify-between">
                    <span className="text-sm font-bold tracking-wider">
                        BUENAONDA TALKS
                    </span>

                    <SheetTrigger>
                        <Button variant="outline">
                            <HamburgerMenuIcon className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                </div>
            </div>

            {sheetOpen && (
                <div
                    className={cn(
                        'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                    )}
                />
            )}

            <SheetContent className="flex flex-col px-3 sm:px-4" side="left">
                <SheetHeader className="mb-4 pt-4 text-left">
                    <SheetTitle className="text-sm font-bold tracking-wider">
                        BUENAONDA TALKS
                    </SheetTitle>
                </SheetHeader>

                <div className="space-y-6">
                    <TopLinks />
                </div>

                <div className="mt-auto space-y-8 py-2">
                    {communicationLinks && (
                        <div>
                            <h2 className="mb-2 font-semibold tracking-tight">
                                Escríbenos
                            </h2>

                            <div className="space-y-1">
                                {communicationLinks.map((link) => (
                                    <DashboardButtonLink key={link.href} link={link} />
                                ))}
                            </div>
                        </div>
                    )}

                    <UserPreview />
                </div>
            </SheetContent>
        </Sheet>
    );
};

const UserPreview = () => {
    const { user, isLoaded } = useUser();

    return (
        <div className="relative">
            {isLoaded && user ? (
                <div className="flex items-center">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>

                    <div className="ml-2">
                        <p className="text-sm">{user.firstName}</p>
                        <p className="text-sm">
                            {user.primaryEmailAddress?.emailAddress}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex h-10 pt-1">
                    <Skeleton className="h-8 w-8 rounded-full" />

                    <div className="ml-2">
                        <Skeleton className="mb-2 h-3 w-24" />
                        <Skeleton className="h-3 w-40" />
                    </div>
                </div>
            )}
        </div>
    );
};
