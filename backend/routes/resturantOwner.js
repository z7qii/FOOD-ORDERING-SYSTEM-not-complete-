import express from "express";
import multer from "multer";
import {
  addResturant,
  addItemToMenu,
  deleteItemFromMenu,
  addSectionToMenu,
  deleteSectionFromMenu,
  getMenu,
  getResturant,
} from "../controllers/resturantOwner.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/addResturant", addResturant);
router.put("/addSection/:name", verifyToken, addSectionToMenu);
router.delete("/deleteSection/:name", verifyToken, deleteSectionFromMenu);
router.delete("/deleteItem", verifyToken, deleteItemFromMenu);
router.get("/getResturant", verifyToken, getResturant);
router.get("/getMenu", verifyToken, getMenu);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imgs/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.put("/addItem", verifyToken, upload.single("image"), addItemToMenu);
export default router;
