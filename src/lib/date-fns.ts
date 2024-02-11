import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const getMonthName = (date: Date) => {
    return format(date, 'LLLL', { locale: es });
};

export const getDayName = (date: Date) => {
    return format(date, 'EEEE', { locale: es });
};

export const getHHMM12FormatText = (date: Date) => {
    return format(date, 'hh:mm a', { locale: es });
};
