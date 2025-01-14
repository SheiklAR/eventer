import connectDB from "./config/db.js";
import dotenv from "dotenv"
dotenv.config();
console.log(process.env.MONGO_URI);
connectDB();
import users from "./data/users.js";
import events from "./data/events.js";
import { User, Event } from "./models/model.js";
import colors from "colors";
    




const importData = async () => {
    
    try {
        console.log("Destroying data...");
            await User.deleteMany();
            await Event.deleteMany();

            const createdUsers = await User.insertMany(users);
            const user = createdUsers[0]._id;

            const sampleEvents = events.map((event) => {
                return { ...event, user: user }
            });

            const createdEvents = await Event.insertMany(sampleEvents);
            console.log(createdEvents);
            console.log("Data Imported!".green.inverse);
        } catch (error) {
            console.log(error);
        }
}


const destroyData = async() => {
    try {
        await User.deleteMany();
        await Event.deleteMany();
        console.log("Data Destroyed!".red.inverse);
    } catch (error) {
        console.log(error);
    }
}   


if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}