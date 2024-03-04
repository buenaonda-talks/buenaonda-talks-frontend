import { fetchServer } from '@/api/fetch-server';
import { TeacherUpcomingTalkDocument } from '@/api/graphql';
import { TeacherNoTalkAvailable } from './talk-not-vailable';
import { TeacherTalkAvailable } from './talk-available';

const getCurrentPlatziTalk = async () => {
    try {
        const response = await fetchServer(TeacherUpcomingTalkDocument, {});
        return response.currentPlatziTalk;
    } catch (error) {
        console.error('Error getting current talk', error);
        return null;
    }
};

export const TeacherUpcomingTalk = async () => {
    const talk = await getCurrentPlatziTalk();

    if (!talk) {
        return <TeacherNoTalkAvailable />;
    }

    return <TeacherTalkAvailable talk={talk} />;
};
