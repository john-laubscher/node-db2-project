const db = require("../../data/db-config");

async function getAll() {
  // SELECT * FROM posts;
  // const records = await db.raw('SELECT * FROM posts;')
  // const records = await db.select().from('posts')
  const cars = await db("cars");
  console.log("inside the getAll model:", cars);
  return cars;
}

async function getById(id) {
  console.log("inside getById model:");
  const record = await db("cars").where("id", id).first();
  return record;
}

async function create(newCar) {
  const [id] = await db("cars").insert(newCar);
  const newlyCreatedCar = await getById(id);
  return newlyCreatedCar;
}

module.exports = {
  getAll,
  getById,
  create,
};
