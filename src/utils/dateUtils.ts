export function formatLocalDate(date: Date): string
{
    const year=date.getFullYear();

    const month=String
    (
        date.getMonth()+1
    ).padStart(2, '0');

    const day=String
    (
        date.getDate()
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function getMonthDays(date: Date): (Date | null)[]
{
    const year=date.getFullYear();
    const month=date.getMonth();

    const firstDayOfWeek=new Date
    (
        year,
        month,
        1
    ).getDay();

    const daysInMonth = new Date
    (
        year,
        month + 1,
        0
    ).getDate();

    const days: (Date | null)[]=[];

    for (let i=0; i<firstDayOfWeek; i++)
    {
        days.push(null);
    }

    for (let day=1; day<=daysInMonth; day++)
    {
        days.push(new Date(year, month, day));
    }

    while (days.length%7!==0)
    {
        days.push(null);
    }

    return days;
}