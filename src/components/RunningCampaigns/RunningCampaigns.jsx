import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RunningCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchRunningCampaigns();
  }, []);

  const fetchRunningCampaigns = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/runningCampaigns"
      );
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching running campaigns: ", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-4xl font-extrabold text-center mb-6">
        Running Campaigns
      </h2>
      {campaigns.length === 0 ? (
        <p className="text-center text-xl">
          <span class="loading loading-spinner text-success"></span>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="card w-full bg-white shadow-xl rounded-lg overflow-hidden"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 mt-2">{campaign.description}</p>
                <div className="mt-4 text-gray-700">
                  <span className="block">
                    Min Donation: ${campaign.minimumDonation}
                  </span>
                  <span className="block">
                    Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Link
                  to={`/campaign/${campaign._id}`}
                  className="btn btn-primary w-full text-white bg-blue-500 hover:bg-blue-700 rounded-md py-2"
                >
                  <div class="tooltip" data-tip="Click to see more information about this campaign">
                    <button class=" w-full">See more</button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RunningCampaigns;
