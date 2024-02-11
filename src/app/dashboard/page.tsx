import { DashboardAdminsPageContent } from '@/screens/dashboard-admins/dashboard';
import { AdminsLayout } from '@/screens/dashboard-admins/shared/layout';
import { DashboardStudentsHome } from '@/screens/dashboard-students/dashboard';
import { StudentsLayout } from '@/screens/dashboard-students/shared/layout';
import { currentUser } from '@clerk/nextjs';

const Page = async () => {
    const user = await currentUser();

    if (user?.publicMetadata.roles.includes('admin')) {
        return (
            <AdminsLayout>
                <DashboardAdminsPageContent />
            </AdminsLayout>
        );
    }

    if (user?.publicMetadata.roles.includes('student')) {
        return (
            <StudentsLayout>
                <DashboardStudentsHome />
            </StudentsLayout>
        );
    }

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default Page;
