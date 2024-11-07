@echo off
setlocal

set OUTPUT_FILE=%~dp0NIRP.json

docker exec -u postgres ORBaza psql -d ORBaza -t -A -c ^" ^
    SELECT jsonb_pretty(jsonb_agg(result)) ^
    FROM ( ^
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
            json_build_object( ^
                'total', c.total, ^
                'dietary_fiber', c.dietary_fiber, ^
                'sugars', c.sugars, ^
                'added_sugars', c.added_sugars ^
            ) AS total_carbohydrates, ^
            fi.protein, ^
            json_build_object( ^
                'vitamin_a', vm.vitamin_a, ^
                'vitamin_c', vm.vitamin_c, ^
                'calcium', vm.calcium, ^
                'iron', vm.iron ^
            ) AS vitamins_and_minerals, ^
            (SELECT json_agg(allergen) FROM allergens a WHERE a.food_item_id = fi.id) AS allergens ^
        FROM ^
            food_items fi ^
        JOIN ^
            carbohydrates c ON fi.id = c.food_item_id ^
        JOIN ^
            vitamins_and_minerals vm ON fi.id = vm.food_item_id ^
    ) result; ^ > %OUTPUT_FILE%

echo Pretty JSON output written to %OUTPUT_FILE%

endlocal