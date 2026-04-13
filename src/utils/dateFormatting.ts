export const formatDate = (date: Date) => {
    if (!date) return '';

    const format = new Date(date);

    const day = format.getDate();
    const month = format.getMonth();
    const year = format.getFullYear();

    return `${day}/${month}/${year}`;
}