// // DonationContext.js
// import React, { createContext, useState, useContext } from "react";

// const DonationContext = createContext();

// export const useDonations = () => {
//   return useContext(DonationContext);
// };

// export const DonationProvider = ({ children }) => {
//   const [donations, setDonations] = useState([]);

//   const addDonation = (newDonation) => {
//     setDonations((prevDonations) => [...prevDonations, newDonation]);
//   };

//   return (
//     <DonationContext.Provider value={{ donations, addDonation }}>
//       {children}
//     </DonationContext.Provider>
//   );
// };
