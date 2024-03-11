'use client';

import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { fetchClient } from '@/api/fetch-client';
import {
    AdminStatsDocument,
    AdminStatsQuery,
    ScholarshipConvocatoryKind,
} from '@/api/graphql';
import { useQuery } from '@tanstack/react-query';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import FetchedDataRenderer from '@/components/fetched-data-renderer';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardAdminsChart } from './chart';
import dayjs from 'dayjs';
import { Combobox } from '@/components/combobox';
import { useAuth } from '@clerk/nextjs';

type AdminStatsItem = AdminStatsQuery['adminStats']['stats'][0];

const columnHelper = createColumnHelper<AdminStatsItem>();

const areTalkAssistansOkInTheBackend = (convocatoryLabel: string) => {
    return [
        'G-23',
        '2023 Abril',
        '2023 Junio',
        '2023 Noviembre',
        '2023 Noviembre (Kodea)',
        '2023 Septiembre',
        '2023 Abril (Repechaje)',
        '2023 Septiembre (Repechaje)',
        '2024 Enero',
        '2023 Enero',
    ].includes(convocatoryLabel);
};

const getNormalizedTalkAssistants = (item: AdminStatsItem) => {
    if (item.convocatory.privateLabel === 'Hasta G-21') {
        return {
            assistants: 701,
            isNormalized: true,
        };
    }

    if (areTalkAssistansOkInTheBackend(item.convocatory.privateLabel)) {
        return {
            assistants: item.talkAssistants,
            isNormalized: false,
        };
    }

    return {
        assistants: Math.round((item.addedStudents / 100) * 57),
        isNormalized: true,
    };
};

