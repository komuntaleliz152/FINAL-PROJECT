
    document.addEventListener("DOMContentLoaded", function() {
        const leads = document.getElementById("leads");
        const deals = document.getElementById("deals");
        const revenue = document.getElementById("revenue");

        function updateStats() {
            leads.textContent = Math.floor(Math.random() * 50);
            deals.textContent = Math.floor(Math.random() * 20);
            revenue.textContent = "shs" + (Math.floor(Math.random() * 100000));
        }
        setInterval(updateStats, 50000);

        const ctx = document.getElementById('salesChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'Revenue (shs)',
                    data: [500000, 100000, 70000, 120000, 900000],
                    backgroundColor: 'rgba(163, 54, 235, 0.5)',
                    borderColor: 'rgb(114, 54, 235)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
