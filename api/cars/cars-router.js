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
  Cars.getById(req.params.id)
    .then((car) => {
      res.json(car);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  console.log("inside the post/ router:");
  res.json("inside the post/ router:");
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something tragic inside posts router happned",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
