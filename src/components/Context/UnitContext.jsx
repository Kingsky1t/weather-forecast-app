import { createContext, useState } from "react";

export const UnitContext = createContext()

export const UnitContextProvider = ({children})=> {
    // 0->standard 1->metric 2->imperial
    const [unit, setUnit] = useState(1)

    

    return(
        <UnitContext.Provider value={{unit, setUnit, }}>
            {children}
        </UnitContext.Provider>
    )
}