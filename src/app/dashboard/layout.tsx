import { ClerkLoaded, ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';
import { PropsWithChildren } from 'react';

const DashboardMainLayout = ({ children }: PropsWithChildren) => {
    return (
        <ClerkProvider localization={esES}>
            <ClerkLoaded>{children}</ClerkLoaded>
        </ClerkProvider>
    );
};

export default DashboardMainLayout;
