import { AdminConvocatoriesTable } from '@/screens/dashboard/admin/convocatories/table';
import { AdminLayout } from '@/screens/dashboard/admin/shared/layout';

const Page = () => {
    return (
        <AdminLayout>
            <AdminConvocatoriesTable />
        </AdminLayout>
    );
};

export default Page;
