'use client';

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
import {
    SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { useAdminConvocatoriesTableQuery } from './query';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminTableError } from '../shared/table';
import { AdminConvocatoriesTableQuery } from '@/api/graphql';
import { AdminBadgeConvocatoryKind } from '../shared/badge';
import { format } from 'date-fns';
import { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Check, MoreVertical, XCircle } from 'lucide-react';
import { useDeleteConvocatory } from './mutation';
import { ButtonWithSpinner } from '@/components/button-with-spinner';
import { useToast } from '@/components/ui/use-toast';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import routesBuilder from '@/lib/routes';
import { DashboardContentSafeSpace } from '../../shared/dashboard-content-safe-space';

type Convocatory = AdminConvocatoriesTableQuery['convocatories'][0];

type ColumnActionsProps = {
    convocatory: Convocatory;
};
const ColumnActions = ({ convocatory }: ColumnActionsProps) => {
    const deleteMutation = useDeleteConvocatory();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    return (
        <TooltipProvider>
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
                        <MoreVertical className="h-5 w-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        {convocatory.form ? (
                            <CopyToClipboard
                                text={`${
                                    window.location.origin
                                }${routesBuilder.formByUUID(convocatory.form.uuid)}`}
                                onCopy={() => {
                                    toast({
                                        variant: 'default',
                                        title: 'Enlace copiado',
                                        description: 'El enlace ha sido copiado.',
                                    });
                                }}
                            >
                                <DropdownMenuItem>
                                    Copiar enlace a formulario
                                </DropdownMenuItem>
                            </CopyToClipboard>
                        ) : (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DropdownMenuItem className="opacity-50">
                                        Copiar enlace a formulario
                                    </DropdownMenuItem>
                                </TooltipTrigger>

                                <TooltipContent>
                                    <p>
                                        No se puede generar un enlace de inscripción
                                        porque no hay un formulario asociado.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        )}

                        <DropdownMenuLabel>Otros</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DialogTrigger asChild>
                            <DropdownMenuItem>Eliminar</DropdownMenuItem>
                        </DialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar eliminación</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que quieres eliminar la convocatoria &ldquo;
                            <strong>
                                <em>{convocatory.privateLabel}</em>
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
                                        id: parseInt(convocatory.id, 10),
                                    },
                                    {
                                        onSuccess: () => {
                                            toast({
                                                variant: 'default',
                                                title: 'Convocatoria eliminada',
                                                description: `La convocatoria "${convocatory.privateLabel}" ha sido eliminada.`,
                                            });

                                            setOpen(false);
                                        },
                                        onError: () => {
                                            toast({
                                                variant: 'destructive',
                                                title: 'Error',
                                                description:
                                                    'No se pudo eliminar la convocatoria.',
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
        </TooltipProvider>
    );
};

const columnHelper = createColumnHelper<Convocatory>();

const columns = [
    columnHelper.accessor('privateLabel', {
        header: 'Título interno',
        cell: (props) => {
            const value = props.getValue();
            return (
                <Link
                    className="text-blue-500 hover:underline"
                    href={routesBuilder.convocatoryById(props.row.original.id)}
                >
                    {value}
                </Link>
            );
        },
    }),
    columnHelper.accessor('kind', {
        header: 'Tipo',
        cell: (props) => {
            const value = props.getValue();
            return <AdminBadgeConvocatoryKind kind={value} />;
        },
    }),
    columnHelper.accessor('form', {
        header: 'Formulario',
        cell: (props) => {
            const value = props.getValue();
            return value ? (
                <Check className="h-5 w-5" />
            ) : (
                <XCircle className="h-5 w-5" />
            );
        },
    }),
    columnHelper.accessor('talk', {
        header: 'Charla',
        cell: (props) => {
            const value = props.getValue();
            return value ? (
                <Check className="h-5 w-5" />
            ) : (
                <XCircle className="h-5 w-5" />
            );
        },
    }),
    columnHelper.accessor('countAddingsFromDate', {
        header: 'Incluye inscripciones desde',
        cell: (props) => {
            const value = props.getValue();
            return value ? format(value, 'dd/MM/yyyy') : '-';
        },
    }),
    columnHelper.accessor('countAddingsTillDate', {
        header: 'Incluye inscripciones hasta',
        cell: (props) => {
            const value = props.getValue();
            return value ? format(value, 'dd/MM/yyyy') : '-';
        },
        sortingFn: (a, b) => {
            const aDate = a.getValue('countAddingsFromDate') as string | null;
            const bDate = b.getValue('countAddingsFromDate') as string | null;

            if (!aDate && !bDate) {
                return 0;
            }

            if (!aDate) {
                return -1;
            }

            if (!bDate) {
                return 1;
            }

            return new Date(aDate).getTime() - new Date(bDate).getTime();
        },
    }),
    columnHelper.display({
        id: 'actions',
        cell: (props) => {
            const convocatory = props.row.original;
            return <ColumnActions convocatory={convocatory} />;
        },
    }),
];

type TableProps = {
    data: Convocatory[];
};

const MyTable = ({ data }: TableProps) => {
    const [sorting, setSorting] = useState<SortingState>([
        {
            id: 'countAddingsTillDate',
            desc: true,
        },
    ]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div className="rounded-md border">
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

export const AdminConvocatoriesTable = () => {
    const query = useAdminConvocatoriesTableQuery();

    if (query.isPending) {
        return (
            <DashboardContentSafeSpace>
                <div className="mb-4 flex items-center justify-between">
                    <TypographyAdminH1>Convocatorias</TypographyAdminH1>

                    <Button asChild>
                        <Link href={routesBuilder.convocatoryCreate}>
                            Crear convocatoria
                        </Link>
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
            </DashboardContentSafeSpace>
        );
    }

    if (query.isError) {
        return (
            <DashboardContentSafeSpace>
                <div className="mb-4 flex items-center justify-between">
                    <TypographyAdminH1>Convocatorias</TypographyAdminH1>

                    <Button asChild>
                        <Link href={routesBuilder.convocatoryCreate}>
                            Crear convocatoria
                        </Link>
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
            </DashboardContentSafeSpace>
        );
    }

    return (
        <DashboardContentSafeSpace>
            <div className="mb-4 flex items-center justify-between">
                <TypographyAdminH1>
                    Convocatorias ({query.data.convocatories.length})
                </TypographyAdminH1>

                <Button asChild>
                    <Link href={routesBuilder.convocatoryCreate}>Crear convocatoria</Link>
                </Button>
            </div>

            <MyTable data={query.data.convocatories} />
        </DashboardContentSafeSpace>
    );
};
