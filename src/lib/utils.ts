import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getDayName, getMonthName } from './date-fns';
import { getDate, getHours, getYear } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const padNumber = (value: number, digits = 2): string => {
    let val = value.toString();

    while (val.length < digits) {
        val = `0${val}`;
    }

    return val;
};

export const getCleanErrorMessage = (err: Error) => {
    let message = err.message;

    const firstErrorSplitted = err.message.split('Error: ');
    if (firstErrorSplitted.length > 1) {
        message = firstErrorSplitted.slice(1).join('');
    }

    return message;
};

export const dateToInputValue = (date: Date) => {
    const year = date.getFullYear();
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());

    return `${year}-${month}-${day}`;
};

export const datetimeToInputValue = (date: Date) => {
    return date.toISOString();
};

export const readableFormatDate = (date: Date | null) => {
    return date
        ? `${getDayName(date)} ${getDate(date)} de ${getMonthName(date)} de ${getYear(
              date,
          )}`
        : '-';
};

export const readableFormatDateTime = (date: Date | null) => {
    return date
        ? `${getDayName(date)} ${getDate(date)} de ${getMonthName(date)} de ${getYear(
              date,
          )} a las ${getHours(date)}:${date.getMinutes()}`
        : '-';
};

type InputToNumberOptions = {
    min?: number;
    max?: number;
};

export const inputToNumber = (
    input: string,
    options: InputToNumberOptions = {},
): number | null => {
    const { min = 0, max = 1000000000 } = options;

    const onlyDigits = input.replace(/[^0-9]/g, '');
    if (onlyDigits === '') {
        return null;
    }

    const asInt = parseInt(onlyDigits, 10);
    if (isNaN(asInt)) {
        return null;
    }

    return Math.min(Math.max(asInt, min), max);
};
