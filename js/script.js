// script.js
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
if ((prefersDark && !savedTheme) || savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

function toggleTheme() {
  const overlay = document.getElementById('themeTransition');
  overlay.classList.add('fade');
  setTimeout(() => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    overlay.classList.remove('fade');
  }, 300);
}

const quotes = [
  "Keep coding, keep improving.",
  "Done is better than perfect.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Simplicity is the soul of efficiency.",
  "First solve the problem. Then, write the code."
];
const today = new Date().getDate();
document.getElementById("dailyQuote").textContent = quotes[today % quotes.length];

const week = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const availability = ["❌", "✅", "✅", "❌", "✅", "✅", "❌"];
let scheduleHTML = "";
for (let i = 0; i < 7; i++) {
  scheduleHTML += `<div>${week[i]}: ${availability[i] === "✅" ? "Tersedia" : "Full"}</div>`;
}
document.getElementById("weekSchedule").innerHTML = scheduleHTML;

const guestForm = document.getElementById("guestForm");
const guestMessages = document.getElementById("guestMessages");
const guestData = JSON.parse(localStorage.getItem("guestbook") || "[]");

function renderGuestbook() {
  guestMessages.innerHTML = guestData.map(g => `<p><strong>${g.name}</strong>: ${g.message}</p>`).join("");
}

guestForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("guestName").value;
  const message = document.getElementById("guestMessage").value;
  guestData.push({ name, message });
  localStorage.setItem("guestbook", JSON.stringify(guestData));
  renderGuestbook();
  guestForm.reset();
});

renderGuestbook();

function checkClientAccess() {
  const pass = document.getElementById("clientPass").value;
  if (pass === "moriclient") {
    document.getElementById("clientSection").style.display = "block";
  } else {
    alert("Password salah");
  }
}

function updateClock() {
  const now = new Date();
  const jam = now.toLocaleTimeString('id-ID');
  document.getElementById("clock").textContent = "🕒 " + jam;
}
setInterval(updateClock, 1000);
updateClock();
