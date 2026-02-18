// Format dates to remove GMT/timezone text
document.addEventListener('DOMContentLoaded', function() {
    const dateElements = document.querySelectorAll('tbody tr td:nth-child(8)');
    
    dateElements.forEach(element => {
        const dateText = element.textContent.trim();
        if (dateText && dateText !== 'No procurement records available') {
            const date = new Date(dateText);
            if (!isNaN(date.getTime())) {
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                element.textContent = date.toLocaleDateString('en-US', options);
            }
        }
    });
});
