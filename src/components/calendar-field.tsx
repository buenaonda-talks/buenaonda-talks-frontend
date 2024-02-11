import { CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { FormControl } from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { DayPickerSingleProps } from 'react-day-picker';

type Props = Omit<DayPickerSingleProps, 'selected' | 'mode'> & {
    selected?: Date | null;
};

export const CalendarSingleField = ({ selected, ...rest }: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={'outline'}
                        className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !selected && 'text-muted-foreground',
                        )}
                    >
                        {selected ? (
                            format(selected, 'dd/MM/yyyy')
                        ) : (
                            <span>Selecciona una fecha</span>
                        )}

                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" {...rest} selected={selected ?? undefined} />
            </PopoverContent>
        </Popover>
    );
};
