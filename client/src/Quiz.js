import React, { useState } from "react"; 

function Quiz({ setView }) {
  // Questions and answer options
  const questions = [
    { 
      question: "What kind of accommodation do you prefer?", 
      options: [
        { text: "Hostels or camping", type: "backpacker" },
        { text: "Hotels or resorts", type: "vacationer" }
      ] 
    },
    { 
      question: "How do you prefer to travel?", 
      options: [
        { text: "Public transport or hitchhiking", type: "backpacker" },
        { text: "Private transport or guided tours", type: "vacationer" }
      ] 
    },
    { 
      question: "What does your ideal day look like?", 
      options: [
        { text: "Exploring local streets and hidden spots", type: "backpacker" },
        { text: "Relaxing by the pool or on the beach", type: "vacationer" }
      ] 
    },
    { 
      question: "How much planning do you like to do before a trip?", 
      options: [
        { text: "I prefer spontaneous adventures", type: "backpacker" },
        { text: "I plan everything in advance", type: "vacationer" }
      ] 
    },
    { 
      question: "What do you prioritize when it comes to food?", 
      options: [
        { text: "Street food or local cuisine", type: "backpacker" },
        { text: "Fine dining and popular restaurants", type: "vacationer" }
      ] 
    },
    { 
      question: "What do you carry when traveling?", 
      options: [
        { text: "Just the essentials in a backpack", type: "backpacker" },
        { text: "A suitcase with all my comforts", type: "vacationer" }
      ] 
    },
    { 
      question: "How do you prefer to explore a new city?", 
      options: [
        { text: "On foot or by bike", type: "backpacker" },
        { text: "By car or tour bus", type: "vacationer" }
      ] 
    },
    { 
      question: "How do you handle unexpected challenges while traveling?", 
      options: [
        { text: "I embrace them and adapt", type: "backpacker" },
        { text: "I avoid them by sticking to the plan", type: "vacationer" }
      ] 
    },
    { 
      question: "What's your idea of an adventure?", 
      options: [
        { text: "Hiking, camping, or trekking", type: "backpacker" },
        { text: "Exploring famous landmarks at a relaxed pace", type: "vacationer" }
      ] 
    },
    { 
      question: "What kind of souvenirs do you bring home?", 
      options: [
        { text: "Handmade local crafts", type: "backpacker" },
        { text: "Traditional souvenirs from popular spots", type: "vacationer" }
      ] 
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ backpacker: 0, vacationer: 0 });
  const [quizFinished, setQuizFinished] = useState(false);
  const [result, setResult] = useState("");

  const handleAnswer = (type) => {
    // Update score based on answer type
    setScore((prevScore) => ({
      ...prevScore,
      [type]: prevScore[type] + 1
    }));

    // Move to the next question or finish the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    setQuizFinished(true);
    // Determine result based on the higher score
    const finalResult = score.backpacker > score.vacationer ? "Backpack Traveler" : "Vacationer";
    setResult(finalResult);
  };

  const handleSubmit = () => {
    setView("home"); // Return to Home after viewing result
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-neutral-100">
      <div className="w-full max-w-3xl bg-white py-8 px-10 rounded-lg shadow-xl border border-gray-300 mt-10"> {/* Increased max-width and padding */}
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="text-lg font-semibold text-oliveGreen mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="relative w-full h-2 bg-gray-300 rounded">
            <div
              className="absolute h-full bg-ochre"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} // Fixed the template literal syntax here
            />
          </div>
        </div>

        {!quizFinished ? (
          <>
            <p className="mb-6 text-lg text-center text-494D22">{questions[currentQuestion].question}</p>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.type)}
                  className="w-full bg-ochre text-black py-4 rounded-md hover:bg-ochre/90 transition transform duration-200"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-494D22">
              You are a {result}!
            </h2>
            <p className="mb-6 text-lg text-494D22">
              {result === "Backpack Traveler"
                ? "You love the thrill of adventure, experiencing new cultures, and traveling on a budget."
                : "You prefer to relax and explore at your own pace, enjoying comfort and leisure."}
            </p>
            <button
              onClick={handleSubmit}
              className="w-full bg-ochre text-black py-4 rounded-md hover:bg-ochre/90 transition transform duration-200"
            >
              Go Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
