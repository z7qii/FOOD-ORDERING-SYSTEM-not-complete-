// RestaurantDetailsForm.js
import React, { useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const RestaurantDetailsForm = () => {
  const uLocation = useLocation();
  const userData = location.state;
  // State hooks for all the fields
  const [restaurantName, setRestaurantName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const [restaurantImg, setRestaurantImg] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    handleSignup();

    const formData = {
      restaurantName,
      shortDescription,
      longDescription,
      backgroundImg,
      restaurantImg,
      minOrder,
      deliveryTime,
      openTime,
      location,
    };
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8010/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //   name: fullName,
          //   email: email,
          //   phoneNumber: phoneNumber,
          //   password: password,

          ...userData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Registration failed", data.error);
      }
    } catch (err) {
      console.error("There was an error submitting the form", err);
    }
  };

  return (
    <div className={style.signUpContainer}>
      <h1 className={style.headerTitle}>RESTAURANT DETAILS</h1>
      <form className={style.signUpForm} onSubmit={handleDetailsSubmit}>
        {/* Include all the input fields */}
        <label htmlFor="restaurantName">Restaurant Name:</label>
        <input
          type="text"
          id="restaurantName"
          className={style.inputField}
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />

        <label htmlFor="shortDescription">Short Description:</label>
        <input
          type="text"
          id="shortDescription"
          className={style.inputField}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />

        <label htmlFor="longDescription">Long Description:</label>
        <textarea
          id="longDescription"
          className={`${style.inputField} ${style.textareaField}`} // Apply inputField styles and add any specific styles for textarea
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
        />

        <label htmlFor="backgroundImg">Background Image URL:</label>
        <input
          type="text"
          id="backgroundImg"
          className={style.inputField}
          value={backgroundImg}
          onChange={(e) => setBackgroundImg(e.target.value)}
        />

        <label htmlFor="restaurantImg">Restaurant Image URL:</label>
        <input
          type="text"
          id="restaurantImg"
          className={style.inputField}
          value={restaurantImg}
          onChange={(e) => setRestaurantImg(e.target.value)}
        />

        <label htmlFor="minOrder">Minimum Order Amount:</label>
        <input
          type="number" // Use 'number' type for numerical inputs
          id="minOrder"
          className={style.inputField}
          value={minOrder}
          onChange={(e) => setMinOrder(e.target.value)}
        />

        <label htmlFor="deliveryTime">Estimated Delivery Time:</label>
        <input
          type="text"
          id="deliveryTime"
          className={style.inputField}
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        />

        <label htmlFor="openTime">Opening Times:</label>
        <input
          type="text"
          id="openTime"
          className={style.inputField}
          value={openTime}
          onChange={(e) => setOpenTime(e.target.value)}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          className={style.inputField}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit" className={style.registerButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RestaurantDetailsForm;
