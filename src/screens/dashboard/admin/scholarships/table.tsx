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
    CellContext as TanCellContext,
} from '@tanstack/react-table';
import {
    useAdminScholarshipsTableFilterOptionsQuery,
    useAdminScholarshipsTableInfiniteQuery,
} from './query';
import { Skeleton } from '@/components/ui/skeleton';
import {
    AdminTableError,
    AdminTableInifiteQueryLoader,
    AdminTableWrapper,
} from '../shared/table';
import {
    AdminScholarshipsTableFilterOptionsQuery,
    AdminScholarshipsTableQuery,
    ScholarshipStatus,
} from '@/api/graphql';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Input } from '@/components/ui/input';

import throttle from 'lodash/throttle';
import { AdminTableFilter } from '../shared/table-filter';
import { format } from 'date-fns';
import Link from 'next/link';
import routesBuilder from '@/lib/routes';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { DashboardContentSafeSpace } from '../../shared/dashboard-content-safe-space';

type Scholarship = NonNullable<
    AdminScholarshipsTableQuery['scholarships']['edges'][number]
>['node'];

type CellContext<TData extends Scholarship, TValue> = TanCellContext<TData, TValue> & {
    convocatories: AdminScholarshipsTableFilterOptionsQuery['convocatories'];
    colleges: AdminScholarshipsTableFilterOptionsQuery['colleges'];
};

const columnHelper = createColumnHelper<Scholarship>();
const columns = [
    columnHelper.accessor('id', {
        header: 'Estudiante',
        cell: (props) => {
            const scholarship = props.row.original;
            const { firstName, lastName, email } = scholarship.user;

            return (
                <Link
                    href={routesBuilder.scholarshipById(scholarship.id)}
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
    columnHelper.accessor('user.phoneCode', {
        header: 'Teléfono',
        cell: (props) => {
            const scholarship = props.row.original;
            const { phoneCode, phoneNumber } = scholarship.user;

            if (!phoneCode || !phoneNumber) {
                return '-';
            }

            return (
                <div>
                    <p className="text-sm font-semibold">
                        +{phoneCode}
                        {phoneNumber}
                    </p>
                </div>
            );
        },
    }),
    columnHelper.accessor('user.studentProfile.collegeId', {
        header: 'Colegio',
        cell: (props) => {
            const value = props.getValue();

            if (!value) {
                return '-';
            }

            const context = props as CellContext<Scholarship, string | null>;
            const college = context.colleges.find((college) => college.id === value);

            return <div>{college?.name || '-'}</div>;
        },
    }),
    columnHelper.accessor('convocatoryId', {
        header: 'Convocatoria',
        cell: (props) => {
            const convocatoryId = props.getValue();
            const context = props as CellContext<Scholarship, string>;
            const convocatory = context.convocatories.find(
                (convocatory) => convocatory.id === convocatoryId,
            );

            return <div>{convocatory?.privateLabel || '-'}</div>;
        },
    }),

    columnHelper.accessor('createdOn', {
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
];

type TableProps = {
    data: Scholarship[];
    convocatories: AdminScholarshipsTableFilterOptionsQuery['convocatories'];
    colleges: AdminScholarshipsTableFilterOptionsQuery['colleges'];
};

const ScholarshipsTable = ({ data, convocatories, colleges }: TableProps) => {
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
                                        convocatories,
                                        colleges,
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

const useScholarshipsFilters = () => {
    return useUrlFilters({
        query: { type: 'string' },
        status: { type: 'multiple-string' },
        convocatory: { type: 'multiple-int' },
        college: { type: 'multiple-int' },
    });
};

type FiltersProps = ReturnType<typeof useScholarshipsFilters> & {
    queryResult: ReturnType<typeof useAdminScholarshipsTableFilterOptionsQuery>;
};

const Filters = ({ filters, setFilter, queryResult }: FiltersProps) => {
    if (queryResult.isPending) {
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

                <Skeleton className="h-10 w-40" />

                <Skeleton className="h-10 w-40" />

                <Skeleton className="h-10 w-40" />
            </div>
        );
    }

    if (queryResult.isError) {
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
    }

    const { convocatories, colleges } = queryResult.data;

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

            <AdminTableFilter
                title="Filtrar por estado"
                options={[
                    {
                        value: ScholarshipStatus.Active,
                        label: 'Activa',
                    },
                    {
                        value: ScholarshipStatus.Finished,
                        label: 'Finalizada',
                    },
                    {
                        value: ScholarshipStatus.Inactive,
                        label: 'Inactiva',
                    },
                    {
                        value: ScholarshipStatus.Paused,
                        label: 'Pausada',
                    },
                    {
                        value: ScholarshipStatus.Resigned,
                        label: 'Renunciada',
                    },
                ]}
                onSelect={(values) => {
                    setFilter('status', values);
                }}
                selectedValues={filters.status}
                onClear={() => {
                    setFilter('status', []);
                }}
            />

            <AdminTableFilter
                title="Filtrar por convocatoria"
                options={convocatories.map((convocatory) => {
                    return {
                        value: convocatory.id,
                        label: convocatory.privateLabel,
                    };
                })}
                onSelect={(values) => {
                    setFilter(
                        'convocatory',
                        values.map((x) => parseInt(x, 10)),
                    );
                }}
                selectedValues={filters.convocatory?.map((x) => x.toString())}
                onClear={() => {
                    setFilter('convocatory', []);
                }}
            />

            <AdminTableFilter
                title="Filtrar por colegio"
                options={colleges.map((college) => {
                    return {
                        value: college.id,
                        label: college.name,
                    };
                })}
                onSelect={(values) => {
                    setFilter(
                        'college',
                        values.map((x) => parseInt(x, 10)),
                    );
                }}
                selectedValues={filters.college?.map((x) => x.toString())}
                onClear={() => {
                    setFilter('college', []);
                }}
            />
        </div>
    );
};

const Wrapper = ({ children }: PropsWithChildren) => {
    return (
        <DashboardContentSafeSpace>
            <div className="mb-4 flex items-center justify-between">
                <TypographyAdminH1>Becas</TypographyAdminH1>
            </div>

            {children}
        </DashboardContentSafeSpace>
    );
};

export const AdminScholarshipsTableContainer = () => {
    const scholarshipUserFilters = useScholarshipsFilters();
    const { filters } = scholarshipUserFilters;

    const [queryToSearch, setQueryToSearch] = useState<string | null>(null);

    const [ref, inView] = useInView();

    const query = useAdminScholarshipsTableInfiniteQuery({
        query: queryToSearch && queryToSearch.length > 3 ? queryToSearch : null,
        collegeIDs: filters.college || null,
        convocatoryIDs: filters.convocatory || null,
        statuses: (filters.status as any) || null,
    });
    const filterOptionsQuery = useAdminScholarshipsTableFilterOptionsQuery();

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

    if (query.isPending || filterOptionsQuery.isPending) {
        return (
            <Wrapper>
                <Filters {...scholarshipUserFilters} queryResult={filterOptionsQuery} />

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

    if (query.isError || filterOptionsQuery.isError) {
        return (
            <Wrapper>
                <Filters {...scholarshipUserFilters} queryResult={filterOptionsQuery} />

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
            <Filters {...scholarshipUserFilters} queryResult={filterOptionsQuery} />

            <AdminTableWrapper>
                <ScholarshipsTable
                    convocatories={filterOptionsQuery.data.convocatories}
                    colleges={filterOptionsQuery.data.colleges}
                    data={query.data.pages
                        .map((page) => page.scholarships.edges.map((edge) => edge!.node))
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
