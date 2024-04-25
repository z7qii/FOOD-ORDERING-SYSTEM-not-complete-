import { useState } from "react";
import style from "./index.module.css";
import Menu from "./menu/index";
const Index = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [sectionToDisplay, setSectionToDisplay] = useState("1");
  function handleSpanClick(e) {
    if (selectedSection) {
      selectedSection.classList.remove(style.selected);
    }
    e.target.classList.add(style.selected);
    setSelectedSection(e.target);
    setSectionToDisplay(e.target.id);
  }
  return (
    <div className={style.main_container}>
      <div className={style.header_container}>
        <div className={style.sections_container}>
          <div className={style.section}>
            <span onClick={handleSpanClick} id="1">
              Menu
            </span>
          </div>
          <span className={style.seperator}>|</span>
          <div className={style.section}>
            <span onClick={handleSpanClick} id="2">
              Reviews
            </span>
          </div>
          <span className={style.seperator}>|</span>
          <div className={style.section}>
            <span onClick={handleSpanClick} id="3">
              Info
            </span>
          </div>
        </div>
      </div>
      <div>{sectionToDisplay === "1" && <Menu />}</div>
    </div>
  );
};

export default Index;
