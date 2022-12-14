const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_numbers_db"
);

const { INTEGER, VIRTUAL } = Sequelize;

const Item = conn.define("item", {
  data: {
    type: INTEGER,
    allowNull: false,
  },
  isOdd: {
    type: VIRTUAL,
    get: function () {
      return this.data % 2 === 1;
    },
  },
  isEven: {
    type: VIRTUAL,
    get: function () {
      return !this.isOdd;
    },
  },
});

module.exports = {
  conn,
  Item,
};
