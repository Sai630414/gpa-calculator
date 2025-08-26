function parseOnlyActualSubjects() {
  const rows = document.querySelectorAll("table tr");
  const counts = {};

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");

    // Heuristics to exclude unwanted sections
    const isSubjectRow = cells.length >= 10; // Actual subject rows
    const hasNumericCredit = !isNaN(parseFloat(cells[4]?.innerText));
    const grade = cells[5]?.innerText?.trim();
    const credit = parseFloat(cells[4]?.innerText?.trim());

    if (isSubjectRow && hasNumericCredit && grade && grade.length <= 2) {
      if (!counts[credit]) counts[credit] = {};
      if (!counts[credit][grade]) counts[credit][grade] = 0;
      counts[credit][grade]++;
    }
  });

  return counts;
}

function renderGradeSummary(counts) {
  const box = document.createElement("div");
  box.className = "grade-summary";

  let html = `<h3>📘 Grades by Credits</h3>`;

  const sortedCredits = Object.keys(counts).sort((a, b) => parseFloat(b) - parseFloat(a));

  sortedCredits.forEach(credit => {
    const grades = counts[credit];
    const sortedGrades = Object.keys(grades).sort();

    sortedGrades.forEach(grade => {
      const count = grades[grade];
      html += `<p><strong>${credit} Credit</strong> — ${grade} Grade: ${count} subject${count > 1 ? "s" : ""}</p>`;
    });
  });

  box.innerHTML = html;
  document.body.appendChild(box);
}

function waitForGradeTable() {
  const interval = setInterval(() => {
    const enoughData = document.querySelectorAll("table tr td").length > 50;
    if (enoughData) {
      clearInterval(interval);
      const counts = parseOnlyActualSubjects();
      if (Object.keys(counts).length > 0) {
        renderGradeSummary(counts);
      }
    }
  }, 1000);
}

window.addEventListener("load", waitForGradeTable);
