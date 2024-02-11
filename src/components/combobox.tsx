/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Props<TData extends string | number | Record<string, any>> = {
    options: Array<{ key: string; value: TData; label: string }>;
    placeholder?: string;
    noOptionsMessage?: string;
    onChange: (value: string) => void;
    value: string | null | undefined;
    disabled?: boolean;
};

export function Combobox<TData extends string | number | Record<string, any>>(
    props: Props<TData>,
) {
    const {
        value,
        onChange,
        options,
        placeholder = 'Selecciona una opción',
        noOptionsMessage = 'No se encontraron resultados',
    } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="min-w-[200px] justify-between text-left"
                >
                    <span className="inline-block w-[90%] overflow-hidden text-ellipsis text-left">
                        {value
                            ? options.find((option) => option.key === value)?.label
                            : placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="p-0">
                <Command
                    filter={(value, search) => {
                        const item = options.find((option) => option.key === value);
                        if (item === undefined) return 0;

                        const matches = item.label
                            .toLowerCase()
                            .includes(search?.toLowerCase());

                        if (matches) {
                            return 1;
                        }

                        return 0;
                    }}
                >
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>{noOptionsMessage}</CommandEmpty>

                    <div className="max-h-[200px] w-full overflow-x-hidden overflow-y-scroll">
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.key}
                                    value={option.key}
                                    onSelect={() => {
                                        onChange(option.key === value ? '' : option.key);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === option.key
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />

                                    <span className="min-w-0 flex-1">{option.label}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </div>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
