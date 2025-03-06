import React, { useEffect, useState } from "react";
import axios from "axios";

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch donations when the component mounts
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get("http://localhost:3001/api/my-donations", {
          params: { email: "john.doe@example.com" }, // Replace with authenticated user's email
        });
        setDonations(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load donations.");
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading your donations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center py-6">My Donations</h1>

        {donations.length === 0 ? (
          <p className="text-center text-gray-600 py-6">
            You have not made any donations yet.
          </p>
        ) : (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 border">Campaign</th>
                <th className="py-3 px-4 border">Amount</th>
                <th className="py-3 px-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index} className="text-center">
                  <td className="py-3 px-4 border">{donation.campaignTitle}</td>
                  <td className="py-3 px-4 border">${donation.amount}</td>
                  <td className="py-3 px-4 border">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyDonations;
