const gradesMap = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 5,
  F: 0
};

const creditOptions = [1, 1.5, 2, 3, 4, 5, 20];
const gradeOptions = Object.keys(gradesMap);
const subjectsContainer = document.getElementById("subjectsContainer");
const addSubjectBtn = document.getElementById("addSubjectBtn");

let subjectCount = 0;
const maxSubjects = 10;

// Create a subject row
function createSubjectRow(index) {
  const div = document.createElement("div");
  div.classList.add("subject");
  div.id = `subject${index}`;

  const creditSelect = document.createElement("select");
  creditSelect.name = `credit${index}`;
  creditSelect.innerHTML = `<option value="">Select Credit</option>`;
  creditOptions.forEach(c => {
    creditSelect.innerHTML += `<option value="${c}">${c}</option>`;
  });

  const gradeSelect = document.createElement("select");
  gradeSelect.name = `grade${index}`;
  gradeSelect.innerHTML = `<option value="">Select Grade</option>`;
  gradeOptions.forEach(g => {
    gradeSelect.innerHTML += `<option value="${g}">${g}</option>`;
  });

  div.appendChild(creditSelect);
  div.appendChild(gradeSelect);

  subjectsContainer.appendChild(div);
}

function addSubject() {
  if (subjectCount < maxSubjects) {
    createSubjectRow(subjectCount);
    subjectCount++;
    if (subjectCount === maxSubjects) {
      addSubjectBtn.disabled = true;
      addSubjectBtn.textContent = "Maximum 10 Subjects";
    }
  }
}

// Initialize with 5 subjects
for (let i = 0; i < 5; i++) {
  addSubject();
}

// Add subject button click
addSubjectBtn.addEventListener("click", addSubject);

// GPA calculation
document.getElementById("gpaForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 0; i < subjectCount; i++) {
    const creditVal = document.querySelector(`[name="credit${i}"]`).value;
    const gradeVal = document.querySelector(`[name="grade${i}"]`).value;

    if (creditVal && gradeVal) {
      const credit = parseFloat(creditVal);
      const gradePoint = gradesMap[gradeVal];
      totalPoints += credit * gradePoint;
      totalCredits += credit;
    }
  }

  const resultEl = document.getElementById("result");

  if (totalCredits === 0) {
    resultEl.textContent = "Please select at least one subject.";
  } else {
    const gpa = totalPoints / totalCredits;
    resultEl.textContent = `Your GPA is: ${gpa.toFixed(2)}`;
  }
});
