import { createContext, useContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = '$'

    const calculateAge = (dob) => {

        const today = new Date();
        const birthday = new Date(dob)

        let age = today.getFullYear() - birthday.getFullYear()

        return age
    }

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }


    const value = {
        calculateAge,
        slotDateFormat,
        currency,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const AppContextValue = useContext(AppContext)
    if (!AppContextValue) {
        throw new Error("AppProvider wrap properly");
    }
    return AppContextValue
}