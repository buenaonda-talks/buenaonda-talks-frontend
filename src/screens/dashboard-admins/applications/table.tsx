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
    useAdminApplicationsTableFilterOptionsQuery,
    useAdminApplicationsTableInfiniteQuery,
} from './query';
import { Skeleton } from '@/components/ui/skeleton';
import {
    AdminTableError,
    AdminTableInifiteQueryLoader,
    AdminTableWrapper,
} from '../shared/table';
import {
    AdminApplicationsTableFilterOptionsQuery,
    AdminApplicationsTableQuery,
    ApplicationStatus,
} from '@/api/graphql';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Input } from '@/components/ui/input';

import throttle from 'lodash/throttle';
import { AdminTableFilter } from '../shared/table-filter';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import routesBuilder from '@/lib/routes';
import { useUrlFilters } from '@/hooks/useUrlFilters';

type Application = NonNullable<
    AdminApplicationsTableQuery['applications']['edges'][number]
>['node'];

type CellContext<TData extends Application, TValue> = TanCellContext<TData, TValue> & {
    convocatories: AdminApplicationsTableFilterOptionsQuery['convocatories'];
    colleges: AdminApplicationsTableFilterOptionsQuery['colleges'];
};

const columnHelper = createColumnHelper<Application>();
const columns = [
    columnHelper.accessor('id', {
        header: 'Estudiante',
        cell: (props) => {
            const application = props.row.original;
            const { firstName, lastName, email } = application.user;

            return (
                <Link
                    href={routesBuilder.applicationById(application.id)}
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
            const application = props.row.original;
            const { phoneCode, phoneNumber } = application.user;

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

            const context = props as CellContext<Application, string | null>;
            const college = context.colleges.find((college) => college.id === value);

            return <div>{college?.name || '-'}</div>;
        },
    }),
    columnHelper.accessor('formId', {
        header: 'Convocatoria',
        cell: (props) => {
            const formId = props.getValue();
            const context = props as CellContext<Application, string>;
            const convocatory = context.convocatories.find(
                (convocatory) => convocatory.form?.id === formId,
            );

            return <div>{convocatory?.privateLabel || '-'}</div>;
        },
    }),
    columnHelper.accessor('currentStatus.status', {
        header: 'Estado',
        cell: (props) => {
            const value = props.getValue();

            if (value === ApplicationStatus.Accepted) {
                return (
                    <Badge variant="outline" className="space-x-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
                        <span>Aceptado</span>
                    </Badge>
                );
            }

            if (value === ApplicationStatus.AcceptedTerms) {
                return (
                    <Badge variant="outline" className="space-x-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-600"></span>
                        <span>Aceptó términos</span>
                    </Badge>
                );
            }

            if (value === ApplicationStatus.Declined) {
                return (
                    <Badge variant="outline" className="space-x-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                        <span>Rechazado</span>
                    </Badge>
                );
            }

            if (value === ApplicationStatus.DeclinedTerms) {
                return (
                    <Badge variant="outline" className="space-x-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                        <span>Rechazó términos</span>
                    </Badge>
                );
            }

            if (value === ApplicationStatus.TermsUnanswered) {
                return (
                    <Badge variant="outline" className="space-x-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                        <span>Términos sin responder</span>
                    </Badge>
                );
            }

            if (value === ApplicationStatus.Pending) {
                return (
                    <Badge variant="outline" className="space-x-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                        <span>Pendiente</span>
                    </Badge>
                );
            }

            if (value === ApplicationStatus.Submitted) {
                return (
                    <Badge variant="outline" className="space-x-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                        <span>Nueva</span>
                    </Badge>
                );
            }

            return <div>{value}</div>;
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
    data: Application[];
    convocatories: AdminApplicationsTableFilterOptionsQuery['convocatories'];
    colleges: AdminApplicationsTableFilterOptionsQuery['colleges'];
};

const ApplicationsTable = ({ data, convocatories, colleges }: TableProps) => {
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

const useApplicationsFilters = () => {
    return useUrlFilters({
        query: { type: 'string' },
        status: { type: 'multiple-string' },
        convocatory: { type: 'multiple-int' },
        college: { type: 'multiple-int' },
    });
};

type FiltersProps = ReturnType<typeof useApplicationsFilters> & {
    queryResult: ReturnType<typeof useAdminApplicationsTableFilterOptionsQuery>;
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
                        value: ApplicationStatus.Accepted,
                        label: 'Aceptado',
                    },
                    {
                        value: ApplicationStatus.AcceptedTerms,
                        label: 'Aceptó términos',
                    },
                    {
                        value: ApplicationStatus.Declined,
                        label: 'Rechazado',
                    },
                    {
                        value: ApplicationStatus.DeclinedTerms,
                        label: 'Rechazó términos',
                    },
                    {
                        value: ApplicationStatus.TermsUnanswered,
                        label: 'Términos sin responder',
                    },
                    {
                        value: ApplicationStatus.Pending,
                        label: 'Pendiente',
                    },
                    {
                        value: ApplicationStatus.Submitted,
                        label: 'Nueva',
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
        <div className="px-6 pb-8 pt-6">
            <div className="mb-4 flex items-center justify-between">
                <TypographyAdminH1>Postulaciones</TypographyAdminH1>
            </div>

            {children}
        </div>
    );
};

export const AdminApplicationsTableContainer = () => {
    const applicationFilters = useApplicationsFilters();
    const { filters } = applicationFilters;

    const [queryToSearch, setQueryToSearch] = useState<string | null>(null);

    const [ref, inView] = useInView();

    const query = useAdminApplicationsTableInfiniteQuery({
        query: queryToSearch && queryToSearch.length > 3 ? queryToSearch : null,
        collegeIDs: filters.college || null,
        convocatoryIDs: filters.convocatory || null,
        statuses: (filters.status as any) || null,
    });
    const filterOptionsQuery = useAdminApplicationsTableFilterOptionsQuery();

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
                <Filters {...applicationFilters} queryResult={filterOptionsQuery} />

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
                <Filters {...applicationFilters} queryResult={filterOptionsQuery} />

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
            <Filters {...applicationFilters} queryResult={filterOptionsQuery} />

            <AdminTableWrapper>
                <ApplicationsTable
                    convocatories={filterOptionsQuery.data.convocatories}
                    colleges={filterOptionsQuery.data.colleges}
                    data={query.data.pages
                        .map((page) => page.applications.edges.map((edge) => edge!.node))
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
