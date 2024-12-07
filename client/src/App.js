import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz";
import ExploreMap from "./Map";
import Community from "./Community";
import LeaderboardPage from "./LeaderboardPage";
import LoginPage from "./Loginpage";
import ProfilePage from "./ProfilePage"; // Import ProfilePage
import Challenges from "./Challenges"; // Import Challenges page
import ChallengeDetail from "./ChallengeDetail"; // Import ChallengeDetail component
import Navbar from "./components/Navbar"; // Import Navbar component
import ContactUs from "./components/ContactUs"; // Import ContactUs component

function App() {
  const [points, setPoints] = useState(0);

  const updatePoints = (newPoints) => {
    setPoints(points + newPoints);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 relative">
        {/* Navbar is now imported and always visible */}
        <Navbar />

        {/* Daisy UI Drawer */}
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Apply margin to avoid overlap */}
            <div className="mt-16">
              <Routes>
                <Route path="/" element={<Home onStartQuiz={() => {}} />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/exploremap" element={<ExploreMap />} />
                <Route path="/community" element={<Community />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/challenges"
                  element={<Challenges updatePoints={updatePoints} />}
                />
                <Route
                  path="/challenge/:id"
                  element={<ChallengeDetail updatePoints={updatePoints} />}
                />
              </Routes>

              {/* Hero and introduction section for Home Page */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
                        <div className="container mx-auto text-center">
                          <h1 className="text-5xl font-bold mb-6 animate-bounce">
                            Discover Unique Destinations with Ithacea
                          </h1>
                          <p className="text-lg mb-8">
                            Uncover hidden gems, explore lesser-known travel
                            spots, talk to locals, and enjoy the benefits of our
                            interactive mapping system and rewards program.
                          </p>
                          <Link to="/quiz">
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-full transition transform hover:scale-110 shadow-lg">
                              Start Quiz
                            </button>
                          </Link>
                        </div>
                      </header>

                      {/* Daisy UI Hero Section */}
                      <div
                        className="hero min-h-screen"
                        style={{
                          backgroundImage:
                            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                        }}
                      >
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-neutral-content text-center">
                          <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">
                              Roam the world without worries
                            </h1>
                            <p className="mb-5">
                              Why carry the burden of not knowing where you
                              should travel? Go explore the world without the
                              fear of missing out.
                            </p>
                            <Link to="/exploremap">
                              <button className="btn btn-primary">
                                Get Started
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Contact Us Section on Home Page only */}
                      <section className="bg-oliveGreen text-white">
                        <ContactUs />
                      </section>
                    </>
                  }
                />
              </Routes>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4">
              <div className="container mx-auto text-center">
                <p>&copy; 2024 Ithacea. All rights reserved.</p>
              </div>
            </footer>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <Link to="/profile">Profile</Link> {/* Profile Page Link */}
                <Link to="/challenges">Challenges</Link>{" "}
                {/* Challenges Page Link */}
                <a>Profile</a>
                <a>Challenges</a>
                <a>Settings</a>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
