import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2
import Navbar from '../Navbar/Navbar';

const UpdateCampaign = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the campaign details by ID
  useEffect(() => {
    fetch(`http://localhost:3001/api/campaigns/${id}`)
      .then(response => response.json())
      .then(data => {
        setCampaign(data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch(error => {
        console.error("Error fetching campaign:", error);
        setLoading(false);
      });
  }, [id]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaign(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle saving the updated campaign
  const handleSaveUpdate = (e) => {
    e.preventDefault(); // Prevent default form behavior

    // Update the campaign using PUT request
    fetch(`http://localhost:3001/api/campaigns/${campaign._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campaign),
    })
      .then(response => response.json())
      .then(data => {
        // Show success alert with SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'Campaign updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/mycamping'); // Redirect after success
        });
      })
      .catch(error => {
        console.error("Error updating campaign:", error);
        // Show error alert with SweetAlert2
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue updating the campaign.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  // Loading state while fetching the campaign
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update Campaign</h1>
        <form onSubmit={handleSaveUpdate}>
          <input
            type="text"
            name="title"
            value={campaign.title}
            onChange={handleChange}
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Campaign Title"
          />
          <input
            type="text"
            name="description"
            value={campaign.description}
            onChange={handleChange}
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Campaign Description"
          />
          <input
            type="number"
            name="minimumDonation"
            value={campaign.minimumDonation}
            onChange={handleChange}
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Minimum Donation"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCampaign;
