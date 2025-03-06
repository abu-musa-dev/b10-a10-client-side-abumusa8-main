import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const CampaignDetails = ({ refreshDonations }) => {
  const { id } = useParams(); // Get the campaign ID from the URL
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");

  // Fetch campaign details from the API
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/campaigns/${id}`
        );

        // Validate campaign deadline date
        const campaignData = response.data;
        if (isNaN(new Date(campaignData.deadline).getTime())) {
          throw new Error("Invalid campaign deadline.");
        }

        setCampaign(campaignData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch campaign details.");
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  // Handle donation submission
  const handleDonate = async () => {
    if (isNaN(parseFloat(donationAmount)) || donationAmount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Please enter a valid donation amount.",
      });
      return;
    }

    try {
      // Post donation data to the API
      await axios.post("http://localhost:3001/api/donate", {
        campaignId: id,
        amount: parseFloat(donationAmount),
        donorName: "John Doe", // Replace with authenticated user's name
        donorEmail: "john.doe@example.com", // Replace with authenticated user's email
      });

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your donation has been successfully processed.",
      });

      setDonationAmount(""); // Reset input field

      // Refresh the donations list after a successful donation
      refreshDonations("john.doe@example.com");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Donation Failed",
        text: "There was an issue processing your donation. Please try again.",
      });
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading campaign details...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  // Render campaign details and donation form
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <figure>
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{campaign.title}</h1>
          <p className="text-gray-700 mb-4">{campaign.description}</p>
          <div className="mb-4">
            <span className="font-bold">Type:</span> {campaign.type}
          </div>
          <div className="mb-4">
            <span className="font-bold">Minimum Donation:</span> $
            {campaign.minimumDonation}
          </div>
          <div className="mb-4">
            <span className="font-bold">Deadline:</span>{" "}
            {new Date(campaign.deadline).toLocaleDateString()}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter Donation Amount:</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder={`Minimum $${campaign.minimumDonation}`}
            />
          </div>

          <div className="mt-6">
            <button className="btn btn-primary w-full" onClick={handleDonate}>
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default CampaignDetails;
