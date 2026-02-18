// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeCharts();
});

function initializeCharts() {
  // Get data from the page (passed from server)
  const dailySalesDataElement = document.getElementById('dailySalesData');
  const topProductsDataElement = document.getElementById('topProductsData');
  
  let dailySalesData = [];
  let topProductsData = [];
  
  try {
    if (dailySalesDataElement) {
      dailySalesData = JSON.parse(dailySalesDataElement.textContent);
    }
    if (topProductsDataElement) {
      topProductsData = JSON.parse(topProductsDataElement.textContent);
    }
  } catch (e) {
    console.error('Error parsing chart data:', e);
  }

  // Prepare daily sales chart data
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const last7Days = [];
  const salesByDay = {};
  
  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    last7Days.push({
      date: dateStr,
      label: daysOfWeek[date.getDay()]
    });
    salesByDay[dateStr] = 0;
  }
  
  // Map actual sales data
  dailySalesData.forEach(item => {
    if (salesByDay.hasOwnProperty(item._id)) {
      salesByDay[item._id] = item.total;
    }
  });
  
  const salesValues = last7Days.map(day => salesByDay[day.date]);
  const salesLabels = last7Days.map(day => day.label);

  // Sales Trend Chart (Line Chart)
  const salesTrendCtx = document.getElementById('salesTrendChart');
  if (salesTrendCtx) {
    new Chart(salesTrendCtx, {
      type: 'line',
      data: {
        labels: salesLabels,
        datasets: [{
          label: 'Daily Sales (UGX)',
          data: salesValues,
          borderColor: '#3182ce',
          backgroundColor: 'rgba(49, 130, 206, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
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

  // Prepare top products data
  const productNames = topProductsData.map(p => p._id || 'Unknown');
  const productSales = topProductsData.map(p => p.totalSales || 0);
  
  const colors = [
    { bg: 'rgba(49, 130, 206, 0.8)', border: '#3182ce' },
    { bg: 'rgba(72, 187, 120, 0.8)', border: '#48bb78' },
    { bg: 'rgba(237, 137, 54, 0.8)', border: '#ed8936' },
    { bg: 'rgba(159, 122, 234, 0.8)', border: '#9f7aea' },
    { bg: 'rgba(236, 72, 153, 0.8)', border: '#ec4899' }
  ];

  // Top Products Chart (Bar Chart)
  const topProductsCtx = document.getElementById('topProductsChart');
  if (topProductsCtx) {
    new Chart(topProductsCtx, {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [{
          label: 'Sales (UGX)',
          data: productSales,
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

  // Sales Distribution Chart (Doughnut Chart)
  const totalSalesAmount = productSales.reduce((sum, val) => sum + val, 0);
  const productPercentages = productSales.map(sales => 
    totalSalesAmount > 0 ? ((sales / totalSalesAmount) * 100).toFixed(1) : 0
  );

  const salesDistributionCtx = document.getElementById('salesDistributionChart');
  if (salesDistributionCtx) {
    new Chart(salesDistributionCtx, {
      type: 'doughnut',
      data: {
        labels: productNames,
        datasets: [{
          label: 'Sales Distribution',
          data: productPercentages,
          backgroundColor: colors.map(c => c.bg),
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              font: {
                size: 12,
                family: 'Inter'
              },
              color: '#4a5568',
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle'
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
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    });
  }
}
