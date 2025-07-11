const gradePoints = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 5,
  F: 0
};

const grades = Object.keys(gradePoints);
let credits = [1, 1.5, 2, 3, 4, 5, 6, 20]; // Initial default credits
const tableBody = document.getElementById("tableBody");

// Function to create a row
function createCreditRow(credit) {
  const row = document.createElement("tr");
  row.setAttribute("data-credit", credit);

  const creditCell = document.createElement("td");
  creditCell.textContent = credit;
  row.appendChild(creditCell);

  grades.forEach(grade => {
    const cell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.name = `c${credit}_g${grade}`;
    input.classList.add("form-control", "text-center");
    cell.appendChild(input);
    row.appendChild(cell);
  });

  return row;
}

// Render default rows
credits.forEach(credit => {
  const row = createCreditRow(credit);
  tableBody.appendChild(row);
});

// CGPA Calculation Logic
document.getElementById("cgpaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let totalCredits = 0;
  let totalPoints = 0;

  credits.forEach(credit => {
    grades.forEach(grade => {
      const inputName = `c${credit}_g${grade}`;
      const inputElement = document.querySelector(`[name="${inputName}"]`);
      const count = parseInt(inputElement?.value) || 0;

      totalPoints += count * credit * gradePoints[grade];
      totalCredits += count * credit;
    });
  });

  const resultDiv = document.getElementById("result");

  if (totalCredits === 0) {
    resultDiv.textContent = "⚠️ Please enter at least one subject.";
    resultDiv.classList.add("text-danger");
    resultDiv.classList.remove("text-success");
  } else {
    const cgpa = totalPoints / totalCredits;
    resultDiv.textContent = `✅ Your CGPA is: ${cgpa.toFixed(2)}`;
    resultDiv.classList.remove("text-danger");
    resultDiv.classList.add("text-success", "fw-bold");
  }
});

// Add custom credit logic
document.getElementById("addCustomCredit").addEventListener("click", () => {
  const creditInput = document.getElementById("customCredit");
  const creditValue = parseFloat(creditInput.value);

  if (!creditValue || creditValue <= 0) {
    alert("Please enter a valid custom credit greater than 0.");
    return;
  }

  if (credits.includes(creditValue)) {
    alert(`Credit ${creditValue} already exists.`);
    return;
  }

  credits.push(creditValue);
  credits.sort((a, b) => a - b);

  // Clear table and re-render
  tableBody.innerHTML = "";
  credits.forEach(credit => {
    const row = createCreditRow(credit);
    tableBody.appendChild(row);
  });

  creditInput.value = "";
});
