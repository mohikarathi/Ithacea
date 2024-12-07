import React, { useEffect, useState } from "react";
import { FaMedal, FaTrophy } from "react-icons/fa";
import Confetti from "react-confetti";

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const dummyData = [
      { rank: 1, name: "Mohika", points: 1500, badge: "gold" },
      { rank: 2, name: "Tanvi", points: 1400, badge: "silver" },
      { rank: 3, name: "Anshuman", points: 1300, badge: "bronze" },
      { rank: 4, name: "Nishant", points: 1200 },
      { rank: 5, name: "Om", points: 1100 },
      { rank: 6, name: "Sophie", points: 1050 },
      { rank: 7, name: "Leo", points: 950 },
      { rank: 8, name: "Ava", points: 850 },
      { rank: 9, name: "Ethan", points: 750 },
      { rank: 10, name: "Liam", points: 650 },
      { rank: 11, name: "Olivia", points: 600 },
      { rank: 12, name: "Emma", points: 550 },
      { rank: 13, name: "Jacob", points: 500 },
      { rank: 14, name: "Mia", points: 450 },
      { rank: 15, name: "Noah", points: 400 },
      { rank: 16, name: "Sophia", points: 350 },
      { rank: 17, name: "James", points: 300 },
      { rank: 18, name: "Charlotte", points: 250 },
      { rank: 19, name: "Oliver", points: 200 },
      { rank: 20, name: "Isabella", points: 150 },
    ];
    setLeaderboardData(dummyData);

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const updatePoints = (points) => {
    setUserPoints(userPoints + points);
    const updatedLeaderboard = leaderboardData.map((user) => {
      if (user.name === "Mohika") {
        return { ...user, points: user.points + points };
      }
      return user;
    });
    setLeaderboardData(updatedLeaderboard);
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case "gold":
        return <FaTrophy className="text-yellow-400 text-2xl" />;
      case "silver":
        return <FaMedal className="text-gray-300 text-2xl" />;
      case "bronze":
        return <FaMedal className="text-yellow-600 text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 relative">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <h1 className="text-6xl font-bold text-center mt-10 mb-6 text-blue-700">
        🎉 Leaderboard 🎉
      </h1>

      <div className="flex justify-center">
        <div className="w-full overflow-hidden shadow-xl rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="table-auto w-full text-center border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                  <th className="px-4 py-3 text-xl font-semibold">Rank</th>
                  <th className="px-4 py-3 text-xl font-semibold">Player</th>
                  <th className="px-4 py-3 text-xl font-semibold">Points</th>
                  <th className="px-4 py-3 text-xl font-semibold">Badge</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <tr
                    key={user.rank}
                    className={`hover:bg-gray-200 transform hover:scale-105 transition-transform ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    }`}
                  >
                    <td className="px-4 py-3 font-bold text-lg text-gray-800">
                      {user.rank}
                    </td>
                    <td className="px-4 py-3 flex items-center justify-center">
                      <span className="mr-2">{user.name}</span>
                      {user.rank === 1 && (
                        <FaTrophy className="text-yellow-400 text-2xl animate-bounce" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-lg text-gray-800">
                      {user.points}
                    </td>
                    <td className="px-4 py-3">{getBadgeIcon(user.badge)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white py-2 px-6 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-transform">
          Join the Leaderboard!
        </button>
      </div>
    </div>
  );
};

export default LeaderboardPage;
