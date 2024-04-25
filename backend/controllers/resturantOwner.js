import ResturantOwner from "../models/resturantOwner.js";
import Resturant from "../models/Resturant.js";

export const addResturant = async (req, res) => {
  try {
    const resturant = new Resturant({
      ownerEmail: req.body.ownerEmail,
      resturantName: req.body.resturantName,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      backgroundImg: req.body.backgroundImg,
      resturantImg: req.body.resturantImg,
      minOrder: req.body.minOrder,
      deliveryTime: req.body.deliveryTime,
      openTime: req.body.openTime,
      location: req.body.location,
    });
    const savedResturant = await resturant.save();
    res.status(200).json(savedResturant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMenu = async (req, res) => {
  try {
    const resturantOwner = await ResturantOwner.findOne({ _id: req.user.id });
    const resturant = await Resturant.findOne({
      ownerEmail: resturantOwner.email,
    });

    if (!resturantOwner || !resturant)
      res.status(400).json({ message: "resturant not found" });
    else res.status(200).json({ menu: resturant.menu });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getResturant = async (req, res) => {
  try {
    const resturantOwner = await ResturantOwner.findOne({ _id: req.user.id });
    const resturant = await Resturant.findOne({
      ownerEmail: resturantOwner.email,
    });

    if (!resturantOwner || !resturant)
      res.status(400).json({ message: "resturant not found" });
    else res.status(200).json({ resturant: resturant });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const addItemToMenu = async (req, res) => {
  try {
    const resturantOwner = await ResturantOwner.findOne({ _id: req.user.id });
    const resturant = await Resturant.findOne({
      ownerEmail: resturantOwner.email,
    });

    if (!resturantOwner || !resturant) {
      return res.status(400).json({ message: "Restaurant not found" });
    }
    console.log(req.file.filename);
    if (resturant.menu.has(req.body.sectionTitle)) {
      resturant.menu.get(req.body.sectionTitle).push({
        name: req.body.name,
        price: req.body.price,
        img: req.file.filename,
      });
    } else {
      return res.status(400).json({ message: "Section not found" });
    }
    resturant.markModified("menu");
    await resturant.save();
    return res.status(200).json({ menu: resturant.menu });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteItemFromMenu = async (req, res) => {
  try {
    // Fetching the restaurant owner and restaurant details
    const resturantOwner = await ResturantOwner.findOne({ _id: req.user.id });
    const resturant = await Resturant.findOne({
      ownerEmail: resturantOwner.email,
    });

    // If either the restaurant owner or restaurant cannot be found, return an error
    if (!resturantOwner || !resturant) {
      return res.status(400).json({ message: "Restaurant not found" });
    }

    // Extracting the section title and item name from request parameters or body
    const { sectionTitle, itemName } = req.body; // Adjust based on how you're sending data

    // Check if the section exists
    if (resturant.menu.has(sectionTitle)) {
      // Find the index of the item to be deleted
      const itemIndex = resturant.menu
        .get(sectionTitle)
        .findIndex((item) => item.name === itemName);

      // If the item exists, remove it
      if (itemIndex > -1) {
        resturant.menu.get(sectionTitle).splice(itemIndex, 1);
        resturant.markModified("menu");
        await resturant.save();
        return res.status(200).json({ menu: resturant.menu });
      } else {
        return res.status(400).json({ message: "Item not found" });
      }
    } else {
      return res.status(400).json({ message: "Section not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addSectionToMenu = async (req, res) => {
  try {
    const resturantOwner = await ResturantOwner.findOne({ _id: req.user.id });
    const resturant = await Resturant.findOne({
      ownerEmail: resturantOwner.email,
    });

    if (!resturantOwner || !resturant)
      res.status(400).json({ message: "resturant not found" });

    if (resturant.menu.has(req.params.name))
      res.status(400).json({ message: "section already exist" });
    else {
      resturant.menu.set(req.params.name, []);

      resturant.markModified("menu");
      await resturant.save();

      res.status(200).json({ menu: resturant.menu });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSectionFromMenu = async (req, res) => {
  try {
    const resturantOwner = await ResturantOwner.findOne({ _id: req.user.id });
    const resturant = await Resturant.findOne({
      ownerEmail: resturantOwner.email,
    });

    if (!resturantOwner || !resturant)
      res.status(400).json({ message: "resturant not found" });

    if (resturant.menu.has(req.params.name)) {
      resturant.menu.delete(req.params.name);
      resturant.markModified("menu");
      await resturant.save();
      res.status(200).json({ menu: resturant.menu });
    } else res.status(400).json({ message: "section does not exist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
