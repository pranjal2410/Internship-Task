import React from "react";

export const TeamContext = React.createContext();

const TeamContextProvider = (props) => {
    const [teamData, setTeamData] = React.useState({});

    return (
        <TeamContext.Provider value={{ teamData: teamData, setTeamData: setTeamData}}>
            {props.children}
        </TeamContext.Provider>
    )
}

export default TeamContextProvider;