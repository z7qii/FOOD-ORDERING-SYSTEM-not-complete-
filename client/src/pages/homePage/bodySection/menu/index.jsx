import { useSelector, useDispatch } from "react-redux";
import style from "./index.module.css";
import searchIcon from "../../../../icons/search-icon.png";
import trashIcon from "../../../../icons/delete.png";
import { useEffect, useState } from "react";
import { setResturant, setMenu } from "../../../../states/resturant";
import menuCard from "./menuCard/index";
import axios from "axios";
const Index = () => {
  const dispatch = useDispatch();
  const { resturant } = useSelector((store) => store.resturant);
  const { token } = useSelector((store) => store.user);
  const [newItem, setNewItem] = useState({
    section: null,
    img: null,
    name: null,
    price: null,
  });
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  async function uploadNewItem(index) {
    try {
      console.log(resturant.menu[index][0]);
      setNewItem({ ...newItem, section: resturant.menu[index][0] });
      const formData = new FormData();
      formData.append("image", newItem.img.files[0]); // Assuming newItem.img is a File object
      formData.append("sectionTitle", newItem.section);
      formData.append("name", newItem.name);
      formData.append("price", newItem.price);

      const result = await axios.put(
        "http://localhost:8010/resturantOwner/addItem",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.ok) {
        const resturantData = await result.json();

        dispatch(
          setMenu({
            menu: resturantData.menu,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteItem(itemName, sectionTitle) {
    try {
      const result = await axios.delete(
        "http://localhost:8010/resturantOwner/deleteItem",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            itemName,
            sectionTitle,
          },
        }
      );

      if (result.status === 200) {
        dispatch(
          setMenu({
            menu: result.data.menu,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function addSection() {
    try {
      const response = await fetch(
        `http://localhost:8010/resturantOwner/addSection/${newSectionTitle}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const resturantResponse = await fetch(
          "http://localhost:8010/resturantOwner/getResturant",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (resturantResponse.ok) {
          const resturantData = await resturantResponse.json();

          dispatch(
            setMenu({
              menu: resturantData.resturant.menu,
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteSectionFromMenu(sectionTitle) {
    try {
      const result = await axios.delete(
        `http://localhost:8010/resturantOwner/deleteSection/${sectionTitle}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status === 200) {
        dispatch(
          setMenu({
            menu: result.data.menu,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  return (
    <div>
      <div className={style.header_container}>
        <div className={style.sections_container}>
          {resturant.menu.map((section, index) => (
            <div className={style.sectionTitle_container}>
              <div className={style.title_container}>
                <span id={index} className={style.section}>
                  {section[0]}
                </span>
              </div>
              <div className={style.trashIcon_container}>
                <img
                  src={trashIcon}
                  alt=""
                  className={style.trashIcon}
                  onClick={() => {
                    deleteSectionFromMenu(section[0]);
                  }}
                />
              </div>
            </div>
          ))}
          <div className={style.addSection_container}>
            <button onClick={addSection}>Add Section</button>
            <input
              placeholder="Enter section title"
              onChange={(e) => setNewSectionTitle(e.target.value)}
            />
          </div>
        </div>
        <div className={style.searchBar_container}>
          <div className={style.searchBar}>
            <img src={searchIcon} alt="" />
            <input
              placeholder="What are you carving"
              onChange={handleSearchChange}
            ></input>
          </div>
        </div>
        <div>
          <div className={style.menu_container}>
            {resturant.menu.map((section, index) => (
              <div className={style.section_container} key={index}>
                <div className={style.section_title}>{section[0]}</div>
                <div className={style.food_container}>
                  {section[1]
                    .filter((elm) =>
                      elm.name.toLowerCase().includes(debouncedSearchQuery)
                    )
                    .map((elm, subIndex) =>
                      menuCard(
                        elm.img,
                        elm.name,
                        elm.price,
                        section[0],
                        deleteItem
                      )
                    )}
                  <div className={style.addMeal_container}>
                    <div className={style.addPicture_container}>
                      <input
                        className="newItemImage"
                        accept="image/*"
                        type="file"
                        onChange={(e) =>
                          setNewItem({ ...newItem, img: e.target })
                        }
                      />
                    </div>
                    <div className={style.input_container}>
                      <input
                        placeholder="Enter Name"
                        className="newItemName"
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                      />
                      <input
                        placeholder="Enter Price"
                        className="newItemPrice"
                        onChange={(e) =>
                          setNewItem({ ...newItem, price: e.target.value })
                        }
                      />
                      <button onClick={() => uploadNewItem(index)}>
                        Add To Menu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
