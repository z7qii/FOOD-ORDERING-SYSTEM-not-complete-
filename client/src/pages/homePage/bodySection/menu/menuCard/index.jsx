import style from "./index.module.css";
import trashIcon from "../../../../../icons/delete.png";

const Index = (img, name, price, sectionTitle, deleteItem) => {
  return (
    <div className={style.main_container}>
      <div className={style.meal_container}>
        <img
          src={"http://localhost:8010/imgs/" + img}
          className={style.img}
          alt=""
        />
        <div className={style.details_container}>
          <span className={style.name}>{name}</span>
          <span className={style.price}>{price}</span>
        </div>
        <div className={style.trashIcon_container}>
          <img
            src={trashIcon}
            alt=""
            className={style.trashIcon}
            onClick={() => deleteItem(name, sectionTitle)}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
