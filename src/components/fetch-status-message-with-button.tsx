import Link from 'next/link';
import { Button } from './ui/button';

type Props = {
    message: string;
    btnHref: string;
    btnText: string;
};

const FetchStatusMessageWithButton: React.FC<Props> = ({ message, btnHref, btnText }) => (
    <div className="flex flex-1 items-center">
        <div className="w-full">
            <h2 className="mb-4 text-center text-sm font-bold">{message}</h2>

            <div className="flex justify-center">
                <Button asChild variant="secondary">
                    <Link href={btnHref}>{btnText}</Link>
                </Button>
            </div>
        </div>
    </div>
);

export default FetchStatusMessageWithButton;
