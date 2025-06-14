const gradePoints = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 5,
  F: 0
};

const creditOptions = [1, 1.5, 2, 3, 4, 5, 20];
const grades = Object.keys(gradePoints);

const gpaBody = document.getElementById("gpaBody");
const addBtn = document.getElementById("addSubjectBtn");

// Function to create a new row
function createSubjectRow(index) {
  const row = document.createElement("tr");

  // Subject number
  const subjectCell = document.createElement("td");
  subjectCell.textContent = `Subject ${index}`;
  row.appendChild(subjectCell);

  // Grade select
  const gradeCell = document.createElement("td");
  const gradeSelect = document.createElement("select");
  gradeSelect.name = `grade_${index}`;
  gradeSelect.innerHTML = `<option value="">-- Select --</option>` +
    grades.map(g => `<option value="${g}">${g}</option>`).join("");
  gradeCell.appendChild(gradeSelect);
  row.appendChild(gradeCell);

  // Credit select
  const creditCell = document.createElement("td");
  const creditSelect = document.createElement("select");
  creditSelect.name = `credit_${index}`;
  creditSelect.innerHTML = `<option value="">-- Select --</option>` +
    creditOptions.map(c => `<option value="${c}">${c}</option>`).join("");
  creditCell.appendChild(creditSelect);
  row.appendChild(creditCell);

  gpaBody.appendChild(row);
}

// Add initial 5 rows
for (let i = 1; i <= 5; i++) {
  createSubjectRow(i);
}

// Add new subject on button click
let subjectCount = 5;
addBtn.addEventListener("click", () => {
  subjectCount++;
  createSubjectRow(subjectCount);
});

// GPA calculation
document.getElementById("gpaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 1; i <= subjectCount; i++) {
    const gradeEl = document.querySelector(`[name="grade_${i}"]`);
    const creditEl = document.querySelector(`[name="credit_${i}"]`);

    if (gradeEl && creditEl) {
      const grade = gradeEl.value;
      const credit = parseFloat(creditEl.value);

      if (grade && !isNaN(credit)) {
        totalPoints += gradePoints[grade] * credit;
        totalCredits += credit;
      }
    }
  }

  const resultEl = document.getElementById("gpaResult");
  if (totalCredits === 0) {
    resultEl.textContent = "Please select at least one subject's grade and credit.";
  } else {
    const gpa = totalPoints / totalCredits;
    resultEl.textContent = `Your GPA is: ${gpa.toFixed(2)}`;
  }
});
