export const convertMinutesToTime = (totalMinutes: number) => {
    const days = Math.floor(totalMinutes / (60 * 24));
    const remainingMinutes = totalMinutes % (60 * 24);
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;

    return {
        days: days,
        hours: hours,
        minutes: minutes
    };
}