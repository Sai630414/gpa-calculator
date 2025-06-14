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
const credits = [1, 1.5, 2, 3, 4, 5, 20];
const tableBody = document.getElementById("tableBody");

// Generate table rows for each credit
credits.forEach(credit => {
  const row = document.createElement("tr");

  // First column: Credit label
  const creditCell = document.createElement("td");
  creditCell.textContent = credit;
  row.appendChild(creditCell);

  // For each grade, input field
  grades.forEach(grade => {
    const cell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.value = "";
    input.name = `c${credit}_g${grade}`;
    cell.appendChild(input);
    row.appendChild(cell);
  });

  tableBody.appendChild(row);
});

// Handle form submission
document.getElementById("cgpaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let totalCredits = 0;
  let totalPoints = 0;

  credits.forEach(credit => {
    grades.forEach(grade => {
      const inputName = `c${credit}_g${grade}`;
      const count = parseInt(document.querySelector(`[name="${inputName}"]`).value) || 0;

      totalPoints += count * credit * gradePoints[grade];
      totalCredits += count * credit;
    });
  });

  const resultDiv = document.getElementById("result");

  if (totalCredits === 0) {
    resultDiv.textContent = "Please enter at least one subject.";
  } else {
    const cgpa = totalPoints / totalCredits;
    resultDiv.textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
  }
});
