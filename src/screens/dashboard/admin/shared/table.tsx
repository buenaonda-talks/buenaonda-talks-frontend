import { LoadingSpinner } from '@/components/loading-spinner';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { PropsWithChildren, forwardRef } from 'react';

type AdminTableErrorProps = {
    heads: React.ReactNode[];
};

export const AdminTableError = ({ heads }: AdminTableErrorProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>{heads}</TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell colSpan={heads.length} className="h-24 text-center">
                        Error al cargar los datos
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export const AdminTableWrapper = ({ children }: PropsWithChildren) => {
    return <div className="rounded-md border">{children}</div>;
};

type AdminTableInifiteQueryLoaderProps = {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
};

export const AdminTableInifiteQueryLoader = forwardRef<
    HTMLButtonElement,
    AdminTableInifiteQueryLoaderProps
>(({ hasNextPage, isFetchingNextPage, fetchNextPage }, ref) => {
    return (
        <div className="pt-4">
            <button
                tabIndex={-1}
                className="pointer-events-none block w-full"
                ref={ref}
                disabled={!hasNextPage || isFetchingNextPage}
                onClick={() => fetchNextPage()}
            />

            <div
                className={cn(
                    'relative h-14',
                    isFetchingNextPage ? 'opacity-100' : 'opacity-0',
                )}
            >
                <Skeleton className="h-14 w-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            </div>
        </div>
    );
});

AdminTableInifiteQueryLoader.displayName = 'AdminTableInifiteQueryLoader';
