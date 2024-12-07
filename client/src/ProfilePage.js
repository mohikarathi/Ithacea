import React from "react";

const ProfilePage = () => {
  // Static user data for demonstration
  const user = {
    name: "Mohika",
    level: "Gold",
    points: 1500,
    travelType: "Backpack Traveler",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center space-x-6">
          <img
            className="w-24 h-24 rounded-full border-4 border-blue-500"
            src="https://via.placeholder.com/150"
            alt="User Avatar"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.level} Explorer</p>
            <p className="text-blue-500 font-semibold">{user.points} Points</p>
            {/* Display the travel type */}
            {user.travelType && (
              <p className="text-green-500 mt-2">
                Travel Type: {user.travelType}
              </p>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Badges</h3>
          <div className="flex space-x-4">
            <div className="bg-yellow-300 text-yellow-900 p-2 rounded-lg">
              🏅 Top Traveler
            </div>
            <div className="bg-green-300 text-green-900 p-2 rounded-lg">
              🌲 Nature Lover
            </div>
            <div className="bg-red-300 text-red-900 p-2 rounded-lg">
              🏰 Historical Guru
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Achievements</h3>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Visited 20+ countries</li>
            <li>Completed 50 travel quests</li>
            <li>Unlocked all nature trails</li>
          </ul>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Activities</h3>
        <ul className="divide-y divide-gray-200">
          <li className="py-3 flex justify-between">
            <span className="text-gray-600">Completed a quest in Paris</span>
            <span className="text-gray-500 text-sm">2 days ago</span>
          </li>
          <li className="py-3 flex justify-between">
            <span className="text-gray-600">Earned the "Beach Explorer" badge</span>
            <span className="text-gray-500 text-sm">5 days ago</span>
          </li>
          <li className="py-3 flex justify-between">
            <span className="text-gray-600">Visited the Grand Canyon</span>
            <span className="text-gray-500 text-sm">1 week ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
