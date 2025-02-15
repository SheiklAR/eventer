const checkLive = (date, time, currentDate) => {
    const now = new Date();

    // Convert `date` and `currentDate` to `YYYY-MM-DD` format for proper comparison
    const eventDate = new Date(date).toISOString().split("T")[0]; 
    const todayDate = new Date(currentDate).toISOString().split("T")[0];

    if (eventDate !== todayDate) return false; // If not the same day, return false

    // Extract event time
    const [eventHours, eventMinutes] = time.split(":").map(Number);

    // Set event start time
    const eventStart = new Date();
    eventStart.setHours(eventHours, eventMinutes, 0, 0);

    // Event ends 60 minutes after start
    const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000);

    // Check if current time is within event window
    return now >= eventStart && now <= eventEnd;
};


export default checkLive;
    