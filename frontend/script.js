window.onload = async () => {
  const table = document.getElementById("table");

  const response = await fetch("/api/get_data");
  const data = await response.json();

  data.forEach((row) => {
    const tr = document.createElement("tr");
    const id_shortened = row.id.substring(0, 8) + "...";

    tr.innerHTML = `
      <td title=${row.id}>${id_shortened}</td>
      <td>${row.item_name}</td>
      <td style="${row.brand == null ? "color: hsl(0, 0%, 40%)" : ""}">${
      row.brand == null ? "null" : row.brand
    }</td>
      <td>${row.serving_size}</td>
      <td>${row.calories}</td>
      <td>${row.total_fat}</td>
      <td>${row.saturated_fat}</td>
      <td>${row.trans_fat}</td>
      <td>${row.cholesterol}</td>
      <td>${row.sodium}</td>
      <td>${row.total_carbohydrates.total}</td>
      <td>${row.total_carbohydrates.dietary_fiber}</td>
      <td>${row.total_carbohydrates.sugars}</td>
      <td>${row.total_carbohydrates.added_sugars}</td>
      <td>${row.protein}</td>
      <td>${row.vitamins_and_minerals.vitamin_a}</td>
      <td>${row.vitamins_and_minerals.vitamin_c}</td>
      <td>${row.vitamins_and_minerals.calcium}</td>
      <td>${row.vitamins_and_minerals.iron}</td>
      <td style="${row.allergens[0] == null ? "color: hsl(0, 0%, 40%)" : ""}">${
      row.allergens[0] != null ? row.allergens : "null"
    }</td>
    `;

    table.appendChild(tr);

    addScrollListener();
  });
};

function addScrollListener() {
  const scrollableContainer = document.getElementById("scrollable-container");
  const gradientRight = document.getElementById("gradient-right");
  const gradientLeft = document.getElementById("gradient-left");

  scrollableContainer.addEventListener("scroll", function () {
    const scrollLeft = scrollableContainer.scrollLeft;
    gradientRight.style.transform = `translateX(${scrollLeft}px)`;
    gradientLeft.style.transform = `translateX(${scrollLeft}px)`;
  });
}
