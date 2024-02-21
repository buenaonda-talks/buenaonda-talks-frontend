import { PropsWithChildren } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TeacherDashboardSideNavigation } from './side-navigation';

export const TeacherLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <TeacherDashboardSideNavigation className="w-[270px]" />

            <main className="min-w-0 flex-1">
                <ScrollArea className="h-screen">{children}</ScrollArea>
            </main>
        </div>
    );
};
