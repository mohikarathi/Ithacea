import React, { useState } from "react";
import { useParams } from "react-router-dom";

const challenges = [
  {
    id: 1,
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

const ChallengeDetail = ({ updatePoints }) => {
  const { id } = useParams();
  const challenge = challenges.find((c) => c.id === parseInt(id));

  const [inputData, setInputData] = useState({
    photo: "",
    receipt: "",
  });

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Input: ", inputData);
    updatePoints(challenge.points);
    alert("Submission successful! Points will be added after verification.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {challenge.title}
      </h1>
      <p className="text-lg text-gray-700 mb-2">{challenge.description}</p>
      <p className="text-sm text-gray-500 mb-4">Rules: {challenge.rules}</p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Upload Photo</label>
          <input
            type="file"
            name="photo"
            className="mt-2 p-2 border rounded-md w-full"
            onChange={handleInputChange}
          />
        </div>
        {challenge.title === "Try the famous local dish" && (
          <div className="mb-4">
            <label className="block text-gray-700">Upload Receipt</label>
            <input
              type="file"
              name="receipt"
              className="mt-2 p-2 border rounded-md w-full"
              onChange={handleInputChange}
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
        >
          Submit Challenge
        </button>
      </form>
    </div>
  );
};

export default ChallengeDetail;
