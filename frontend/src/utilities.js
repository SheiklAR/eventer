// Format date and time for display
const formatDateTime = (datetime) => {
    const dateTimeObj = new Date(datetime);
    const date = dateTimeObj.toISOString().split('T')[0];
    const time = dateTimeObj.toTimeString().split(' ')[0];
    return { date, time };
};

export { formatDateTime };