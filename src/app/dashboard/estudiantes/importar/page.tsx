import { AdminLayout } from '@/screens/dashboard/admin/shared/layout';

const Page = () => {
    return (
        <AdminLayout>
            <main className="flex h-screen flex-col items-center justify-center">
                <h1 className="text-xl font-bold">
                    La función de importar estudiantes está en construcción
                </h1>

                <p className="text-sm text-muted-foreground">
                    Por favor, vuelve más tarde
                </p>
            </main>
        </AdminLayout>
    );
};

export default Page;
