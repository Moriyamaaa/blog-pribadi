document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('auth-form');
  const message = document.getElementById('message');
  const formTitle = document.getElementById('form-title');
  let isLogin = true;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (isLogin) {
      return loginUser(email, password);
    } else {
      return registerUser(username, email, password);
    }
  });

  window.toggleForm = function () {
    isLogin = !isLogin;
    formTitle.innerText = isLogin ? 'Login' : 'Register';
    form.querySelector('button').innerText = isLogin ? 'Login' : 'Register';
    document.getElementById('toggle').innerHTML = isLogin
      ? 'Belum punya akun? <a href="#" onclick="toggleForm()">Register di sini</a>'
      : 'Sudah punya akun? <a href="#" onclick="toggleForm()">Login di sini</a>';
  };

  function showMessage(msg, error = false) {
    message.innerText = msg;
    message.style.color = error ? 'red' : 'green';
  }

  function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function registerUser(username, email, password) {
    const users = getUsers();
    if (users.some(u => u.email === email)) {
      return showMessage('Email sudah terdaftar.', true);
    }
    const newUser = {
      username,
      email,
      password,
      role: users.length === 0 ? 'admin' : 'user',
      avatar: '',
      activity: []
    };
    users.push(newUser);
    saveUsers(users);
    showMessage('Registrasi berhasil. Silakan login.');
    toggleForm();
  }

  function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return showMessage('Email atau password salah.', true);

    localStorage.setItem('currentUser', JSON.stringify(user));
    user.activity.push(`Login at ${new Date().toLocaleString()}`);
    saveUsers(users);
    window.location.href = 'dashboard.html';
  }
});
