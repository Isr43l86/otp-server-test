import axios from "axios";

export const createNewUserRequest = async (user) =>
    await axios.post("http://localhost:3000/AppSafe/createUser", user);
export const authUserRequest = async (user) =>
    await axios.post("http://localhost:3000/AppSafe/authUser", user);
