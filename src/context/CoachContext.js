// import React, { useState } from "react";

// const CoachContext = React.createContext();

// export const CoachProvider = ({ children }) => {
//   const [athleteCode, setAthleteCode] = useState("");
//   const [coachCode, setCoachCode] = useState("");
//   const [teamName, setTeamName] = useState("");
//   const [teamId, setTeamId] = useState("");

//   return (
//     <CoachContext.Provider
//       value={{
//         coachSettings: {
//           athleteCode,
//           coachCode,
//           teamName,
//           teamId,
//           setAthleteCode,
//           setCoachCode,
//           setTeamName,
//           setTeamId
//         },
//       }}
//     >
//       {children}
//     </CoachContext.Provider>
//   );
// };

// export default CoachContext;
