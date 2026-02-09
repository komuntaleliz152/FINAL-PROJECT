
    // Format currency consistently to UGX
    function formatCurrency(amount) {
        if (!amount) return '—';
        const num = parseInt(amount);
        return 'UGX ' + num.toLocaleString('en-US');
    }

    // Show error message
    function showError(message) {
        const errorMsg = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        errorText.textContent = message;
        errorMsg.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 5000);
    }

    // Show loader
    function showLoader(id) {
        const loader = document.getElementById(id);
        if (loader) loader.classList.add('show');
    }

    // Hide loader
    function hideLoader(id) {
        const loader = document.getElementById(id);
        if (loader) loader.classList.remove('show');
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Initialize dashboard
        loadDashboardData();
    });

    async function loadDashboardData() {
        try {
            // Load statistics
            await loadStatistics();
            
            // Load recent orders
            await loadRecentOrders();
        } catch (err) {
            console.error('Error loading dashboard:', err);
            showError('Failed to load dashboard data. Please refresh the page.');
        }
    }

    async function loadStatistics() {
        showLoader('statisticsLoader');
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/dashboard/statistics');
            // const data = await response.json();
            
            // Mock data for now - replace with API call
            const data = {
                salesToday: 1000000,
                highSellingProduct: { name: 'Beans', value: 8000000 },
                currentProducts: ['Maize', 'Beans', 'Soybeans'],
                lowStockItems: ['Soybeans – 50kgs', 'Maize – 30 kgs']
            };

            // Update statistics
            document.getElementById('salesTodayValue').textContent = formatCurrency(data.salesToday);
            document.getElementById('productName').textContent = data.highSellingProduct.name;
            document.getElementById('productValue').textContent = formatCurrency(data.highSellingProduct.value);
            document.getElementById('productsList').textContent = data.currentProducts.join(', ');
            
            // Update low stock list
            const lowStockList = document.getElementById('lowStockList');
            lowStockList.innerHTML = data.lowStockItems
                .map(item => `<li>${item}</li>`)
                .join('');

            hideLoader('statisticsLoader');
        } catch (err) {
            hideLoader('statisticsLoader');
            showError('Failed to load statistics');
            console.error('Statistics error:', err);
        }
    }

    async function loadRecentOrders() {
        showLoader('tableLoader');
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/dashboard/recent-orders');
            // const orders = await response.json();
            
            // Mock data for now - replace with API call
            const orders = [
                { name: 'Marcus Bruno', contact: 'brunomarcus@gmail.com', status: 'New', value: 5000000 },
                { name: 'Chiru Faith', contact: 'faithchiru@gmail.com', status: 'In Progress', value: 7000000 }
            ];

            // Populate table
            const tableBody = document.getElementById('ordersTableBody');
            tableBody.innerHTML = orders
                .map(order => `
                    <tr>
                        <td>${order.name}</td>
                        <td>${order.contact}</td>
                        <td>${order.status}</td>
                        <td>${formatCurrency(order.value)}</td>
                    </tr>
                `)
                .join('');

            // Show table
            document.getElementById('ordersTable').style.display = 'table';
            hideLoader('tableLoader');
        } catch (err) {
            hideLoader('tableLoader');
            showError('Failed to load recent orders');
            console.error('Orders error:', err);
        }
    }
