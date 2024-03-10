import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type DashboardContentSafeSpaceProps = PropsWithChildren<{
    wrapperClassName?: string;
    containerClassName?: string;
}>;

export const SAFE_SPACE_WRAPPER_CLASS = 'py-6 2xl:px-6 2xl:pb-8 2xl:pt-6';

export const DashboardContentSafeSpace = ({
    wrapperClassName,
    containerClassName,
    children,
}: DashboardContentSafeSpaceProps) => {
    return (
        <div className={cn(SAFE_SPACE_WRAPPER_CLASS, wrapperClassName)}>
            <div
                className={cn(
                    'container 2xl:mx-0 2xl:max-w-full 2xl:px-0',
                    containerClassName,
                )}
            >
                {children}
            </div>
        </div>
    );
};
