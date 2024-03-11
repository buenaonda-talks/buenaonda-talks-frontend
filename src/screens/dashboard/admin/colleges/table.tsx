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
    useAdminEducationalInstitutionsTableFilterOptionsQuery,
    useAdminEducationalInstitutionsTableInfiniteQuery,
} from './query';
import { Skeleton } from '@/components/ui/skeleton';
import {
    AdminTableError,
    AdminTableInifiteQueryLoader,
    AdminTableWrapper,
} from '../shared/table';
import {
    AdminCollegesTableFilterOptionsQuery,
    AdminCollegesTableQuery,
} from '@/api/graphql';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Input } from '@/components/ui/input';

import throttle from 'lodash/throttle';
import { AdminTableFilter } from '../shared/table-filter';
import Link from 'next/link';
import routesBuilder from '@/lib/routes';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { DashboardContentSafeSpace } from '../../shared/dashboard-content-safe-space';

type College = NonNullable<
    NonNullable<AdminCollegesTableQuery['collegesCursor']>['edges'][number]
>['node'];

type CellContext<TData extends College, TValue> = TanCellContext<TData, TValue> & {
    regions: AdminCollegesTableFilterOptionsQuery['regions'];
    communes: AdminCollegesTableFilterOptionsQuery['communes'];
};

const columnHelper = createColumnHelper<College>();
const columns = [
    columnHelper.accessor('id', {
        header: 'Colegio',
        cell: (props) => {
            const college = props.row.original;

            return (
                <Link
                    href={routesBuilder.collegeById(college.id)}
                    className="block hover:underline"
                >
                    {college.name}
                </Link>
            );
        },
        size: 333,
    }),
    columnHelper.accessor('communeId', {
        id: 'region',
        header: 'Región',
        cell: (props) => {
            const scholarship = props.row.original;
            const context = props as CellContext<College, string>;

            const commune = context.communes.find(
                (commune) => commune.id === scholarship.communeId,
            );
            const region = context.regions.find(
                (region) => region.id === commune?.regionId,
            );

            return <div>{region?.name || '-'}</div>;
        },
        size: 333,
    }),
    columnHelper.accessor('communeId', {
        id: 'commune',
        header: 'Comuna',
        cell: (props) => {
            const scholarship = props.row.original;
            const context = props as CellContext<College, string>;

            const commune = context.communes.find(
                (commune) => commune.id === scholarship.communeId,
            );

            return <div>{commune?.name || '-'}</div>;
        },
        size: 333,
    }),
];

type TableProps = {
    data: College[];
    regions: AdminCollegesTableFilterOptionsQuery['regions'];
    communes: AdminCollegesTableFilterOptionsQuery['communes'];
};

const CollegesTable = ({ data, communes, regions }: TableProps) => {
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
                                        regions,
                                        communes,
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

const useTableFilters = () => {
    return useUrlFilters({
        query: { type: 'string' },
        communes: { type: 'multiple-int' },
        regions: { type: 'multiple-int' },
    });
};

type FiltersProps = ReturnType<typeof useTableFilters> & {
    queryResult: ReturnType<
        typeof useAdminEducationalInstitutionsTableFilterOptionsQuery
    >;
};

const Filters = ({ filters, setFilter, queryResult }: FiltersProps) => {
    if (queryResult.isPending) {
        return (
            <div className="mb-4 flex space-x-2">
                <Input
                    placeholder="Buscar por nombre"
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
                    placeholder="Buscar por nombre"
                    value={filters.query || ''}
                    onChange={(e) => {
                        setFilter('query', e.target.value);
                    }}
                    className="max-w-xs"
                />
            </div>
        );
    }

    const { communes, regions } = queryResult.data;

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
                title="Filtrar por región"
                options={regions.map((region) => {
                    return {
                        value: region.id,
                        label: region.name,
                    };
                })}
                onSelect={(values) => {
                    setFilter(
                        'regions',
                        values.map((x) => parseInt(x, 10)),
                    );
                }}
                selectedValues={filters.regions?.map((x) => x.toString())}
            />

            <AdminTableFilter
                title="Filtrar por comuna"
                options={communes
                    .filter((commune) => {
                        if (filters.regions) {
                            return filters.regions.includes(parseInt(commune.regionId));
                        }

                        return true;
                    })
                    .map((commune) => {
                        return {
                            value: commune.id,
                            label: commune.name,
                        };
                    })}
                onSelect={(values) => {
                    setFilter(
                        'communes',
                        values.map((x) => parseInt(x, 10)),
                    );
                }}
                selectedValues={filters.communes?.map((x) => x.toString())}
            />
        </div>
    );
};

const Wrapper = ({ children }: PropsWithChildren) => {
    return (
        <DashboardContentSafeSpace>
            <div className="mb-4 flex items-center justify-between">
                <TypographyAdminH1>Instituciones Educativas</TypographyAdminH1>
            </div>

            {children}
        </DashboardContentSafeSpace>
    );
};

export const AdminCollegesTableContainer = () => {
    const tableFilters = useTableFilters();
    const { filters } = tableFilters;

    const [queryToSearch, setQueryToSearch] = useState<string | null>(null);

    const [ref, inView] = useInView();

    const query = useAdminEducationalInstitutionsTableInfiniteQuery({
        query: queryToSearch && queryToSearch.length > 3 ? queryToSearch : null,
        communeIDs: filters.communes || null,
        regionsIDs: filters.regions || null,
    });
    const filterOptionsQuery = useAdminEducationalInstitutionsTableFilterOptionsQuery();

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
                <Filters {...tableFilters} queryResult={filterOptionsQuery} />

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
                <Filters {...tableFilters} queryResult={filterOptionsQuery} />

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
            <Filters {...tableFilters} queryResult={filterOptionsQuery} />

            <AdminTableWrapper>
                <CollegesTable
                    communes={filterOptionsQuery.data.communes}
                    regions={filterOptionsQuery.data.regions}
                    data={query.data.pages
                        .map((page) =>
                            page.collegesCursor.edges.map((edge) => edge!.node),
                        )
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
