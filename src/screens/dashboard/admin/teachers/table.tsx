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
import { useAdminTeachersTableInfiniteQuery } from './query';
import { Skeleton } from '@/components/ui/skeleton';
import {
    AdminTableError,
    AdminTableInifiteQueryLoader,
    AdminTableWrapper,
} from '../shared/table';
import { AdminTeachersTableQuery } from '@/api/graphql';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import throttle from 'lodash/throttle';
import { format } from 'date-fns';
import Link from 'next/link';
import routesBuilder from '@/lib/routes';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type Teacher = NonNullable<AdminTeachersTableQuery['teachers']['edges'][number]>['node'];

const columnHelper = createColumnHelper<Teacher>();
const columns = [
    columnHelper.accessor('id', {
        header: 'Usuario',
        cell: (props) => {
            const teacher = props.row.original;
            const { firstName, lastName, email } = teacher;

            return (
                <Link
                    href={routesBuilder.teacherById(teacher.id)}
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
    columnHelper.accessor('teacherProfile.colleges', {
        header: 'Colegios',
        cell: (props) => {
            const value = props.getValue();

            if (!value.length) {
                return <div className="text-muted-foreground">No asignado</div>;
            }

            return (
                <div className="-ml-4 -mt-2 flex flex-wrap">
                    {value.map((college) => {
                        return (
                            <Badge
                                key={college.id}
                                className="ml-4 mt-2"
                                variant="outline"
                            >
                                {college.name}
                            </Badge>
                        );
                    })}
                </div>
            );
        },
    }),
    columnHelper.accessor('dateJoined', {
        header: 'Se unió el',
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
    data: Teacher[];
};

const TeachersTable = ({ data }: TableProps) => {
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

const useTeachersFilters = () => {
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

export const AdminTeachersTableContainer = () => {
    const teacherFilters = useTeachersFilters();
    const { filters } = teacherFilters;

    const [queryToSearch, setQueryToSearch] = useState<string | null>(null);

    const [ref, inView] = useInView();

    const query = useAdminTeachersTableInfiniteQuery({
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
                <Filters {...teacherFilters} />

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
                <Filters {...teacherFilters} />

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
            <Filters {...teacherFilters} />

            <AdminTableWrapper>
                <TeachersTable
                    data={query.data.pages
                        .map((page) => page.teachers.edges.map((edge) => edge!.node))
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
