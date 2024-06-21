import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import RequestPage from "./pages/RequestPage";
import FeedbackPage from "./pages/FeedbackPage";
import ReportsPage from "./pages/ReportsPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen min-w-screen min-w-[600px]">
        <SignedOut>
          <div
            className="bg-cover bg-center min-h-screen"
            style={{
              backgroundImage: `url('https://cdn.dribbble.com/users/186058/screenshots/2168462/media/73587a2c5ec3b84dcae8d6107bbe75c7.gif')`,
            }}
          >
            <div className="flex justify-center items-center h-screen">
              <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-lg">
                <h2 className="text-xl font-bold mb-6">Welcome to RequeSTAR</h2>
                <img
                  src="https://cdn.dribbble.com/users/2553116/screenshots/13792093/media/8b6205cc86585e2222843684ac739fb4.gif"
                  alt="Welcome GIF"
                  className="w-full h-auto rounded-lg shadow-md max-h-96 mx-auto mb-6"
                />
                <SignInButton>
                  <button className="bg-[#830823] text-white px-6 py-3 rounded-full hover:bg-orange-600 transition duration-300">
                    Get Started !
                  </button>
                </SignInButton>
              </div>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <Navbar />
          <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/requests" element={<RequestPage />} />
              <Route path="/feedbacks" element={<FeedbackPage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Routes>
          </div>
        </SignedIn>
      </div>
    </Router>
  );
};

export default App;
