import { Event } from "../models/model.js"


// @desc   Get all the events data
// @route  api/events/
// @access Public
const getEvents = async (req, res) => {

    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};

// @desc   Get event data by ID
// @route  api/events/:id
// @access Public
const getEvent = async (req, res) => {

    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};

const createEvent = async (req, res) => {
    if (!req.user) {
        throw new Error("Log in first");
        
    }
    const userId = req.user._id;
    const { name, description, date, image, time, category } = req.body;

    const newEvent = await Event.create({
        userId,
        name,
        description: description || '',
        image: image || '',
        date,
        time,
        category: category || ''
    });

    console.log(newEvent)
    
}


const uploadEvent = async (req, res) => {
    try {
        const userId = req.user._id
        console.log('body', req.body);
        console.log('file', req.file);
        const { name, description, date, time, category } = req.body;
        const cloudURL = req.file.path // cloudinray URL of the uploaded image
        
        const event = await Event.create({
            user: userId,
            name,
            description,
            date,
            time,
            category,
            image: cloudURL
        })
        console.log('here',event)
        
        res.status(200).json({
            message: "Event created Successfully",
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}


export {
    getEvents,
    getEvent,
    createEvent,
    uploadEvent
}