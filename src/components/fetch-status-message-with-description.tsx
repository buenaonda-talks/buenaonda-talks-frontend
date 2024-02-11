type Props = {
    title: string;
    line1: string;
    line2?: string;
};

const FetchStatusMessageWithDescription: React.FC<Props> = ({ title, line1, line2 }) => {
    return (
        <div className="flex flex-1 items-center">
            <div className="w-full">
                <h2 className="mb-2 text-center font-bold">{title}</h2>

                <div className="text-center text-sm text-gray-600">
                    <p>{line1}</p>
                    {line2 && <p>{line2}</p>}
                </div>
            </div>
        </div>
    );
};

export default FetchStatusMessageWithDescription;
