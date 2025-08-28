// Initialize DOM elements
const body = document.body;
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const searchBtn = document.querySelector('.search-button');
const main = document.querySelector('.main');

// Set initial state
if (window.innerWidth <= 768) {
    sidebar.classList.add('close');
}

// Create and append backdrop for mobile overlay
const backdrop = document.createElement('div');
backdrop.classList.add('sidebar-backdrop');
document.body.appendChild(backdrop);

// Initialize theme from localStorage
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeToggle.querySelector('span').textContent = 'light_mode';
    }
};

// Toggle sidebar function
const toggleSidebar = () => {
    sidebar.classList.toggle('close');
    const isClosed = sidebar.classList.contains('close');
    
    if (window.innerWidth <= 576) {
        sidebar.classList.toggle('open', !isClosed);
        body.classList.toggle('sidebar-open', !isClosed);
    }
};

// Sidebar toggle button click handler
sidebarToggle.addEventListener('click', toggleSidebar);

// Close sidebar when clicking outside on mobile (on backdrop)
backdrop.addEventListener('click', () => {
    if (window.innerWidth <= 576) {
        sidebar.classList.remove('open');
        body.classList.remove('sidebar-open');
    } else {
        sidebar.classList.add('close');
    }
});

// Close sidebar if main area is clicked on small screens
main.addEventListener('click', () => {
    if (window.innerWidth <= 576) {
        sidebar.classList.remove('open');
        body.classList.remove('sidebar-open');
    }
});

// Swipe gesture detection for mobile sidebar toggle
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (window.innerWidth > 576) return;

    const swipeDistance = touchEndX - touchStartX;
    const threshold = 50;

    if (Math.abs(swipeDistance) < threshold) return;

    if (swipeDistance > 0) {
        // Swipe right — open sidebar
        sidebar.classList.add('open');
        sidebar.classList.remove('close');
        body.classList.add('sidebar-open');
    } else {
        // Swipe left — close sidebar
        sidebar.classList.remove('open');
        sidebar.classList.add('close');
        body.classList.remove('sidebar-open');
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    const icon = themeToggle.querySelector('span');
    
    icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Add rotation animation
    icon.style.transform = 'rotate(360deg)';
    setTimeout(() => icon.style.transform = '', 300);
});

// Search functionality placeholder
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Implement search logic here
});
