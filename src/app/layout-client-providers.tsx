'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
    children: React.ReactNode;
};

const AppClientProviders = ({ children }: Props) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        refetchInterval: false,
                        refetchOnMount: false,
                        refetchOnReconnect: false,
                        refetchIntervalInBackground: false,
                    },
                },
            }),
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default AppClientProviders;
