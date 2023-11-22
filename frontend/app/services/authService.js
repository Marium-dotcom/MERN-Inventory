import axios from "axios";


export const registerUser = async(userData) => {
    try {
       console.log(userData);
        const response = await axios.post(`http://localhost:8000/api/users/register`, userData, {withCredentials: true})
        return response.data
    } catch (error) {
        console.log(error);
    }
};