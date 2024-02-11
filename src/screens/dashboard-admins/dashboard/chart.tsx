'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/api/fetch-client';
import { useForm } from 'react-hook-form';
import FetchedDataRenderer from '@/components/fetched-data-renderer';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { Combobox } from '@/components/combobox';
import {
    AdminStudentsCountByDateDocument,
    AdminStudentsCountByDateQuery,
} from '@/api/graphql';
import { useAuth } from '@clerk/nextjs';

type FormValues = {
    dateRange: (typeof OPTIONS)[number]['key'];
};

const OPTIONS = [
    {
        label: 'Los últimos 7 días',
        key: 'last-7-days',
        value: {
            from: dayjs().subtract(7, 'day').startOf('day').format('YYYY-MM-DD'),
            to: dayjs().endOf('day').format('YYYY-MM-DD'),
        },
    },
    {
        label: 'Los últimos 14 días',
        key: 'last-14-days',
        value: {
            from: dayjs().subtract(14, 'day').startOf('day').format('YYYY-MM-DD'),
            to: dayjs().endOf('day').format('YYYY-MM-DD'),
        },
    },
    {
        label: 'Los últimos 30 días',
        key: 'last-30-days',
        value: {
            from: dayjs().subtract(30, 'day').startOf('day').format('YYYY-MM-DD'),
            to: dayjs().endOf('day').format('YYYY-MM-DD'),
        },
    },
    {
        label: 'Los últimos 60 días',
        key: 'last-60-days',
        value: {
            from: dayjs().subtract(60, 'day').startOf('day').format('YYYY-MM-DD'),
            to: dayjs().endOf('day').format('YYYY-MM-DD'),
        },
    },
    {
        label: 'Los últimos 90 días',
        key: 'last-90-days',
        value: {
            from: dayjs().subtract(90, 'day').startOf('day').format('YYYY-MM-DD'),
            to: dayjs().endOf('day').format('YYYY-MM-DD'),
        },
    },
    {
        label: 'Año 2023',
        key: 'year-2023',
        value: {
            from: dayjs('2023-01-01').startOf('day').format('YYYY-MM-DD'),
            to: dayjs('2023-12-31').endOf('day').format('YYYY-MM-DD'),
        },
    },
    {
        label: 'Año 2022',
        key: 'year-2022',
        value: {
            from: dayjs('2022-01-01').startOf('day').format('YYYY-MM-DD'),
            to: dayjs('2022-12-31').endOf('day').format('YYYY-MM-DD'),
        },
    },
] as const;

const Chart = ({
    data,
}: {
    data: AdminStudentsCountByDateQuery['adminStudentsCountByDate'];
}) => {
    const allDates = data.joinedAtItems
        .map((x) => {
            return x.date;
        })
        .concat(
            data.signedUpAtItems.map((x) => {
                return x.date;
            }),
        );

    const uniqueDates = [...new Set(allDates)].sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
    });

    const chartData = uniqueDates.map((date) => {
        const joinedAt = data.joinedAtItems.find((x) => x.date === date);
        const signedUpAt = data.signedUpAtItems.find((x) => x.date === date);

        return {
            name: format(date, 'YYYY-MM-DD'),
            joinedAt: joinedAt?.count ?? 0,
            signedUpAt: signedUpAt?.count ?? 0,
        };
    });

    let interval = 1;
    if (chartData.length > 50) {
        interval = 18;
    } else if (chartData.length > 20) {
        interval = 4;
    } else if (chartData.length > 10) {
        interval = 2;
    }

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    interval={interval}
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[
                        0,
                        Math.max(
                            ...chartData.map((x) => x.joinedAt),
                            ...chartData.map((x) => x.signedUpAt),
                        ),
                    ]}
                />

                <Tooltip cursor={false} />
                <Legend
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{
                        paddingTop: '1rem',
                        fontSize: 12,
                    }}
                />
                <Line
                    name="Añadidos"
                    label="Añadidos"
                    type="monotone"
                    dataKey="joinedAt"
                    stroke="#8884d8"
                />

                <Line
                    name="Registrados"
                    label="Registrados"
                    type="monotone"
                    dataKey="signedUpAt"
                    stroke="#82ca9d"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export function DashboardAdminsChart() {
    const form = useForm<FormValues>({
        defaultValues: {
            dateRange: OPTIONS[0].key,
        },
    });
    const dateRangeKey = form.watch('dateRange');

    const { getToken } = useAuth();
    const queryResult = useQuery({
        queryKey: ['admin-students-count-by-date', { dateRange: dateRangeKey }],
        queryFn: () => {
            // default to 7 days
            const dateRange = OPTIONS.find((x) => x.key === dateRangeKey)?.value;
            const from = dateRange?.from ?? null;
            const to = dateRange?.to ?? null;

            return fetchClient(
                AdminStudentsCountByDateDocument,
                {
                    startDate: from || null,
                    endDate: to || null,
                    convocatory: null,
                },
                {
                    getToken,
                },
            );
        },
    });

    return (
        <Card className="col-span-4 mb-4">
            <CardHeader>
                <CardTitle>
                    Información filtrada por fechas{' '}
                    <span className="text-sm">(no aplica el filtro por cohorte)</span>
                </CardTitle>

                <div className="pt-4">
                    <Form {...form}>
                        <FormField<FormValues, 'dateRange'>
                            control={form.control}
                            name="dateRange"
                            render={({ field }) => {
                                const { value, ...fieldRest } = field;
                                return (
                                    <FormItem>
                                        <Combobox
                                            {...fieldRest}
                                            value={value}
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            options={OPTIONS as any}
                                            placeholder="Selecciona un rango de fechas"
                                        />
                                    </FormItem>
                                );
                            }}
                        />
                    </Form>
                </div>
            </CardHeader>

            <CardContent className="pl-2">
                <FetchedDataRenderer
                    {...queryResult}
                    Loading={
                        <>
                            <Skeleton className="h-[500px]" />
                        </>
                    }
                    Error={
                        <>
                            <p>No se pudo cargar la información.</p>
                        </>
                    }
                >
                    {(data) => {
                        return <Chart data={data.adminStudentsCountByDate} />;
                    }}
                </FetchedDataRenderer>
            </CardContent>

            <CardFooter>
                <div className="grid w-full grid-cols-4 gap-4">
                    <Card className="p-4">
                        <CardTitle className="text-base">Estudiantes añadidos</CardTitle>
                        <p>
                            <span className="text-muted-foreground">
                                {queryResult.data?.adminStudentsCountByDate.joinedAtItems.reduce(
                                    (acc, x) => acc + x.count,
                                    0,
                                )}
                            </span>{' '}
                        </p>
                    </Card>

                    <Card className="p-4">
                        <CardTitle className="text-base">
                            Estudiantes registrados
                        </CardTitle>
                        <p>
                            <span className="text-muted-foreground">
                                {queryResult.data?.adminStudentsCountByDate.signedUpAtItems.reduce(
                                    (acc, x) => acc + x.count,
                                    0,
                                )}
                            </span>{' '}
                        </p>
                    </Card>
                </div>
            </CardFooter>
        </Card>
    );
}
