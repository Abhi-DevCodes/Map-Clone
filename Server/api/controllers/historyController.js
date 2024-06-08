import History from "../models/historyModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

export const addHistoryController = async (req, res) => {
  //to add keyword to history collection
  const email = req.body.email;
  const keyword = req.body.keyword;
  if (!email || !keyword) {
    res.status(400).json({ message: "inadequate data" });
  }
  try {
    const newHistory = new History();
    newHistory.email = email;
    newHistory.keyword = req.body.keyword;
    newHistory.save();
    //console.log("History Added");
    res.status(201).json({ message: "History Added" });
  } catch (err) {
    return res.status(500).json({ message: "could not add search history" });
  }
};

export const fetchHistoryController = async (req, res) => {
  //to retrieve keywords for suggestion
  const email = req.body.email;
  try {
    const historyObject = await History.find({ email: email });
    //console.log(historyObject);
    res.status(200).json({ details: historyObject });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteHistoryController = async (req, res) => {
  //to delete keyword from history collection
  const email = req.body.email;
  const keyword = req.body.keyword;
  try {
    const historyObject = await History.deleteMany({
      email: email,
      keyword: keyword,
    });
    if (historyObject.deletedCount == 0) {
      res.status(404).json({ message: "History Not Found" });
    } else {
      res.status(200).json({ message: "History Deleted" });
      //console.log(historyObject);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
