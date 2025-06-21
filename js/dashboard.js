document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return (window.location.href = 'index.html');

  document.getElementById('user-name').textContent = currentUser.username;
  document.getElementById('user-role').textContent = currentUser.role;
  document.getElementById('user-avatar').src = currentUser.avatar || 'https://via.placeholder.com/100';

  if (currentUser.role === 'admin') {
    document.getElementById('admin-panel').style.display = 'block';
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userList = document.getElementById('user-list');
    userList.innerHTML = users.map(u => `<li>${u.username} (${u.email}) - ${u.role}</li>`).join('');
  }
});

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}
