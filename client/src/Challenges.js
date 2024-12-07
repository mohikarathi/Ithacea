import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import Confetti from "react-confetti";

const challenges = [
  {
    id: 1, // Add a unique ID to each challenge
    title: "Photograph the sunset at the hilltop",
    description:
      "Take a photo from the specified location with the sunset in the background.",
    rules: "Upload your photo in the app.",
    points: 50,
  },
  {
    id: 2,
    title: "Try the famous local dish",
    description:
      "Order the signature dish from a local restaurant and submit a photo.",
    rules: "Submit your receipt and a photo of the dish.",
    points: 30,
  },
  {
    id: 3,
    title: "Visit the historic market",
    description: "Take a selfie at the historic market entrance.",
    rules: "Submit a selfie taken at the specified spot.",
    points: 20,
  },
];

const Challenges = ({ updatePoints }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCompleteChallenge = (points) => {
    updatePoints(points); // Add points to the leaderboard
    setShowConfetti(true); // Show confetti when challenge is completed
    setTimeout(() => setShowConfetti(false), 3000); // Confetti for 3 seconds
  };

  return (
    <div className="bg-white min-h-screen p-6 relative">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        🎮 Complete Your Challenges 🎮
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-yellow-100 border border-yellow-600 rounded-lg shadow-md p-4 transform hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-xl font-semibold text-yellow-700">
              {challenge.title}
            </h2>
            <p className="text-gray-700 mt-2">{challenge.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Rules: {challenge.rules}
            </p>
            <p className="text-sm text-green-700 font-bold mt-2">
              Points: {challenge.points}
            </p>
            <button
              className="bg-yellow-600 text-white mt-4 px-4 py-2 rounded-md hover:bg-yellow-700"
              onClick={() => handleCompleteChallenge(challenge.points)}
            >
              Complete Challenge
            </button>

            {/* Link to the ChallengeDetail page */}
            <Link
              to={`/challenge/${challenge.id}`}
              className="text-blue-600 mt-2 block hover:underline"
            >
              View Challenge Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
