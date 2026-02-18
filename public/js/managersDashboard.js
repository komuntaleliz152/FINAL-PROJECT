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

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeCharts();
});

function initializeCharts() {
  // Get data from the page (passed from server)
  const weeklySalesDataElement = document.getElementById('weeklySalesData');
  const inventoryDataElement = document.getElementById('inventoryData');
  
  let weeklySalesData = [0, 0, 0, 0];
  let inventoryData = [];
  
  try {
    if (weeklySalesDataElement) {
      weeklySalesData = JSON.parse(weeklySalesDataElement.textContent);
    }
    if (inventoryDataElement) {
      inventoryData = JSON.parse(inventoryDataElement.textContent);
    }
  } catch (e) {
    console.error('Error parsing chart data:', e);
  }

  // Sales Trend Chart (Line Chart)
  const salesTrendCtx = document.getElementById('salesTrendChart');
  if (salesTrendCtx) {
    new Chart(salesTrendCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Weekly Sales (UGX)',
          data: weeklySalesData,
          borderColor: '#3182ce',
          backgroundColor: 'rgba(49, 130, 206, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#3182ce',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 12,
                family: 'Inter'
              },
              color: '#4a5568',
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 13,
              family: 'Inter'
            },
            bodyFont: {
              size: 12,
              family: 'Inter'
            },
            callbacks: {
              label: function(context) {
                return 'Sales: UGX ' + context.parsed.y.toLocaleString();
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return 'UGX ' + (value / 1000000).toFixed(1) + 'M';
              },
              font: {
                size: 11,
                family: 'Inter'
              },
              color: '#718096'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            }
          },
          x: {
            ticks: {
              font: {
                size: 11,
                family: 'Inter'
              },
              color: '#718096'
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // Prepare inventory data
  const productNames = inventoryData.map(p => p._id || 'Unknown');
  const stockLevels = inventoryData.map(p => p.totalStock || 0);
  
  // Assign colors based on stock levels (red for low, yellow for medium, green for high)
  const colors = stockLevels.map(stock => {
    if (stock < 1000) return { bg: 'rgba(239, 68, 68, 0.8)', border: '#ef4444' };
    if (stock < 5000) return { bg: 'rgba(236, 201, 75, 0.8)', border: '#ecc94b' };
    return { bg: 'rgba(72, 187, 120, 0.8)', border: '#48bb78' };
  });

  // Inventory Levels Chart (Bar Chart)
  const inventoryCtx = document.getElementById('inventoryChart');
  if (inventoryCtx) {
    new Chart(inventoryCtx, {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [{
          label: 'Stock (Kgs)',
          data: stockLevels,
          backgroundColor: colors.map(c => c.bg),
          borderColor: colors.map(c => c.border),
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 13,
              family: 'Inter'
            },
            bodyFont: {
              size: 12,
              family: 'Inter'
            },
            callbacks: {
              label: function(context) {
                return 'Stock: ' + context.parsed.y.toLocaleString() + ' Kgs';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString() + ' Kgs';
              },
              font: {
                size: 11,
                family: 'Inter'
              },
              color: '#718096'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            }
          },
          x: {
            ticks: {
              font: {
                size: 11,
                family: 'Inter'
              },
              color: '#718096'
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}
