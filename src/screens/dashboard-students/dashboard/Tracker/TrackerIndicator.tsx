import clsx from 'clsx';

type TrackerIndicatorProps = {
    isActive?: boolean;
    onClick: () => void;
};

const TrackerIndicator: React.FC<TrackerIndicatorProps> = ({ isActive, onClick }) => (
    <button
        className={clsx(
            'h-5 w-5 rounded-full border-2 p-0.5',
            isActive ? 'border-[#430AA4]' : 'border-transparent',
        )}
        onClick={onClick}
        type="button"
    >
        <span
            className={clsx(
                'block h-3 w-3 rounded-full',
                isActive ? 'bg-[#430AA4]' : 'border-2 border-[#430AA4]',
            )}
        ></span>
    </button>
);

export default TrackerIndicator;
