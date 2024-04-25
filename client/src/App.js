import LoginPage from "./pages/loginPage/index.jsx";
import HomePage from "./pages/homePage/index.jsx";
import SignupPage from "./pages/signUpPage/index.jsx";
import ResturantDetailsForm from "./pages/RestaurantDetailsForm/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/signupPage" element={<SignupPage />} />
          <Route
            path="/restaurant-details"
            element={<ResturantDetailsForm />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
