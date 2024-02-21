import { useRef, useState } from 'react';
import { TrackerStepsKey } from './constants';

const useTracker = (defaultKey: TrackerStepsKey) => {
    const topElementRef = useRef<HTMLDivElement>(null);

    const [activeKey, setActiveKey] = useState(defaultKey);

    const handleKeyChange = (key: TrackerStepsKey) => {
        setActiveKey(key);

        const trackerTopElement = topElementRef.current;
        if (!trackerTopElement) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({
                top: trackerTopElement.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return {
        topElementRef,
        activeKey,
        handleKeyChange,
    };
};

export default useTracker;
