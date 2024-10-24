@echo off
setlocal

set OUTPUT_FILE=%~dp0naziv_skupa.csv

docker exec -u postgres ORBaza psql -d ORBaza -c ^"COPY ( ^
    SELECT ^
        fi.id, ^
        fi.item_name, ^
        fi.brand, ^
        fi.serving_size, ^
        fi.calories, ^
        fi.total_fat, ^
        fi.saturated_fat, ^
        fi.trans_fat, ^
        fi.cholesterol, ^
        fi.sodium, ^
        c.total AS total_carbohydrates_total, ^
        c.dietary_fiber AS total_carbohydrates_dietary_fiber, ^
        c.sugars AS total_carbohydrates_sugars, ^
        c.added_sugars AS total_carbohydrates_added_sugars, ^
        fi.protein, ^
        vm.vitamin_a AS vitamins_and_minerals_vitamin_a, ^
        vm.vitamin_c AS vitamins_and_minerals_vitamin_c, ^
        vm.calcium AS vitamins_and_minerals_calcium, ^
        vm.iron AS vitamins_and_minerals_iron, ^
        (SELECT string_agg(allergen, ', ') FROM allergens a WHERE a.food_item_id = fi.id) AS allergens ^
    FROM ^
        food_items fi ^
    JOIN ^
        carbohydrates c ON fi.id = c.food_item_id ^
    JOIN ^
        vitamins_and_minerals vm ON fi.id = vm.food_item_id ^
) TO STDOUT WITH CSV HEADER;^" > "%OUTPUT_FILE%"

echo CSV output written to %OUTPUT_FILE%

endlocal
