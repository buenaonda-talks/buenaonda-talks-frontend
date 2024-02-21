'use client';

import { AdminTalksTableQuery } from '@/api/graphql';
import { TypographyAdminH1 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { useAdminTalksTableQuery } from './query';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminTableError } from '../shared/table';

type Talk = AdminTalksTableQuery['talks'][0];

const columnHelper = createColumnHelper<Talk>();

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: (props) => {
            const value = props.getValue();

            return (
                <Button asChild variant="link">
                    <Link href={`/dashboard/talks/${value}/edit`}>{value}</Link>
                </Button>
            );
        },
    }),
    columnHelper.accessor('internalLabel', {
        header: 'Título interno',
    }),
    columnHelper.accessor('isVisible', {
        header: 'Es visible',
    }),
    columnHelper.accessor('startDate', {
        header: 'Fecha de inicio',
    }),
    columnHelper.accessor('endDate', {
        header: 'Fecha de fin',
    }),
];

type TableProps = {
    data: Talk[];
};

const MyTable = ({ data }: TableProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <Table className="w-full overflow-x-scroll">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        className={cn(
                                            header.headerGroup.depth === 0 &&
                                                'border-b border-r text-center font-bold last:border-0',
                                            'whitespace-nowrap',
                                        )}
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
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
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No hay datos
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export const AdminTalksTable = () => {
    const query = useAdminTalksTableQuery();

    if (query.isPending) {
        return (
            <div className="px-6 pb-8 pt-6">
                <div className="mb-4 flex items-center justify-between">
                    <TypographyAdminH1>Charlas</TypographyAdminH1>

                    <Button asChild>
                        <Link href="/dashboard/talks/create">Crear charla</Link>
                    </Button>
                </div>

                <div className="rounded-md border">
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
                </div>
            </div>
        );
    }

    if (query.isError) {
        return (
            <div className="px-6 pb-8 pt-6">
                <div className="mb-4 flex items-center justify-between">
                    <TypographyAdminH1>Charlas</TypographyAdminH1>

                    <Button asChild>
                        <Link href="/dashboard/talks/create">Crear charla</Link>
                    </Button>
                </div>

                <div className="rounded-md border">
                    <AdminTableError
                        heads={columns.map((col) => {
                            return (
                                <TableHead key={col.id}>{col.header as string}</TableHead>
                            );
                        })}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 pb-8 pt-6">
            <div className="mb-4 flex items-center justify-between">
                <TypographyAdminH1>Charlas ({query.data.talks.length})</TypographyAdminH1>

                <Button asChild>
                    <Link href="/dashboard/talks/create">Crear charla</Link>
                </Button>
            </div>

            <MyTable data={query.data.talks} />
        </div>
    );
};
