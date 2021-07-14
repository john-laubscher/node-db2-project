// DO YOUR MAGIC
const router = require("express").Router();
const Cars = require("./cars-model");

//routes are connected and working

router.get("/", async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    console.log("inside the get/ router:");
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  console.log("inside the get/:id router:");
  res.json("inside the get/:id router:");
});

router.post("/", async (req, res, next) => {
  console.log("inside the post/ router:");
  res.json("inside the post/ router:");
});

module.exports = router;
