import { PropsWithChildren } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TeacherDashboardDesktopNavigation } from './desktop-navigation';
import { TeacherDashboardMobileNavigation } from './mobile-navigation';

export const TeacherLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="2xl:flex 2xl:h-screen 2xl:overflow-hidden">
            <TeacherDashboardDesktopNavigation className="hidden 2xl:block 2xl:w-[270px]" />
            <TeacherDashboardMobileNavigation className="2xl:hidden" />

            <main className="2xl:flex-1">
                <ScrollArea className="2xl:h-screen">{children}</ScrollArea>
            </main>
        </div>
    );
};
