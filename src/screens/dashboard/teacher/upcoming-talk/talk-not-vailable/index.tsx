export const TeacherNoTalkAvailable: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
                <div className="font-semibold">Charla</div>
            </div>

            <div className="text-sm text-muted-foreground">
                No hay ninguna charla disponible
            </div>
        </div>
    );
};
