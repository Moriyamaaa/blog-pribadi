function exportUsers() {
  const users = localStorage.getItem('users');
  const blob = new Blob([users], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data_pengguna.json';
  a.click();
}