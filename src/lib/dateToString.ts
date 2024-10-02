export default function dateToString(date: Date): String {
    const month = date.getMonth()+1; // Starts at 0 with January
    const day = date.getDate(); // Get date returns day of the month
    return `${date.getFullYear()}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;
}