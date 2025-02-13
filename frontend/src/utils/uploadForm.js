import axios from "axios";

const uploadForm = async ({ formData }) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("file", formData.image); // Ensure this is a File object

 
    const result = await axios.post('/api/events/uploadEvent', formDataToSend, {
        headers: {
            "Content-Type": "multipart/form-data", // since it contains files
        }
    });
    return result.data
};


export default uploadForm;