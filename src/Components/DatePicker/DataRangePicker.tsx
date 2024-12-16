import React, { useState } from "react";
import { CalendarDateTime, ZonedDateTime } from "@internationalized/date";
import { CalendarDate, DateRangePicker, RangeValue } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";

export default function DataRangePicker({
  onDate,
  visibleMonth,
}: {
  visibleMonth: number;
  onDate: (dateRange: { start: string; end: string }) => void;
}) {
  const [dateRange, setDateRange] = useState<string>("");

  const datePickerHandler = (
    e:
      | RangeValue<CalendarDate | CalendarDateTime | ZonedDateTime>
      | undefined
      | null
  ) => {
    if (e && e.start && e.end) {
      const start = e.start.toString();
      const end = e.end.toString();

      const formattedStart = `${start}`;
      const formattedEnd = `${end}`;
      const newDateRange = `Od: ${formattedStart} Do: ${formattedEnd}`;
      setDateRange(newDateRange);
      onDate({ start: formattedStart, end: formattedEnd });
    }
  };

  return (
    <div className="flex w-1/5 flex-wrap md:flex-nowrap gap-4">
      <I18nProvider locale="sr-Latn-RS">
        <DateRangePicker
          label="Molimo izaberite datum"
          visibleMonths={visibleMonth}
          onChange={datePickerHandler}
        />
      </I18nProvider>
    </div>
  );
}
