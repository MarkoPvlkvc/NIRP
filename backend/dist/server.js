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
const dotenv_1 = __importDefault(require("dotenv"));
const SERVER_PORT = 3000;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend")));
app.use(express_1.default.json());
const pool = new pg_1.Pool({
    user: "postgres",
    host: process.env.DB_HOST || "localhost",
    database: "ORBaza",
    password: "123456",
    port: 5432,
});
app.get("/", (req, res) => {
    res.sendFile("index.html", {
        root: path_1.default.join(__dirname, "../../frontend"),
    });
});
app.get("/database", (req, res) => {
    res.sendFile("database.html", {
        root: path_1.default.join(__dirname, "../../frontend"),
    });
});
// Serve OpenAPI specification
app.get("/openapi.json", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../openapi.json"));
});
app.get("/api/v1/get_items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Check if data exists
        if (result.rows.length === 0) {
            res.status(404).json({
                status: "Not Found",
                message: "No data found in database.",
                response: null,
            });
        }
        res.status(200).json({
            status: "OK",
            message: "Fetched all data from database.",
            response: result.rows[0].data,
        });
    }
    catch (error) {
        console.log("Error querying database: ", error);
        res.status(500).json({
            status: "Error",
            message: "Failed to retrieve data from the database",
            response: null,
        });
    }
}));
app.get("/api/v1/get_items/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
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
      WHERE
        fi.id = $1
    ) result;
  `;
        const result = yield pool.query(query, [id]);
        // Check if data exists
        if (result.rows.length === 0) {
            res.status(404).json({
                status: "Not Found",
                message: "No data found for the specified id.",
                response: null,
            });
        }
        res.json({
            status: "OK",
            message: "Fetched item from database with specified id.",
            response: result.rows[0].data,
        });
    }
    catch (error) {
        console.log("Error querying database: ", error);
        res.status(500).json({
            status: "Error",
            message: "Failed to retrieve data from the database",
            response: null,
        });
    }
}));
app.get("/api/v1/get_items_with_allergens/:allergen", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { allergen } = req.params;
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
  ) result
   WHERE EXISTS (
          SELECT 1
          FROM json_array_elements_text(result.allergens) AS allergen
          WHERE allergen = $1
        );
`;
        const result = yield pool.query(query, [allergen]);
        // Check if data exists
        if (result.rows.length === 0) {
            res.status(404).json({
                status: "Not Found",
                message: "No data found for the specified allergen.",
                response: null,
            });
        }
        res.json({
            status: "OK",
            message: "Fetched all data wth specified allergen.",
            response: result.rows[0].data,
        });
    }
    catch (error) {
        console.log("Error querying database: ", error);
        res.status(500).json({
            status: "Error",
            message: "Failed to retrieve data from the database",
            response: null,
        });
    }
}));
app.get("/api/v1/get_items_with_serving_size/:serving_size", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serving_size } = req.params;
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
    WHERE
      fi.serving_size = $1
  ) result;
