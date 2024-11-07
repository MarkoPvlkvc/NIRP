window.onload = async () => {
  const table = document.getElementById("table");

  const response = await fetch("/api/get_data");
  const data = await response.json();

  data.forEach((row) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td title=${
        row.id
      } style="max-width: 8ch; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${
      row.id
    }</td>
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

    const scrollableContainer = document.getElementById("scrollable-container");
    scrollableContainer.addEventListener("scroll", translateGradients);

    const searchKeyButton = document.getElementById("search-key");
    searchKeyButton.addEventListener(
      "mousedown",
      toggleSearchKeyRadioContainer
    );

    var currentRadioButton = "Sva polja (wildcard)";
    const allRadioButtons = document
      .getElementById("search-key-radio-container")
      .querySelectorAll("input[type='radio']");

    allRadioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", function () {
        const searchKeyButton = document.getElementById("search-key");
        const searchKeyRadioContainer = document.getElementById(
          "search-key-radio-container"
        );
        searchKeyButton.innerHTML =
          this.value +
          `<span
              style="
                transform: rotate(90deg);
                display: inline-block;
                font-size: 10px;
              "
              >▶</span`;
        if (currentRadioButton != this.value) {
          currentRadioButton = this.value;

          searchKeyRadioContainer.classList.add("closed");
          isSearchKeyRadioContainerOpen = false;
        }
      });
    });

    function waitForSeconds(seconds) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, seconds * 1000);
      });
    }

    const searchKeyInput = document.getElementById("search-key-input");
    let debounceTimeout;
    searchKeyInput.addEventListener("input", function () {
      clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(() => {
        filterTable(this.value.toLowerCase(), currentRadioButton);
      }, 300);
    });
  });
};

function translateGradients() {
  const gradientRight = document.getElementById("gradient-right");
  const gradientLeft = document.getElementById("gradient-left");

  const scrollableContainer = document.getElementById("scrollable-container");
  const scrollLeft = scrollableContainer.scrollLeft;

  gradientRight.style.transform = `translateX(${scrollLeft}px)`;
  gradientLeft.style.transform = `translateX(${scrollLeft}px)`;
}

var isSearchKeyRadioContainerOpen = false;
function toggleSearchKeyRadioContainer() {
  console.log("toggleSearchKeyRadioContainer");
  const searchKeyRadioContainer = document.getElementById(
    "search-key-radio-container"
  );

  if (!isSearchKeyRadioContainerOpen) {
    searchKeyRadioContainer.classList.remove("closed");
    isSearchKeyRadioContainerOpen = true;
  } else {
    searchKeyRadioContainer.classList.add("closed");
    isSearchKeyRadioContainerOpen = false;
  }
}

function filterTable(filter, currentRadioButton) {
  const table = document.getElementById("table");
  const rows = table.querySelectorAll("tr");

  rows.forEach((row, index) => {
    if (index === 0 || index === 1) {
      // Skip the header rows
      return;
    }

    const columns = row.querySelectorAll("td"); // Get all columns in the row
    let matchFound = false; // Flag to track if a match is found

    if (currentRadioButton === "Sva polja (wildcard)") {
      // Search all columns for the search value (wildcard mode)
      columns.forEach((column) => {
        if (column.textContent.toLowerCase().includes(filter)) {
          matchFound = true;
        }
      });
    } else {
      // Search only the specific column based on the selected radio button
      if (currentRadioButton === "total_carbohydrates") {
        const carbsColumns = [
          columns[11],
          columns[12],
          columns[13],
          columns[14],
        ]; // Columns for total, sugars, added_sugars, dietary_fiber
        carbsColumns.forEach((column) => {
          if (column.textContent.toLowerCase().includes(filter)) {
            matchFound = true;
          }
        });
      } else if (currentRadioButton === "vitamins_and_minerals") {
        const vitaminsColumns = [
          columns[15],
          columns[16],
          columns[17],
          columns[18],
        ]; // Columns for iron, calcium, vitamin_a, vitamin_c
        vitaminsColumns.forEach((column) => {
          if (column.textContent.toLowerCase().includes(filter)) {
            matchFound = true;
          }
        });
      } else {
        // Search only the column corresponding to the selected radio button
        const columnIndex = getColumnIndexByHeader(currentRadioButton); // Assume this function maps header to column index
        console.log(columnIndex);
        if (
          columns[columnIndex] &&
          columns[columnIndex].textContent.toLowerCase().includes(filter)
        ) {
          matchFound = true;
          console.log("matchFound");
        }
      }
    }

    // Show or hide the row based on whether a match was found
    if (matchFound) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  var counter = 0;
  rows.forEach((row, index) => {
    if (row.style.display == "none") {
      return;
    }

    if (counter % 2 != 0) {
      row.style.color = "hsl(0, 0%, 80%)";
      row.style.backgroundColor = "hsl(0, 0%, 15%)";
    } else {
      row.style.color = "hsl(0, 0%, 90%)";
      row.style.backgroundColor = "transparent";
    }

    counter++;
  });
}

// Helper function to get the column index based on the selected header
function getColumnIndexByHeader(header) {
  const headers = [
    "id",
    "item_name",
    "brand",
    "serving_size",
    "calories",
    "total_fat",
    "saturated_fat",
    "trans_fat",
    "cholesterol",
    "sodium",
    "",
    "",
    "",
    "",
    "protein",
    "",
    "",
    "",
    "",
    "allergens",
  ];

  // Map the header string to column index
  const headerIndex = headers.indexOf(header);
  return headerIndex >= 0 ? headerIndex : null;
}
