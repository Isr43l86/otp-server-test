import { createContext, useState, useContext } from "react";

const UserContext = createContext();
export const userUserContext = () => {
    const context = useContext(UserContext);
    return context;
};

export function UserContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({
        currentUser: {
            _id: "",
            username: "",
            twoFactorAuthentication: {
                activated: false,
                deliveryMethod: "",
            },
        },
    });

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}
