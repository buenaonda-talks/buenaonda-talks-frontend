'use client';

import { TypographyAdminH1 } from '@/components/typography';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useAdminUsersTableInfiniteQuery } from './query';
import { Skeleton } from '@/components/ui/skeleton';
import {
    AdminTableError,
    AdminTableInifiteQueryLoader,
    AdminTableWrapper,
} from '../shared/table';
import { AdminUsersTableQuery } from '@/api/graphql';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import throttle from 'lodash/throttle';
import { format } from 'date-fns';
import Link from 'next/link';
import routesBuilder from '@/lib/routes';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { Input } from '@/components/ui/input';
import { useDeleteUser } from './mutation';
import { useToast } from '@/components/ui/use-toast';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVerticalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonWithSpinner } from '@/components/button-with-spinner';

type User = NonNullable<AdminUsersTableQuery['users']['edges'][number]>['node'];

type ColumnActionsProps = {
    user: User;
};
const ColumnActions = ({ user }: ColumnActionsProps) => {
    const deleteMutation = useDeleteUser();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            onOpenChange={(next) => {
                if (deleteMutation.isPending) {
                    return;
                }

                setOpen(next);
            }}
            open={open}
        >
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVerticalIcon className="h-5 w-5" />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Eliminar</DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar eliminación</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que quieres eliminar el usuario &ldquo;
                        <strong>
                            <em>{user.email}</em>
                        </strong>
                        &rdquo;?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <ButtonWithSpinner
                        onClick={() => {
                            deleteMutation.mutate(
                                {
                                    userId: parseInt(user.id, 10),
                                },
                                {
                                    onSuccess: () => {
                                        toast({
                                            variant: 'default',
                                            title: 'Usuario eliminado',
                                            description: `El usuario "${user.email}" ha sido eliminado.`,
                                        });

                                        setOpen(false);
                                    },
                                    onError: () => {
                                        toast({
                                            variant: 'destructive',
                                            title: 'Error',
                                            description:
                                                'No se pudo eliminar el usuario.',
                                        });
                                    },
                                },
                            );
                        }}
                        variant="destructive"
                        showSpinner={deleteMutation.isPending}
                    >
                        Eliminar
                    </ButtonWithSpinner>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const columnHelper = createColumnHelper<User>();
const columns = [
    columnHelper.accessor('id', {
        header: 'Usuario',
        cell: (props) => {
            const userUser = props.row.original;
            const { firstName, lastName, email } = userUser;

            return (
                <Link
                    href={routesBuilder.userById(userUser.id)}
                    className="block hover:underline"
                >
                    <span className="block text-sm font-semibold">
                        {firstName} {lastName}
                    </span>

                    <span className="block text-sm text-muted-foreground">{email}</span>
                </Link>
            );
        },
    }),
    columnHelper.accessor('dateJoined', {
        header: 'Fecha',
        cell: (props) => {
            const value = props.getValue();
            return (
                <div>
                    <p>{format(value, 'dd/MM/yyyy')}</p>
                    <p className="text-muted-foreground">
                        a las {format(value, 'HH:mm')}
                    </p>
                </div>
            );
        },
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Acciones',
        cell: (props) => {
            return (
                <div className="flex justify-end">
                    <ColumnActions user={props.row.original} />
                </div>
            );
        },
    }),
];

const useStudentsFilters = () => {
    return useUrlFilters({
        query: { type: 'string' },
    });
};

type FiltersProps = ReturnType<typeof useStudentsFilters>;

const Filters = ({ filters, setFilter }: FiltersProps) => {
    return (
        <div className="mb-4 flex space-x-2">
            <Input
                placeholder="Buscar por email, nombre, apellido o teléfono"
                value={filters.query || ''}
                onChange={(e) => {
                    setFilter('query', e.target.value);
                }}
                className="max-w-xs"
            />
        </div>
    );
};

type TableProps = {
    data: User[];
};

const UsersTable = ({ data }: TableProps) => {
    const table = useReactTable({
        data,
        columns,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table className="w-full overflow-x-scroll">
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>

            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && 'selected'}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, {
                                        ...cell.getContext(),
                                    })}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No hay datos
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

const useUsersFilters = () => {
    return useUrlFilters({
        query: { type: 'string' },
        status: { type: 'multiple-string' },
        convocatory: { type: 'multiple-int' },
        college: { type: 'multiple-int' },
    });
};

const Wrapper = ({ children }: PropsWithChildren) => {
    return (
        <div className="px-6 pb-8 pt-6">
            <div className="mb-4 flex items-center justify-between">
                <TypographyAdminH1>Usuarios</TypographyAdminH1>
            </div>

            {children}
        </div>
    );
};

export const AdminUsersTableContainer = () => {
    const userUserFilters = useUsersFilters();
    const { filters } = userUserFilters;

    const [queryToSearch, setQueryToSearch] = useState<string | null>(null);

    const [ref, inView] = useInView();

    const query = useAdminUsersTableInfiniteQuery({
        query: queryToSearch && queryToSearch.length > 3 ? queryToSearch : null,
    });

    const { hasNextPage, fetchNextPage, isFetchingNextPage } = query;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const triggerSearch = useCallback(
        throttle((query: string | null) => {
            setQueryToSearch(query);
        }, 500),
        [],
    );

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    useEffect(() => {
        if (!filters.query || filters.query.length > 3 || filters.query.length === 0) {
            triggerSearch(filters.query || null);
        }
    }, [filters.query, triggerSearch]);

    if (query.isPending) {
        return (
            <Wrapper>
                <Filters {...userUserFilters} />

                <AdminTableWrapper>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableHead key={column.id}>
                                        {typeof column.header === 'string' ? (
                                            column.header
                                        ) : (
                                            <div>Loading...</div>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {[...new Array(5)].map((_, i) => (
                                <TableRow key={i}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>
                                            <Skeleton className="h-8" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </AdminTableWrapper>
            </Wrapper>
        );
    }

    if (query.isError) {
        return (
            <Wrapper>
                <Filters {...userUserFilters} />

                <AdminTableWrapper>
                    <AdminTableError
                        heads={columns.map((col) => {
                            return (
                                <TableHead key={col.id}>{col.header as string}</TableHead>
                            );
                        })}
                    />
                </AdminTableWrapper>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Filters {...userUserFilters} />

            <AdminTableWrapper>
                <UsersTable
                    data={query.data.pages
                        .map((page) => page.users.edges.map((edge) => edge!.node))
                        .flat()}
                />
            </AdminTableWrapper>

            <AdminTableInifiteQueryLoader
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                ref={ref}
            />
        </Wrapper>
    );
};
