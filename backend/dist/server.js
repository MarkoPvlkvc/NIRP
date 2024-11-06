"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const pg_1 = require("pg");
const SERVER_PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend")));
const pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "ORBaza",
    password: "123456",
    port: 5432,
});
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: path_1.default.join(__dirname, "../../frontend") });
});
app.get("/database", (req, res) => {
    res.sendFile("database.html", {
        root: path_1.default.join(__dirname, "../../frontend"),
    });
});
app.get("/api/get_data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT jsonb_agg(result) AS data
      FROM (
        SELECT
          fi.id,
          fi.item_name,
          fi.brand,
          fi.serving_size,
          fi.calories,
          fi.total_fat,
          fi.saturated_fat,
          fi.trans_fat,
          fi.cholesterol,
          fi.sodium,
          json_build_object(
              'total', c.total,
              'dietary_fiber', c.dietary_fiber,
              'sugars', c.sugars,
              'added_sugars', c.added_sugars
          ) AS total_carbohydrates,
          fi.protein,
          json_build_object(
              'vitamin_a', vm.vitamin_a,
              'vitamin_c', vm.vitamin_c,
              'calcium', vm.calcium,
              'iron', vm.iron
          ) AS vitamins_and_minerals,
          (SELECT json_agg(allergen) FROM allergens a WHERE a.food_item_id = fi.id) AS allergens
        FROM
          food_items fi
        JOIN
          carbohydrates c ON fi.id = c.food_item_id
        JOIN
          vitamins_and_minerals vm ON fi.id = vm.food_item_id
      ) result;
    `;
        const result = yield pool.query(query);
        res.json(result.rows[0].data);
    }
    catch (error) {
        console.log("Error querying database: ", error);
        res
            .status(500)
            .json({ error: "Failed to retrieve data from the database" });
    }
}));
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
});
