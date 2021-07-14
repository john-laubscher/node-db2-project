const Cars = require("../cars/cars-model");
var vinValidator = require("vin-validator");
var isValidVin = vinValidator.validate("11111111111111111");

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
  const fieldName = {
    vin: req.body.vin,
    make: req.body.make,
    model: req.body.model,
    mileage: req.body.mileage,
  };
  if (!fieldName) {
    next({ message: `${fieldName} is missing` });
  } else {
    next();
  }

  // if (!req.body.vin || req.body.make || req.body.model || req.body.mileage) {
  //   next({ message: `${fieldName} is missing` });
  // } else {
  //   next();
  // }
};

const checkVinNumberValid = (req, res, next) => {
  if (req.body.vin == !isValidVin) {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
};

async function checkVinNumberUnique(req, res, next) {
  try {
    const existingVin = await Cars.getById(req.params.id);
    if (existingVin) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      req.body = existingVin;
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
