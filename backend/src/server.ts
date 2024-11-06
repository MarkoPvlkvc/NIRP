import express from "express";
import path from "path";
import { Pool } from "pg";

const SERVER_PORT = 3000;

const app = express();
app.use(express.static(path.join(__dirname, "../../frontend")));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ORBaza",
  password: "123456",
  port: 5432,
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../../frontend") });
});

app.get("/database", (req, res) => {
  res.sendFile("database.html", {
    root: path.join(__dirname, "../../frontend"),
  });
});

app.get("/api/get_data", async (req, res) => {
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

    const result = await pool.query(query);

    res.json(result.rows[0].data);
  } catch (error) {
    console.log("Error querying database: ", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve data from the database" });
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
});
