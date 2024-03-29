import { AdminLayout } from '@/screens/dashboard/admin/shared/layout';
import { AdminTeacherDetailPage } from '@/screens/dashboard/admin/teacher-detail/page';

const Page = () => {
    return (
        <AdminLayout>
            <AdminTeacherDetailPage />
        </AdminLayout>
    );
};

export default Page;
