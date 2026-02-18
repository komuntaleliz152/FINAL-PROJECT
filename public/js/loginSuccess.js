// Show login success message
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const loginSuccess = urlParams.get('login');
    
    if (loginSuccess === 'success') {
        // Create success toast
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.innerHTML = '✓ Login successful! Welcome back.';
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
        
        // Remove query parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});
