document.addEventListener('DOMContentLoaded', () => {
  const statsContainer = document.getElementById('statistics');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const total = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const loginCounts = users.map(u => u.activity?.filter(a => a.includes('Login')).length || 0);
  const totalLogins = loginCounts.reduce((a, b) => a + b, 0);
  const lastLogins = users.map(u => u.activity?.filter(a => a.includes('Login')).slice(-1)[0] || 'Tidak ada').join('<br>');

  statsContainer.innerHTML = `
    <h3>Statistik Pengguna</h3>
    <p>Total pengguna: <strong>${total}</strong></p>
    <p>Total admin: <strong>${adminCount}</strong></p>
    <p>Total login: <strong>${totalLogins}</strong></p>
    <p>Login terakhir:</p>
    <div style="font-size: 0.9em; color: gray;">${lastLogins}</div>
  `;
});