const columns = [
    columnHelper.group({
        id: 'general-info-group',
        header: 'Información general',
        columns: [
            columnHelper.accessor((props) => props, {
                id: 'convocatory',
                header: 'Cohorte',
                cell: (props) => {
                    const value: AdminStatsItem = props.getValue();
                    const convocatory = value.convocatory;

                    if (
                        convocatory.countAddingsFromDate &&
                        convocatory.countAddingsTillDate
                    ) {
                        return (
                            <div className="whitespace-nowrap">
                                <p className="font-bold">{convocatory.privateLabel}</p>

                                <p className="text-sm">
                                    Período:{' '}
                                    <span className="text-gray-500">
                                        {dayjs(convocatory.countAddingsFromDate).format(
                                            'DD/MM/YYYY',
                                        )}{' '}
                                        -{' '}
                                        {dayjs(convocatory.countAddingsTillDate).format(
                                            'DD/MM/YYYY',
                                        )}
                                    </span>
                                </p>

                                {convocatory.talk && (
                                    <p className="text-sm">
                                        Fecha de charla:{' '}
                                        <span className="text-gray-500">
                                            {dayjs(convocatory.talk.startDate).format(
                                                'DD/MM/YYYY',
                                            )}
                                        </span>
                                    </p>
                                )}

                                {convocatory.lessonsStartDate && (
                                    <p className="text-sm">
                                        Inicio de clases:{' '}
                                        <span className="text-gray-500">
                                            {convocatory.lessonsStartDate}
                                        </span>
                                    </p>
                                )}
                            </div>
                        );
                    }

                    return (
                        <div className="whitespace-nowrap">
                            <p className="font-bold">{convocatory.privateLabel}</p>

                            <p className="text-sm">No tiene charla</p>

                            {convocatory.lessonsStartDate && (
                                <p className="text-sm">
                                    Inicio de clases:{' '}
                                    <span className="text-gray-500">
                                        {convocatory.lessonsStartDate}
                                    </span>
                                </p>
                            )}
                        </div>
                    );
                },
            }),
            columnHelper.accessor((props) => props.convocatory.kind, {
                id: 'convocatory-kind',
                header: 'Tipo',
                cell: (props) => {
                    const value = props.getValue();

                    if (value === ScholarshipConvocatoryKind.Platzi) {
                        return <Badge variant={'success'}>Platzi</Badge>;
                    }

                    return <Badge variant={'secondary'}>Dev.F</Badge>;
                },
            }),
        ],
    }),
    columnHelper.group({
        id: 'students-group',
        header: 'Estudiantes',
        columns: [
            columnHelper.accessor((props) => props, {
                id: 'added-students',
                header: 'añadidos',
                cell: (props) => {
                    const value: AdminStatsItem = props.getValue();

                    if (
                        value.convocatory.countAddingsFromDate &&
                        value.convocatory.countAddingsTillDate
                    ) {
                        return value.addedStudents;
                    }

                    return '-';
                },
            }),
            columnHelper.accessor((props) => props, {
                id: 'signed-up-students',
                header: 'registrados',
                cell: (props) => {
                    const value: AdminStatsItem = props.getValue();
                    if (value.addedStudents === 0) {
                        return value.signedUpStudents || '-';
                    }

                    return value.signedUpStudents;
                },
            }),
            columnHelper.accessor((props) => props, {
                id: 'talk-inscriptions',
                header: 'inscriptos a charla',
                cell: (props) => {
                    const value: AdminStatsItem = props.getValue();
                    if (value.addedStudents === 0) {
                        return value.talkInscriptions || '-';
                    }

                    return value.talkInscriptions;
                },
            }),
            columnHelper.accessor((props) => props, {
                id: 'talk-assistants',
                header: 'asistentes a charla',
                cell: (props) => {
                    const value: AdminStatsItem = props.getValue();
                    // if (value.addedStudents === 0) {
                    //     return value.talkAssistants || '-';
                    // }

                    // return value.talkAssistants;

                    if (
                        !value.convocatory.talk &&
                        !['G-22', 'Hasta G-21'].includes(value.convocatory.privateLabel)
                    ) {
                        return '-';
                    }

                    if (areTalkAssistansOkInTheBackend(value.convocatory.privateLabel)) {
                        return value.talkAssistants;
                    }

                    const { assistants, isNormalized } =
                        getNormalizedTalkAssistants(value);

                    if (isNormalized) {
                        return `${assistants} (estimado)`;
                    }

                    return assistants;
                },
            }),
        ],
    }),
    columnHelper.group({
        id: 'postulations-group',
        header: 'Postulaciones',
        columns: [
            columnHelper.accessor((props) => props, {
                id: 'postulation-submissions',
                header: 'Total',
                cell: (props) => {
                    const item: AdminStatsItem = props.getValue();
                    const rejectedCount = item.postulationSubmissionsRejected.reduce(
                        (acc, next) => next.count + acc,
                        0,
                    );
                    const pendingCount = item.postulationSubmissionsPending.reduce(
                        (acc, next) => next.count + acc,
                        0,
                    );

                    return (
                        <div className="flex items-center space-x-2">
                            <p>{item.postulationSubmissions}</p>

                            {item.postulationSubmissions !==
                                item.postulationSubmissionsAccepted && (
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <svg
                                            className="hover:fill-dark fill-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="16"
                                            width="16"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                        </svg>
                                    </HoverCardTrigger>

                                    <HoverCardContent>
                                        <div className="max-h-[12rem] overflow-y-scroll">
                                            <p className="mb-2">
                                                {item.postulationSubmissions}{' '}
                                                postulaciones
                                            </p>

                                            <ul className="list-disc pl-4 text-slate-500">
                                                <li>
                                                    {item.postulationSubmissionsAccepted}{' '}
                                                    aceptadas
                                                </li>
                                                <li>
                                                    <p>{rejectedCount} rechazadas</p>

                                                    {rejectedCount > 0 && (
                                                        <ul className="list-disc pl-4">
                                                            {item.postulationSubmissionsRejected.map(
                                                                (rejected, index) => (
                                                                    <li key={index}>
                                                                        {rejected.count}:{' '}
                                                                        <em>
                                                                            {' '}
                                                                            {
                                                                                rejected.reason
                                                                            }
                                                                        </em>
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    )}
                                                </li>
                                                <li>
                                                    <p>{pendingCount} pendientes</p>

                                                    {pendingCount > 0 && (
                                                        <ul className="list-disc pl-4">
                                                            {item.postulationSubmissionsPending.map(
                                                                (pending, index) => (
                                                                    <li key={index}>
                                                                        {pending.count}:{' '}
                                                                        <em>
                                                                            {
                                                                                pending.reason
                                                                            }
                                                                        </em>
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            )}
                        </div>
                    );
                },
            }),
            columnHelper.accessor((props) => props, {
                id: 'postulation-submissions-accepted',
                header: 'Aceptadas',
                cell: (props) => {
                    const item: AdminStatsItem = props.getValue();
                    let unansweredTermsCount = 0;

                    if (
                        item.postulationSubmissionsAccepted -
                            item.postulationSubmissionsAcceptedTerms -
                            item.postulationSubmissionsRejectedTerms >
                        0
                    ) {
                        unansweredTermsCount =
                            item.postulationSubmissionsAccepted -
                            item.postulationSubmissionsAcceptedTerms -
                            item.postulationSubmissionsRejectedTerms;
                    }

                    if (item.postulationSubmissionsAccepted === 0) {
                        return '-';
                    }

                    return (
                        <div className="flex items-center space-x-2">
                            <p>{item.postulationSubmissionsAccepted}</p>

                            {item.postulationSubmissionsAccepted !==
                                item.postulationSubmissionsAcceptedTerms && (
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <svg
                                            className="hover:fill-dark fill-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="16"
                                            width="16"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                        </svg>
                                    </HoverCardTrigger>

                                    <HoverCardContent>
                                        <div className="max-h-[12rem] overflow-y-scroll">
                                            <p className="mb-2">
                                                {item.postulationSubmissionsAccepted}{' '}
                                                postulaciones aceptadas
                                            </p>

                                            <ul className="list-disc pl-4 text-slate-500">
                                                <li>
                                                    {
                                                        item.postulationSubmissionsAcceptedTerms
                                                    }{' '}
                                                    aceptaron términos
                                                </li>
                                                <li>
                                                    <p>
                                                        {
                                                            item.postulationSubmissionsRejectedTerms
                                                        }{' '}
                                                        rechazaron términos
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        {unansweredTermsCount} no
                                                        contestaron
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            )}
                        </div>
                    );
                },
            }),
            columnHelper.accessor((props) => props, {
                id: 'postulation-submissions-accepted-terms',
                header: 'Aceptaron términos',
                cell: (props) => {
                    const item: AdminStatsItem = props.getValue();
                    if (item.postulationSubmissionsAccepted === 0) {
                        return '-';
                    }

                    return item.postulationSubmissionsAcceptedTerms;
                },
            }),
        ],
    }),
    columnHelper.group({
        id: 'scholarships-group',
        header: 'Becas',
        columns: [
            columnHelper.accessor((props) => props, {
                id: 'scholarships',
                header: 'Total',
                cell: (props) => {
                    const item: AdminStatsItem = props.getValue();
                    const sources = item.scholarshipsByConvocatorySource;
                    const totalFromSources = sources.reduce(
                        (acc, next) => next.scholarships + acc,
                        0,
                    );

                    if (item.scholarships === 0) {
                        return '-';
                    }

                    return (
                        <div className="flex items-center space-x-2">
                            <p>{item.scholarships}</p>

                            {sources.length > 0 && (
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <svg
                                            className="hover:fill-dark fill-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="16"
                                            width="16"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                        </svg>
                                    </HoverCardTrigger>

                                    <HoverCardContent>
                                        <p className="mb-2">{item.scholarships} becas</p>

                                        <p className="text-slate-500">
                                            Los estudiantes de Platzi vienen de:
                                        </p>

                                        <ul className="list-disc pl-4 text-slate-500">
                                            {sources
                                                .sort((a, b) => {
                                                    return (
                                                        b.scholarships - a.scholarships
                                                    );
                                                })
                                                .map((source, index) => (
                                                    <li key={index}>
                                                        {source.convocatory.privateLabel}:{' '}
                                                        {source.scholarships}
                                                    </li>
                                                ))}

                                            {totalFromSources !== item.scholarships && (
                                                <li>
                                                    {item.scholarships - totalFromSources}
                                                    : Desconocido
                                                </li>
                                            )}
                                        </ul>
                                    </HoverCardContent>
                                </HoverCard>
                            )}
                        </div>
                    );
                },
            }),
            columnHelper.accessor((props) => props, {
                id: 'scholarships-withdrawn',
                header: 'Retiradas',
                cell: (props) => {
                    const item: AdminStatsItem = props.getValue();
                    return item.scholarshipsWithdrawn || '-';
                },
            }),
            columnHelper.accessor((props) => props, {
                id: 'scholarships-studying',
                header: 'Cursando',
                cell: (props) => {
                    const item: AdminStatsItem = props.getValue();
                    return item.scholarshipsStudying || '-';
                },
            }),
            columnHelper.accessor((props) => props, {
                id: 'scholarships-finished',
                header: 'Finalizadas',
                cell: (props) => {
                    const item: AdminStatsItem = props.getValue();
                    return item.scholarshipsFinished || '-';
                },
            }),
        ],
    }),
];

interface DataTableRow {
    columns: typeof columns;
    data: AdminStatsItem[];
}

export function DataTable({ columns, data }: DataTableRow) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        className={clsx(
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
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

type FormValues = {
    convocatory: string | null | undefined;
};

export const DashboardAdminsPageContent: React.FC = () => {
    const form = useForm<FormValues>();
    const convocatory = form.watch('convocatory') || null;

    const { getToken } = useAuth();

    const queryResult = useQuery({
        queryKey: ['admins-stats', { convocatory }],
        queryFn: () =>
            fetchClient(
                AdminStatsDocument,
                {
                    convocatory: convocatory ? parseInt(convocatory as string, 10) : null,
                },
                {
                    getToken,
                },
            ),
    });

    return (
        <FetchedDataRenderer
            {...queryResult}
            Loading={
                <div className="p-6">
                    <h1 className="mb-4 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                        Dashboard
                    </h1>

                    <Skeleton className="h-[300px]" />
                </div>
            }
            Error={<p>Error</p>}
        >
            {({ adminStats, convocatories }) => {
                const data: AdminStatsItem[] = adminStats.stats.sort((a, b) => {
                    return b.convocatory.order - a.convocatory.order;
                });

                const devfScholarshipsNumber = adminStats.stats
                    .filter((stat) => {
                        return stat.convocatory.kind === ScholarshipConvocatoryKind.Devf;
                    })
                    .reduce((acc, next) => {
                        return acc + next.scholarships;
                    }, 0);

                return (
                    <div className="flex h-screen min-w-0 flex-col overflow-hidden">
                        <div className="border-b border-gray-200 py-4 shadow-sm xl:pl-6">
                            <div className="container flex space-x-4 xl:mx-0 xl:max-w-full xl:px-0">
                                <Label className="font-bold">Filtros:</Label>

                                <Form {...form}>
                                    <FormField
                                        control={form.control}
                                        name="convocatory"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block">
                                                    Cohorte
                                                </FormLabel>
                                                <Combobox
                                                    {...field}
                                                    placeholder="Cohorte"
                                                    options={convocatories
                                                        .sort((a, b) => {
                                                            return b.order - a.order;
                                                        })
                                                        .map((convocatory) => {
                                                            return {
                                                                key: convocatory.id,
                                                                value: convocatory.id,
                                                                label: convocatory.privateLabel,
                                                            };
                                                        })}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                </Form>
                            </div>
                        </div>

                        <div className="min-w-0 flex-1 overflow-y-scroll px-6 pb-12 pt-6">
                            <Alert className="mb-4">
                                <AlertTitle>¡Información sobre los datos!</AlertTitle>
                                <AlertDescription>
                                    Actualmente el Dashboard presenta datos en su forma
                                    agregada. En el futuro, está considerado poder acceder
                                    desde cada dato que represente a personas a la lista
                                    de esas personas.
                                </AlertDescription>
                            </Alert>

                            <h1 className="mb-4 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                                Dashboard
                            </h1>

                            <div className="mb-4">
                                <h2 className="mb-4 text-xl font-bold">
                                    Información general
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Estudiantes
                                            </CardTitle>

                                            <HoverCard>
                                                <HoverCardTrigger>
                                                    <svg
                                                        className="hover:fill-dark fill-gray-500"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="16"
                                                        width="16"
                                                        viewBox="0 0 512 512"
                                                    >
                                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                                    </svg>
                                                </HoverCardTrigger>

                                                <HoverCardContent className="text-sm">
                                                    {typeof convocatory === 'string' ? (
                                                        <p>
                                                            Este número incluye a los
                                                            estudiantes que se añadieron a
                                                            la plataforma y/o se
                                                            registraron en el período de
                                                            la cohorte.
                                                        </p>
                                                    ) : (
                                                        <p>
                                                            Este número incluye a los
                                                            estudiantes que se añadieron a
                                                            la plataforma y/o se
                                                            registraron en algún período
                                                            de alguna cohorte.
                                                        </p>
                                                    )}
                                                </HoverCardContent>
                                            </HoverCard>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {adminStats.studentsCount}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Asistencias a charlas
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {adminStats.stats.reduce((acc, next) => {
                                                    const { assistants } =
                                                        getNormalizedTalkAssistants(next);

                                                    return acc + assistants;
                                                }, 0)}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Postulaciones
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {adminStats.postulationSubmissionsCount}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Becas
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {adminStats.scholarshipsCount}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h2 className="mb-4 text-xl font-bold">
                                    Estadísticas Platzi
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Becas
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {adminStats.stats
                                                    .filter((stat) => {
                                                        return (
                                                            stat.convocatory.kind ===
                                                            ScholarshipConvocatoryKind.Platzi
                                                        );
                                                    })
                                                    .reduce((acc, next) => {
                                                        return acc + next.scholarships;
                                                    }, 0)}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Becas cursando
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">69</div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Becas finalizadas
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {adminStats.stats
                                                    .filter((stat) => {
                                                        return (
                                                            stat.convocatory.kind ===
                                                            ScholarshipConvocatoryKind.Platzi
                                                        );
                                                    })
                                                    .reduce((acc, next) => {
                                                        return (
                                                            acc +
                                                            next.scholarshipsFinished
                                                        );
                                                    }, 0)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h2 className="mb-4 text-xl font-bold">
                                    Estadísticas DEV.F
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Becas
                                            </CardTitle>
                                            <CardDescription className="text-sm">
                                                {300 - devfScholarshipsNumber} de 300
                                                disponibles
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold">
                                                {devfScholarshipsNumber}
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Becas cursando
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">16</div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Becas finalizadas
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold">
                                                Entre 29 y 31
                                            </p>
                                            <small className="text-sm text-muted-foreground">
                                                A confirmar por DEV.F
                                            </small>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Becas abandonadas
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold">
                                                Entre 190 y 192
                                            </p>

                                            <small className="text-sm text-muted-foreground">
                                                A confirmar por DEV.F
                                            </small>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div>
                                <DashboardAdminsChart />

                                <div className="flex flex-col justify-start">
                                    <h2 className="mb-4 text-xl font-bold">
                                        Estadísticas por cohorte
                                    </h2>

                                    <DataTable columns={columns} data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </FetchedDataRenderer>
    );
};
