import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    number: number;
    title: string;
    isActive: boolean;
}>;

const TrackerStep: React.FC<Props> = ({ number, title, children, isActive }) => (
    <div className="flex space-x-8 font-sans">
        <div className="flex flex-col items-center">
            <span
                className={clsx(
                    'block h-5 w-5 rounded-full border-2 p-0.5',
                    isActive ? 'border-[#430AA4]' : 'border-transparent',
                )}
            >
                <span
                    className={clsx(
                        'block h-3 w-3 rounded-full',
                        isActive ? 'bg-[#430AA4]' : 'border-2 border-[#430AA4]',
                    )}
                ></span>
            </span>

            <span className="flex-1 border border-dashed border-[#430AA4]"></span>
        </div>

        <div
            className={clsx(
                'flex-1 rounded-lg border px-5 py-2',
                isActive ? 'border-[#6614EE] bg-[#6614EE] text-white' : 'border-gray-200',
            )}
        >
            <div className="flex items-center space-x-1.5">
                <span
                    className={clsx(
                        'flex h-5 w-5 items-center justify-center rounded-full border text-xs',
                        isActive ? 'border-white' : 'border-black',
                    )}
                >
                    {number}
                </span>
                <span className="font-medium">{title}</span>
            </div>

            <div className="text-sm font-light tracking-widest">{children}</div>
        </div>
    </div>
);

export default TrackerStep;
