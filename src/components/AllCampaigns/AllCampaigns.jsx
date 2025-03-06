import React, { useState, useEffect } from "react";
import axios from "axios"; // To fetch campaigns
import { useNavigate } from "react-router-dom"; // For navigation
import Navbar from "../Navbar/Navbar";
import Modal from 'react-modal'; // Modal for deadline passed message
import Footer from "../../Footer/Footer";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [sortOrder, setSortOrder] = useState('asc'); // Track sort order
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/campaigns")  // Backend URL
      .then((response) => {
        // Ensure campaigns is always an array
        const campaignsData = Array.isArray(response.data) ? response.data : [];
        setCampaigns(campaignsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns", error);
        setError("Failed to load campaigns. Please try again later.");
        setLoading(false);
      });
  }, []);

  const sortCampaigns = () => {
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      return sortOrder === 'asc' ? a.minimumDonation - b.minimumDonation : b.minimumDonation - a.minimumDonation;
    });
    setCampaigns(sortedCampaigns);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) return <div><span class="loading loading-spinner text-success"></span></div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error message

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-3xl">All Campaigns</h1>
      <button onClick={sortCampaigns} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Sort by Minimum Donation ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead className="text-center">
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Type</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Minimum Donation</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <tr key={campaign._id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {campaign.title}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {campaign.type}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  ${campaign.minimumDonation}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/campaign/${campaign._id}`)}
                  >
                    See More
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No campaigns available</td>
            </tr>
          )}
        </tbody>
      </table>
      <Footer></Footer>
    </div>
  );
};

export default AllCampaigns;
