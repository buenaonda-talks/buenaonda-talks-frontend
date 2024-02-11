import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    className?: string;
    asChild?: boolean;
}>;

export const TypographyAdminH1 = ({ children, className, asChild }: Props) => {
    const Comp = asChild ? Slot : 'h1';

    return (
        <Comp className={cn('text-2xl font-bold text-gray-900', className)}>
            {children}
        </Comp>
    );
};
