import { ConvocatoryByIdTalkQuery } from '@/api/graphql';

export const convocatoryTalkToTalkBuilder = (
    talk: NonNullable<NonNullable<ConvocatoryByIdTalkQuery['convocatoryById']>['talk']>,
) => {
    const talkStartDate = talk.startDate ? new Date(talk.startDate) : null;
    const talkEndDate = talk.endDate ? new Date(talk.endDate) : null;

    return {
        description:
            talk.description ||
            `Acompañanos en la charla junto a Daniel Undurraga, emprendedor tecnológico chileno que creó una app que hoy usan millones de personas y que fue comprada por Uber el año pasado. Es todo un referente a nivel mundial.

¡El primer paso para obtener tu beca!`,
        speakers: talk.speakers,
        zoomId: talk.zoomId,
        zoomRegisterUrl: talk.zoomRegisterUrl,
        startDatetime: talkStartDate,
        endDatetime: talkEndDate,
    };
};
