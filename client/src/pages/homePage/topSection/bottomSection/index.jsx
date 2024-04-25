import backgroundImage from "../../../../imgs/background.jpg";
import resturantImage from "../../../../imgs/resturantImage.jpeg";
import openTime from "../../../../icons/openTime.png";
import delivery from "../../../../icons/deliveryFee.png";
import location from "../../../../icons/location.png";
import style from "./index.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Index = () => {
  const { resturant } = useSelector((store) => store.resturant);
  return (
    <div className={style.bottomSection}>
      <div className={style.background_container}>
        <img src={backgroundImage} alt="" />
      </div>
      <div className={style.bottomContainer}>
        <div className={style.overView_container}>
          <div className={style.shortDescription_container}>
            <img src={resturantImage} alt="" />
            <div className={style.description_container}>
              <p>{resturant.resturantName}</p>
              <span>{resturant.shortDescription}</span>
            </div>
          </div>
          <div className={style.infoContainer}>
            <div className={style.shortInfo_container}>
              <div className={style.info}>
                <img src={openTime} alt="" />
                <span>{resturant.openTime}</span>
              </div>
              <div className={style.info}>
                <img src={delivery} alt="" />
                <span>{resturant.deliveryTime}</span>
              </div>
              <div className={style.info}>
                <img src={location} alt="" />
                <span>{resturant.location}</span>
              </div>
            </div>
            <div className={style.longDescription_container}>
              <p>{resturant.longDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
