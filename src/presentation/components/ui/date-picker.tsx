'use client'

import {CalendarIcon} from 'lucide-react'
import { type DateRange } from 'react-day-picker'
import { uk } from 'date-fns/locale'

import { Calendar } from '@/presentation/components/ui/calendar.tsx'
import {Popover, PopoverContent, PopoverTrigger} from "@/presentation/components/ui/popover.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";

interface Props {
    setRange: (value: DateRange | undefined) => void;
    range: DateRange | undefined;
}
const DatePickerRange = ({ setRange, range }: Props) => {
    return (
        <div className='max-w-xs space-y-2'>
          <Popover>
            <PopoverTrigger asChild>
                <Button className="bg-slate-100 hover:bg-slate-200">
                    <CalendarIcon className="text-black" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
              <Calendar
                mode='range'
                selected={range}
                onSelect={range => {
                  setRange(range)
                }}
                locale={uk}
              />
            </PopoverContent>
          </Popover>
        </div>
    )
}

export default DatePickerRange
