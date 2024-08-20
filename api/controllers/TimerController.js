const Time = require("../models/TimerModel");

const submit = async (req, res) => {
  const { user_id } = req.params;
  const { time } = req.body;

  if (time == null) {
    return res.status(400).json({ message: "Missing time in request body" });
  }

  const newTime = new Time({ user_id, time });

  try {
    const time = await newTime.save();
    res.status(201).json(time);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "erreur server" });
  }
};

const getByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const time = await Time.findOne({ _id: user_id });
    console.log(user_id);

    if (!time) {
      return res.status(404).json({ message: "Time entry not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "erreur server" });
  }
};

const getAll = async (req, res) => {
  try {
    const time = await Time.find({});

    res.status(200).json(time);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "erreur server" });
  }
};

module.exports = { submit, getByUserId, getAll };
