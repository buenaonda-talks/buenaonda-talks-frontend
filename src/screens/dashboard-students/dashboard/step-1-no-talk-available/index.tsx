export const TrackerStep1NoTalkAvailable: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-black text-center text-xs">
                    1
                </span>

                <div className="font-semibold">Charla</div>
            </div>

            <div className="text-sm text-muted-foreground">
                No hay ninguna charla disponible
            </div>
        </div>
    );
};
