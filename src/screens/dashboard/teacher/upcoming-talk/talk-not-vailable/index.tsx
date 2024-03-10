import { DashboardContentSafeSpace } from '@/screens/dashboard/shared/dashboard-content-safe-space';

export const TeacherNoTalkAvailable: React.FC = () => {
    return (
        <DashboardContentSafeSpace containerClassName="flex 2xl:min-h-screen flex-col justify-center items-center text-center">
            <h1 className="text-3xl font-semibold">Charla</h1>

            <div className="text-muted-foreground">
                Aún no hay ninguna charla disponible
            </div>
        </DashboardContentSafeSpace>
    );
};
