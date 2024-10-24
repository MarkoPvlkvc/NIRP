import pandas as pd
import psycopg2
from psycopg2 import sql

# Database connection parameters
DB_HOST = 'localhost'
DB_NAME = 'ORBaza'
DB_USER = 'postgres'
DB_PASS = '123456'

def insert_food_data(file_path):
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASS)
    cursor = conn.cursor()

    # Read the CSV file
    df = pd.read_csv(file_path)

    for index, row in df.iterrows():
        # Step 1: Insert into food_items and get the generated UUID
        cursor.execute("""
            INSERT INTO food_items (item_name, brand, serving_size, calories, total_fat, 
                                    saturated_fat, trans_fat, cholesterol, sodium, protein)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
        """, (
            row['item_name'],
            row['brand'] if pd.notna(row['brand']) else None,
            row['serving_size'],
            row['calories'],
            row['total_fat'],
            row['saturated_fat'],
            row['trans_fat'],
            row['cholesterol'],
            row['sodium'],
            row['protein']
        ))

        last_food_id = cursor.fetchone()[0]  # Fetch the returned UUID

        # Step 2: Insert into carbohydrates
        cursor.execute("""
            INSERT INTO carbohydrates (food_item_id, total, dietary_fiber, sugars, added_sugars)
            VALUES (%s, %s, %s, %s, %s);
        """, (
            last_food_id,
            row['total_carb'],
            row['dietary_fiber'],
            row['sugars'],
            row['added_sugars']
        ))

        # Step 3: Insert into vitamins_and_minerals
        cursor.execute("""
            INSERT INTO vitamins_and_minerals (food_item_id, vitamin_a, vitamin_c, calcium, iron)
            VALUES (%s, %s, %s, %s, %s);
        """, (
            last_food_id,
            row['vitamin_a'],
            row['vitamin_c'],
            row['calcium'],
            row['iron']
        ))

        # Step 4: Insert into allergens (check if allergen is not NULL)
        allergen = row['allergen'] if pd.notna(row['allergen']) else None
        cursor.execute("""
            INSERT INTO allergens (food_item_id, allergen)
            VALUES (%s, %s);
        """, (
            last_food_id,
            allergen
        ))

    # Commit the transaction and close the connection
    conn.commit()
    cursor.close()
    conn.close()

# Replace with the path to your CSV file
insert_food_data('./items.csv')