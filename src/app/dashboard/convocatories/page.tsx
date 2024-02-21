import { AdminConvocatoriesTable } from '@/screens/dashboard/admin/convocatories/table';
import { AdminsLayout } from '@/screens/dashboard/admin/shared/layout';

const Page = () => {
    return (
        <AdminsLayout>
            <AdminConvocatoriesTable />
        </AdminsLayout>
    );
};

export default Page;
