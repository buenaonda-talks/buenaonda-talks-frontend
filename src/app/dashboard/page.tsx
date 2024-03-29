import { fetchUserServer } from '@/api/query/fetch-user-server';
import { DashboardAdminsPageContent } from '@/screens/dashboard/admin/dashboard';
import { AdminLayout } from '@/screens/dashboard/admin/shared/layout';
import { DashboardStudentsHome } from '@/screens/dashboard/student/dashboard';
import { StudentsLayout } from '@/screens/dashboard/student/shared/layout';
import { TeacherLayout } from '@/screens/dashboard/teacher/shared/layout';
import { DashboardCreateProfile } from './create-profile';
import { TeacherStudentsTableContainer } from '@/screens/dashboard/teacher/dashboard/table';
import { DashboardErrorScreen } from '@/screens/dashboard/shared/dashboard-error-screen';

const Page = async () => {
    const user = await fetchUserServer();

    if (!user || !user.user) {
        return <DashboardErrorScreen />;
    }

    if (user.user.isAdmin) {
        return (
            <AdminLayout>
                <DashboardAdminsPageContent />
            </AdminLayout>
        );
    }

    if (user.user.isStudent) {
        return (
            <StudentsLayout>
                <DashboardStudentsHome />
            </StudentsLayout>
        );
    }

    if (user.user.isTeacher) {
        return (
            <TeacherLayout requiresVerification={true} user={user.user}>
                <TeacherStudentsTableContainer />
            </TeacherLayout>
        );
    }

    return <DashboardCreateProfile />;
};

export default Page;
