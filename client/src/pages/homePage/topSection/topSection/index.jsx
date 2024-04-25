import logo_icon from "../../../../icons/logo.png";
import menu_icon from "../../../../icons/menu.png";
import cart_icon from "../../../../icons/cart.png";
import loginRegister_icon from "../../../../icons/login-register.png";
import resturant_icon from "../../../../icons/resturants.png";
import changeArea_icon from "../../../../icons/changeArea.png";
import support from "../../../../icons/support.png";
import style from "./index.module.css";
import { useState } from "react";
const Index = () => {
  const [menuClicked, setMenuClicked] = useState(false);
  return (
    <div className={style.header}>
      <div className={style.main_container}>
        <div className={style.left_container}>
          <img
            src={menu_icon}
            alt=""
            className={style.menu_tag}
            onClick={() => setMenuClicked(!menuClicked)}
          />
          <img src={logo_icon} alt="" className={style.logo} />
        </div>
        <div className={style.right_container}>
          <img src={cart_icon} alt="" className={style.cart} />
        </div>
      </div>
      <div className={`${style.menu} ${menuClicked ? style.active : ""}`}>
        <p className={style.header}>
          <img src={logo_icon} alt="" className={style.logo} />
        </p>
        <ul>
          <a href="">
            <li>
              <img src={loginRegister_icon} alt="" />
              Edit Info
            </li>
          </a>
          <a href="">
            <li>
              <img src={resturant_icon} alt="" />
              Add To Menu
            </li>
          </a>
          <a href="">
            <li>
              <img src={changeArea_icon} alt="" />
              Orders
            </li>
          </a>
          <a href="">
            <li>
              <img src={support} alt="" />
              support
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Index;
