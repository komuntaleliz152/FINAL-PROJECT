// Format number with thousand separators
function formatNumber(input) {
    let value = input.value.replace(/,/g, '');
    if (value && !isNaN(value)) {
        input.value = Number(value).toLocaleString();
    }
}

// Remove commas before form submission
function removeCommas(input) {
    input.value = input.value.replace(/,/g, '');
}

// Set today's date as min and max for date input
function restrictDateToToday() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.setAttribute('max', today);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Restrict date to today
    restrictDateToToday();

    // Add thousand separator formatting to cost field
    const costInput = document.getElementById('cost');

    if (costInput) {
        // Format existing value on load
        formatNumber(costInput);
        
        // Add event listener for input
        costInput.addEventListener('input', function() {
            formatNumber(this);
        });
    }

    // Remove commas before form submission
    const form = document.getElementById('produceForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (costInput) removeCommas(costInput);
        });
    }
});
