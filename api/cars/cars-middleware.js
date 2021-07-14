const Cars = require("../cars/cars-model");
var vinValidator = require("vin-validator");

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function checkCarId(req, res, next) {
  try {
    const car = await Cars.getById(req.params.id);
    if (!car) {
      next({ status: 404, message: `car with id ${req.params.id} is not found` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    res.status(404).json({
      message: "no such project",
    });
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  try {
    if (!vin) {
      next({ status: 400, message: `vin is missing` });
    } else {
      if (!make) {
        next({ status: 400, message: "make is missing" });
      } else {
        if (!model) {
          next({ status: 400, message: "model is missing" });
        } else {
          if (!mileage) {
            next({ status: 400, message: "mileage is missing" });
          } else {
            next();
          }
        }
      }
    }
  } catch (err) {
    res.status(404).json({
      message: "invalid credentials",
    });
  }
};

const checkVinNumberValid = (req, res, next) => {
  try {
    var validVin = vinValidator.validate(req.body.vin);
    if (!validVin) {
      next({ status: 400, message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (err) {
    res.status(404).json({
      message: "invalid credentials",
    });
  }
};

async function checkVinNumberUnique(req, res, next) {
  try {
    const allCars = await Cars.getAll();
    const data = allCars.filter((car) => {
      if (car.vin === req.body.vin) {
        return req.body.vin;
      }
    });

    if (data.length > 0) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

//   message: "vin <vin number> already exists"

module.exports = {
  logger,
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
