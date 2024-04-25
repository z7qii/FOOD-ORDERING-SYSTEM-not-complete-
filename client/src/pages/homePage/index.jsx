import TopSection from "./topSection/index.jsx";
import BodySection from "./bodySection/index.jsx";
import style from "./index.module.css";
const Index = function () {
  return (
    <div className={style.homePage_container}>
      <div className={style.main_container}>
        <TopSection />
        <BodySection />
      </div>
    </div>
  );
};

export default Index;