`;
        const result = yield pool.query(query, [serving_size + "g"]);
        // Check if data exists
        if (result.rows.length === 0) {
            res.status(404).json({
                status: "Not Found",
                message: "No data found for the specified serving size.",
                response: null,
            });
        }
        res.json({
            status: "OK",
            message: "Fetched all data wth specified serving size.",
            response: result.rows[0].data,
        });
    }
    catch (error) {
        console.log("Error querying database: ", error);
        res.status(500).json({
            status: "Error",
            message: "Failed to retrieve data from the database",
            response: null,
        });
    }
}));
app.get("/api/v1/get_items_with_no_cholesterol", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    WHERE
      fi.cholesterol = '0mg'
  ) result;
`;
        const result = yield pool.query(query);
        // Check if data exists
        if (result.rows.length === 0) {
            res.status(404).json({
                status: "Not Found",
                message: "No data found with no cholesterol.",
                response: null,
            });
        }
        res.json({
            status: "OK",
            message: "Fetched all data with no cholesterol.",
            response: result.rows[0].data,
        });
    }
    catch (error) {
        console.log("Error querying database: ", error);
        res.status(500).json({
            status: "Error",
            message: "Failed to retrieve data from the database",
            response: null,
        });
    }
}));
app.post("/api/v1/add_item", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure the item details from the request body
        const { item_name, brand, serving_size, calories, total_fat, saturated_fat, trans_fat, cholesterol, sodium, protein, total_carbohydrates, // This would be an object with keys like total, dietary_fiber, sugars, etc.
        vitamins_and_minerals, // This would be an object with keys like vitamin_a, vitamin_c, calcium, iron, etc.
        allergens, // This would be an array of allergens
         } = req.body;
        // Check if all required fields are provided
        const missingFields = [];
        if (!item_name)
            missingFields.push("item_name");
        if (!serving_size)
            missingFields.push("serving_size");
        if (!calories)
            missingFields.push("calories");
        if (total_fat === undefined)
            missingFields.push("total_fat");
        if (saturated_fat === undefined)
            missingFields.push("saturated_fat");
        if (trans_fat === undefined)
            missingFields.push("trans_fat");
        if (cholesterol === undefined)
            missingFields.push("cholesterol");
        if (sodium === undefined)
            missingFields.push("sodium");
        if (protein === undefined)
            missingFields.push("protein");
        if (!total_carbohydrates ||
            !total_carbohydrates.total ||
            !total_carbohydrates.dietary_fiber ||
            !total_carbohydrates.sugars ||
            !total_carbohydrates.added_sugars) {
            missingFields.push("total_carbohydrates (total, dietary_fiber, sugars, added_sugars)");
        }
        if (!vitamins_and_minerals ||
            !vitamins_and_minerals.vitamin_a ||
            !vitamins_and_minerals.vitamin_c ||
            !vitamins_and_minerals.calcium ||
            !vitamins_and_minerals.iron) {
            missingFields.push("vitamins_and_minerals (vitamin_a, vitamin_c, calcium, iron)");
        }
        if (missingFields.length > 0) {
            res.status(400).json({
                status: "Bad Request",
                message: `Missing required fields: ${missingFields.join(", ")}`,
                response: null,
            });
            return;
        }
        // Default brand to null if not provided
        const itemBrand = brand || null;
        // Default allergens to an empty array if not provided
        var itemAllergens = allergens || [];
        itemAllergens = itemAllergens.map((allergen) => allergen.toLowerCase());
        // Add units to the numbers
        const formattedServingSize = `${serving_size}g`; // Add "g" to serving size
        const formattedTotalFat = `${total_fat}g`;
        const formattedSaturatedFat = `${saturated_fat}g`;
        const formattedTransFat = `${trans_fat}g`;
        const formattedProtein = `${protein}g`;
        const formattedCholesterol = `${cholesterol}mg`;
        const formattedSodium = `${sodium}mg`;
        const formattedVitaminsAndMinerals = {
            vitamin_a: `${vitamins_and_minerals.vitamin_a}%`,
            vitamin_c: `${vitamins_and_minerals.vitamin_c}%`,
            calcium: `${vitamins_and_minerals.calcium}%`,
            iron: `${vitamins_and_minerals.iron}%`,
        };
        const formattedTotalCarbohydrates = {
            total: `${total_carbohydrates.total}g`,
            dietary_fiber: `${total_carbohydrates.dietary_fiber}g`,
            sugars: `${total_carbohydrates.sugars}g`,
            added_sugars: `${total_carbohydrates.added_sugars}g`,
        };
        // Transaction to insert the new food item and related data
        const client = yield pool.connect();
        try {
            yield client.query("BEGIN"); // Start a transaction
            // Insert the food item into the 'food_items' table
            const foodItemResult = yield client.query(`INSERT INTO food_items (item_name, brand, serving_size, calories, total_fat, saturated_fat, trans_fat, cholesterol, sodium, protein)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`, [
                item_name,
                itemBrand,
                formattedServingSize,
                calories,
                formattedTotalFat,
                formattedSaturatedFat,
                formattedTransFat,
                formattedCholesterol,
                formattedSodium,
                formattedProtein,
            ]);
            const foodItemId = foodItemResult.rows[0].id;
            // Insert the total carbohydrates into the 'carbohydrates' table
            if (total_carbohydrates) {
                yield client.query(`INSERT INTO carbohydrates (food_item_id, total, dietary_fiber, sugars, added_sugars)
           VALUES ($1, $2, $3, $4, $5)`, [
                    foodItemId,
                    formattedTotalCarbohydrates.total,
                    formattedTotalCarbohydrates.dietary_fiber,
                    formattedTotalCarbohydrates.sugars,
                    formattedTotalCarbohydrates.added_sugars,
                ]);
            }
            // Insert the vitamins and minerals into the 'vitamins_and_minerals' table
            if (vitamins_and_minerals) {
                yield client.query(`INSERT INTO vitamins_and_minerals (food_item_id, vitamin_a, vitamin_c, calcium, iron)
           VALUES ($1, $2, $3, $4, $5)`, [
                    foodItemId,
                    formattedVitaminsAndMinerals.vitamin_a,
                    formattedVitaminsAndMinerals.vitamin_c,
                    formattedVitaminsAndMinerals.calcium,
                    formattedVitaminsAndMinerals.iron,
                ]);
            }
            // Insert allergens into the 'allergens' table
            if (itemAllergens && Array.isArray(itemAllergens)) {
                for (const allergen of itemAllergens) {
                    yield client.query(`INSERT INTO allergens (food_item_id, allergen)
             VALUES ($1, $2)`, [foodItemId, allergen]);
                }
            }
            // Commit the transaction
            yield client.query("COMMIT");
            // Respond with success
            res.status(201).json({
                status: "Created",
                message: "New item successfully added",
                response: { id: foodItemId, item_name },
            });
        }
        catch (error) {
            // Rollback in case of an error
            yield client.query("ROLLBACK");
            console.error("Error inserting data: ", error);
            res.status(500).json({
                status: "Internal Server Error",
                message: "An error occurred while adding the item",
                response: null,
            });
        }
        finally {
            client.release(); // Release the client back to the pool
        }
    }
    catch (error) {
        console.error("Error in POST request: ", error);
        res.status(500).json({
            status: "Internal Server Error",
            message: "An error occurred while processing the request",
            response: null,
        });
    }
}));
app.put("/api/v1/update_item/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { item_name, brand, serving_size, calories, total_fat, saturated_fat, trans_fat, cholesterol, sodium, total_carbohydrates, protein, vitamins_and_minerals, allergens, } = req.body;
    // Check if all required fields are provided
    const missingFields = [];
    if (!item_name)
        missingFields.push("item_name");
    if (!serving_size)
        missingFields.push("serving_size");
    if (!calories)
        missingFields.push("calories");
    if (total_fat === undefined)
        missingFields.push("total_fat");
    if (saturated_fat === undefined)
        missingFields.push("saturated_fat");
    if (trans_fat === undefined)
        missingFields.push("trans_fat");
    if (cholesterol === undefined)
        missingFields.push("cholesterol");
    if (sodium === undefined)
        missingFields.push("sodium");
    if (protein === undefined)
        missingFields.push("protein");
    if (!total_carbohydrates ||
        !total_carbohydrates.total ||
        !total_carbohydrates.dietary_fiber ||
        !total_carbohydrates.sugars ||
        !total_carbohydrates.added_sugars) {
        missingFields.push("total_carbohydrates (total, dietary_fiber, sugars, added_sugars)");
    }
    if (!vitamins_and_minerals ||
        !vitamins_and_minerals.vitamin_a ||
        !vitamins_and_minerals.vitamin_c ||
        !vitamins_and_minerals.calcium ||
        !vitamins_and_minerals.iron) {
        missingFields.push("vitamins_and_minerals (vitamin_a, vitamin_c, calcium, iron)");
    }
    // If any fields are missing, respond with Bad Request
    if (missingFields.length > 0) {
        res.status(400).json({
            status: "Bad Request",
            message: `Missing required fields: ${missingFields.join(", ")}`,
            response: null,
        });
        return;
    }
    try {
        // Check if the food item exists
        const checkItemQuery = `SELECT id FROM food_items WHERE id = $1`;
        const checkItemResult = yield pool.query(checkItemQuery, [id]);
        if (checkItemResult.rows.length === 0) {
            // If the food item does not exist, return a 404 Not Found response
            res.status(404).json({
                status: "Not Found",
                message: `Item with ID ${id} does not exist`,
                response: null,
            });
            return;
        }
        // Begin transaction to update the item and related records
        const client = yield pool.connect();
        try {
            yield client.query("BEGIN"); // Start transaction
            // Update the food_items table
            const updateFoodItemQuery = `
        UPDATE food_items
        SET item_name = $1, brand = $2, serving_size = $3, calories = $4, total_fat = $5, saturated_fat = $6, trans_fat = $7, cholesterol = $8, sodium = $9, protein = $10
        WHERE id = $11
      `;
            yield client.query(updateFoodItemQuery, [
                item_name,
                brand,
                serving_size,
                calories,
                total_fat,
                saturated_fat,
                trans_fat,
                cholesterol,
                sodium,
                protein,
                id,
            ]);
            // Update the total_carbohydrates JSON object
            const updateCarbohydratesQuery = `
        UPDATE carbohydrates
        SET total = $1, dietary_fiber = $2, sugars = $3, added_sugars = $4
        WHERE food_item_id = $5
      `;
            yield client.query(updateCarbohydratesQuery, [
                total_carbohydrates.total,
                total_carbohydrates.dietary_fiber,
                total_carbohydrates.sugars,
                total_carbohydrates.added_sugars,
                id,
            ]);
            // Update the vitamins_and_minerals JSON object
            const updateVitaminsQuery = `
        UPDATE vitamins_and_minerals
        SET vitamin_a = $1, vitamin_c = $2, calcium = $3, iron = $4
        WHERE food_item_id = $5
      `;
            yield client.query(updateVitaminsQuery, [
                vitamins_and_minerals.vitamin_a,
                vitamins_and_minerals.vitamin_c,
                vitamins_and_minerals.calcium,
                vitamins_and_minerals.iron,
                id,
            ]);
            // Update allergens table, handle empty array case
            yield client.query("DELETE FROM allergens WHERE food_item_id = $1", [id]);
            if (allergens && allergens.length > 0) {
                const insertAllergenQuery = "INSERT INTO allergens (food_item_id, allergen) VALUES ($1, $2)";
                for (let allergen of allergens) {
                    yield client.query(insertAllergenQuery, [id, allergen]);
                }
            }
            // Commit transaction
            yield client.query("COMMIT");
            // Respond with success
            res.status(200).json({
                status: "OK",
                message: `Item with ID ${id} successfully updated`,
                response: null,
            });
        }
        catch (error) {
            // Rollback transaction if an error occurs
            yield client.query("ROLLBACK");
            console.error("Error updating data: ", error);
            res.status(500).json({
                status: "Internal Server Error",
                message: "An error occurred while updating the item",
                response: null,
            });
        }
        finally {
            client.release(); // Release client back to the pool
        }
    }
    catch (error) {
        console.error("Error in PUT request: ", error);
        res.status(500).json({
            status: "Internal Server Error",
            message: "An error occurred while processing the request",
            response: null,
        });
    }
}));
app.delete("/api/v1/delete_item/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Get the item ID from the URL
        // First, check if the item exists
        const checkItemQuery = `SELECT id FROM food_items WHERE id = $1`;
        const checkItemResult = yield pool.query(checkItemQuery, [id]);
        if (checkItemResult.rows.length === 0) {
            // If the item doesn't exist, return a 404 Not Found error
            res.status(404).json({
                status: "Not Found",
                message: `Item with ID ${id} does not exist`,
                response: null,
            });
            return;
        }
        // Start a transaction to delete the item and related records in other tables
        const client = yield pool.connect();
        try {
            yield client.query("BEGIN"); // Start the transaction
            // Delete related records in the allergens, carbohydrates, and vitamins_and_minerals tables first
            yield client.query("DELETE FROM allergens WHERE food_item_id = $1", [id]);
            yield client.query("DELETE FROM carbohydrates WHERE food_item_id = $1", [
                id,
            ]);
            yield client.query("DELETE FROM vitamins_and_minerals WHERE food_item_id = $1", [id]);
            // Finally, delete the item from the food_items table
            yield client.query("DELETE FROM food_items WHERE id = $1", [id]);
            // Commit the transaction
            yield client.query("COMMIT");
            // Respond with success
            res.status(200).json({
                status: "OK",
                message: `Item with ID ${id} successfully deleted`,
                response: null,
            });
        }
        catch (error) {
            // Rollback if any errors occur during the transaction
            yield client.query("ROLLBACK");
            console.error("Error deleting data: ", error);
            res.status(500).json({
                status: "Internal Server Error",
                message: "An error occurred while deleting the item",
                response: null,
            });
        }
        finally {
            client.release(); // Release the client back to the pool
        }
    }
    catch (error) {
        console.error("Error in DELETE request: ", error);
        res.status(500).json({
            status: "Internal Server Error",
            message: "An error occurred while processing the request",
            response: null,
        });
    }
}));
// Catch-all handler for unsupported routes
app.all("/api/v1/*", (req, res, next) => {
    res.status(501).json({
        status: "Not Implemented",
        message: `Method ${req.method} not implemented for requested resource`,
        response: null,
    });
    next();
});
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
});
