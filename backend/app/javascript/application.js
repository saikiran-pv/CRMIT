// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// Toggle dropdown menu for profile
document.querySelector('.user-profile-btn').addEventListener('click', function(event) {
  const dropdown = document.querySelector('.dropdown-menu');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  event.stopPropagation(); // Prevent click event from closing it immediately
});

// Toggle dropdown menu for language/theme switcher
document.querySelector('.switcher-btn').addEventListener('click', function(event) {
  const switcherDropdown = document.querySelector('.switcher-dropdown');
  switcherDropdown.style.display = switcherDropdown.style.display === 'block' ? 'none' : 'block';
  event.stopPropagation(); // Prevent click event from closing it immediately
});

// Close dropdowns if clicking outside
document.addEventListener('click', function() {
  document.querySelector('.dropdown-menu').style.display = 'none';
  document.querySelector('.switcher-dropdown').style.display = 'none';
});
