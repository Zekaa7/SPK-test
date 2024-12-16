
import React, { useState } from "react";
import { DatePicker } from "@nextui-org/date-picker";
import { I18nProvider } from "@react-aria/i18n";
import { CalendarDate } from "@nextui-org/react";
import { CalendarDateTime, ZonedDateTime } from "@internationalized/date";

function DatePickerPromet({ getDate }: { getDate: (date: string) => void }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (
    value: ZonedDateTime | CalendarDate | CalendarDateTime | any
  ) => {
    const date = new Date(value.year, value.month - 1, value.day);
    let formattedDate = new Intl.DateTimeFormat("sr-RS", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

    // Proveri i ukloni tačku ako postoji na kraju
    formattedDate = formattedDate.endsWith(".")
      ? formattedDate.slice(0, -1)
      : formattedDate;

    setSelectedDate(formattedDate);
    getDate(formattedDate);
  };

  return (
    <I18nProvider locale="sr-Latn-RS">
      <div className="flex w-1/5 flex-wrap md:flex-nowrap gap-4">
        <DatePicker
          label="Izaberite datum"
          className="max-w-[284px]"
          onChange={handleDateChange}
        />
      </div>
    </I18nProvider>
  );
}

export default DatePickerPromet;
