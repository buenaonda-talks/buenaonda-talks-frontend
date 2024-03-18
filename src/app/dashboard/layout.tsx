import { ClerkLoaded } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';

const DashboardMainLayout = ({ children }: PropsWithChildren) => {
    return <ClerkLoaded>{children}</ClerkLoaded>;
};

export default DashboardMainLayout;
