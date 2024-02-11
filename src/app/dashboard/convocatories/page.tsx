import { AdminConvocatoriesTable } from '@/screens/dashboard-admins/convocatories/table';
import { AdminsLayout } from '@/screens/dashboard-admins/shared/layout';

const Page = () => {
    return (
        <AdminsLayout>
            <AdminConvocatoriesTable />
        </AdminsLayout>
    );
};

export default Page;
