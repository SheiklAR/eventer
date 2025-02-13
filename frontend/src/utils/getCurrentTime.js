const getCurrentTime = () => {
    const currentTime = new Date().toTimeString().slice(0, 5)
    console.log(currentTime)
    return currentTime;
}


export default getCurrentTime;