// Toggle the notification dropdown
function toggleNotifications() {
  const notificationDropdown = document.getElementById('notification-dropdown');
  const isVisible = notificationDropdown.style.display === 'block';
  notificationDropdown.style.display = isVisible ? 'none' : 'block';
}

// Dismiss alert
function dismissAlert() {
  const alertBox = document.getElementById('alert-box');
  alertBox.style.display = 'none';
}

