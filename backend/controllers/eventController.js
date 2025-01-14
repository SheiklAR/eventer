import { Event } from "../models/model.js"

const getEvents = async (req, res) => {

    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};


const getEvent = async (req, res) => {

    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};


export { getEvents, getEvent }