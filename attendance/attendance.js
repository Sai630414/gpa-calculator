function calculateAttendance() {
  const attended = parseInt(document.getElementById("attended").value);
  const total = parseInt(document.getElementById("total").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(attended) || isNaN(total) || attended < 0 || total <= 0 || attended > total) {
    resultDiv.innerHTML = "⚠️ Please enter valid numbers. Attended should be less than or equal to total.";
    return;
  }

  const currentPercentage = (attended / total) * 100;
  let message = `<strong>Current Attendance: ${currentPercentage.toFixed(2)}%</strong><br><br>`;

  if (currentPercentage < 75) {
    let needed75 = Math.ceil((0.75 * total - attended) / (1 - 0.75));
    message += `📌 You need to attend <strong>${needed75}</strong> more class${needed75 > 1 ? 'es' : ''} to reach <strong>75%</strong>.<br>`;
  }

  if (currentPercentage < 80) {
    let needed80 = Math.ceil((0.80 * total - attended) / (1 - 0.80));
    message += `📌 You need to attend <strong>${needed80}</strong> more class${needed80 > 1 ? 'es' : ''} to reach <strong>80%</strong>.<br>`;
  }

  if (currentPercentage >= 80) {
    let canSkip75 = Math.floor((attended - 0.75 * total) / 0.75);
    let canSkip80 = Math.floor((attended - 0.80 * total) / 0.80);
    message += `🎉 You're doing great!<br>`;
    message += `😎 You can bunk <strong>${canSkip80}</strong> class${canSkip80 !== 1 ? 'es' : ''} and still stay above <strong>80%</strong>.<br>`;
    message += `😈 Want to take it easy? You can bunk up to <strong>${canSkip75}</strong> class${canSkip75 !== 1 ? 'es' : ''} and stay above <strong>75%</strong>.<br>`;
  }

  resultDiv.innerHTML = message;
}
