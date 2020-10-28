import React from "react";

export const MatchContext = React.createContext();

const MatchContextProvider = (props) => {
    const [data, setData] = React.useState({});

    return (
        <MatchContext.Provider value={{ data: data, setData: setData}}>
            {props.children}
        </MatchContext.Provider>
    )
}

export default MatchContextProvider;