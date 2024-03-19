import { LoadingSpinner } from '@/components/loading-spinner';

const Loading = () => {
    return (
        <main>
            <div className="container">
                <div className="flex min-h-screen items-center justify-center">
                    <LoadingSpinner />
                </div>
            </div>
        </main>
    );
};

export default Loading;
