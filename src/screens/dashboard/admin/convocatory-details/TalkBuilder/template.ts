import dayjs from 'dayjs';
import { TalkBuilderFormValues } from '.';

export const CREATE_TALK_FORM_TEMPLATE = (): TalkBuilderFormValues => ({
    description:
        'Acompañanos en la charla junto a Daniel Undurraga, emprendedor tecnológico chileno que creó una app que hoy usan millones de personas y que fue comprada por Uber el año pasado. Es todo un referente a nivel mundial.\n\n¡El primer paso para obtener tu beca!',
    speakers: 'BuenaOnda Talks',
    zoomId: null,
    zoomRegisterUrl: null,
    startDatetime: dayjs().set('hour', 18).set('minute', 30).second(0).toDate(),
    endDatetime: dayjs().set('hour', 20).set('minute', 0).second(0).toDate(),
});
