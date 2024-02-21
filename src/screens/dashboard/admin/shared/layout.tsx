import { PropsWithChildren } from 'react';
import { AdminDashboardSideNavigation } from './side-navigation';

export const AdminsLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <AdminDashboardSideNavigation className="w-[270px]" />

            <main className="h-screen w-full min-w-0 flex-1 overflow-y-scroll">
                {children}
            </main>
        </div>
    );
};
