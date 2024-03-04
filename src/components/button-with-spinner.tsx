import { LoadingSpinner } from './loading-spinner';
import { Button, ButtonProps } from './ui/button';

import { cn } from '@/lib/utils';

type Props = Omit<ButtonProps, 'children'> & {
    showSpinner: boolean;
    children: string;
};

export const ButtonWithSpinner = ({
    showSpinner,
    children,
    className,
    disabled,
    ...props
}: Props) => (
    <Button
        {...props}
        disabled={showSpinner || disabled}
        className={cn(className, 'relative')}
        type="submit"
    >
        <span className={showSpinner ? 'invisible' : 'visible'}>{children}</span>

        {showSpinner && (
            <span className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner />
            </span>
        )}
    </Button>
);
