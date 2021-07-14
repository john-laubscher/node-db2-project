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

const create = () => {
  console.log("inside create model:");
};

module.exports = {
  getAll,
  getById,
  create,
};
