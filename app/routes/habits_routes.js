const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;
const Habit = require("../models/Habit");

router.get("/habits", (req, res) => {
  Habit.collection.find().toArray((err, data) => {
    if (err) {
      res.send({ error: "An error has occurred" });
    } else {
      res.send(data);
    }
  });
});

router.get("/habits/:id", (req, res) => {
  const id = req.params.id;
  const details = {
    _id: new ObjectID(id)
  };

  Habit.collection.findOne(details, (err, item) => {
    if (err) {
      res.send({ error: "An error has occurred" });
    } else {
      res.send(item);
    }
  });
});

router.post("/habits", async (req, res) => {
  try {
    const habit = new Habit(req.body);

    await habit.save();

    res.status(201).send({ habit });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/habits/:id", async (req, res) => {
  const newDates = req.body.dates.map(dateItem =>
    new Date(dateItem).toString()
  );

  const habit = await Habit.findOne({ _id: req.params.id });

  if (habit.dates.length) {
    habit.dates.forEach(dateItem => {
      const stringified = dateItem.toString();

      if (newDates.includes(stringified)) {
        newDates.splice(newDates.indexOf(stringified), 1);
      } else {
        newDates.push(stringified);
      }
    });

    habit.dates = newDates;
  } else {
    habit.dates = newDates;
  }

  await habit.save();

  res.status(200).send(habit);
});

router.delete("/habits/:id", async (req, res) => {
  Habit.findByIdAndRemove(req.params.id, (err, habit) => {
    if (err) return res.status(500).send(err);

    const response = {
      message: "Habit successfully deleted",
      id: habit._id
    };

    return res.status(200).send(response);
  });
});

module.exports = router;
