import { fetchUserServer } from '@/api/query/fetch-user-server';
import { TeacherLayout } from '@/screens/dashboard/teacher/shared/layout';
import { DashboardErrorScreen } from '@/screens/dashboard/shared/dashboard-error-screen';
import { TeacherUpcomingTalk } from '@/screens/dashboard/teacher/upcoming-talk';

const Page = async () => {
    const user = await fetchUserServer();

    if (user?.user?.isTeacher) {
        return (
            <TeacherLayout>
                <TeacherUpcomingTalk />
            </TeacherLayout>
        );
    }

    return <DashboardErrorScreen />;
};

export default Page;
