import { fetchUserServer } from '@/api/query/fetch-user-server';
import { DashboardAdminsPageContent } from '@/screens/dashboard/admin/dashboard';
import { AdminsLayout } from '@/screens/dashboard/admin/shared/layout';
import { DashboardStudentsHome } from '@/screens/dashboard/student/dashboard';
import { StudentsLayout } from '@/screens/dashboard/student/shared/layout';
import { TeacherLayout } from '@/screens/dashboard/teacher/shared/layout';
import { DashboardCreateProfile } from './create-profile';
import { TeacherStudentsTableContainer } from '@/screens/dashboard/teacher/dashboard/table';

const Page = async () => {
    const user = await fetchUserServer();

    if (user?.user?.isAdmin) {
        return (
            <AdminsLayout>
                <DashboardAdminsPageContent />
            </AdminsLayout>
        );
    }

    if (user?.user?.isStudent) {
        return (
            <StudentsLayout>
                <DashboardStudentsHome />
            </StudentsLayout>
        );
    }

    if (user?.user?.isTeacher) {
        return (
            <TeacherLayout>
                <TeacherStudentsTableContainer />
            </TeacherLayout>
        );
    }

    return <DashboardCreateProfile />;
};

export default Page;
