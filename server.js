const { conn, Item } = require("./db");
const express = require("express");
const app = express();

app.get("/api/items", async (req, res, next) => {
  res.send(await Item.findAll());
});

const setup = async () => {
  try {
    await conn.sync({ force: true });

    // create data
    await Promise.all([
      Item.create({ data: 1 }),
      Item.create({ data: 2 }),
      Item.create({ data: 3 }),
    ]);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (ex) {
    console.log(ex);
  }
};

setup();

/*
Notes
1. Start with database
    - npm i pg, sequelize, express
    - nodemon --save-dev
    - touch server.js
2. set up package.json


*/
