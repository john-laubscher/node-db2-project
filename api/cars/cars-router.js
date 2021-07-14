const router = require("express").Router();
const Cars = require("./cars-model");
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("../cars/cars-middleware");

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

router.get("/:id", checkCarId, async (req, res, next) => {
  console.log("inside the get/:id router:");
  Cars.getById(req.params.id)
    .then((car) => {
      res.json(car);
    })
    .catch(next);
});

router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
  try {
    const newCar = await Cars.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something tragic inside posts router happned",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
