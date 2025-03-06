import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const Mycamping = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in and set the email
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
  }, []);

  // Fetch campaigns for the logged-in user
  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:3001/api/myCampaigns/${userEmail}`)
        .then(response => response.json())
        .then(data => {
          setCampaigns(data);
          setLoading(false);
        });
    }
  }, [userEmail]);

  // Navigate to the update page
  const handleUpdate = (id) => {
    navigate(`/updateCampaign/${id}`);
  };

  // Show the modal for campaign deletion
  const handleDeleteClick = (id) => {
    setCampaignToDelete(id);
    setShowModal(true);
  };

  // Delete the campaign
  const handleDelete = () => {
    fetch(`http://localhost:3001/api/campaigns/${campaignToDelete}`, {
      method: 'DELETE',
    })
      .then(response => {
        setCampaigns(campaigns.filter(campaign => campaign._id !== campaignToDelete));
        setShowModal(false);
      });
  };

  // Close the modal without deleting
  const handleCancel = () => {
    setShowModal(false);
  };

  // Loading state while fetching campaigns
  if (loading) {
    return <div className="text-center text-lg"><span className="loading loading-spinner text-success"></span></div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">My Campaigns</h1>
        {campaigns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Campaign Name</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Description</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Deadline</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Minimum Donation</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(campaign => (
                  <tr key={campaign._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-lg text-gray-800">{campaign.title}</td>
                    <td className="px-6 py-4 text-lg text-gray-600">{campaign.description}</td>
                    <td className="px-6 py-4 text-lg text-gray-500">{new Date(campaign.deadline).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-lg text-gray-500">{campaign.minimumDonation}</td>
                    <td className="px-6 py-4 text-lg">
                      <button
                        onClick={() => handleUpdate(campaign._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(campaign._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-lg text-gray-600">
            No campaigns found.
          </div>
        )}

        {/* Modal for confirmation */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this?</h2>
              <div className="flex justify-between">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Mycamping;
