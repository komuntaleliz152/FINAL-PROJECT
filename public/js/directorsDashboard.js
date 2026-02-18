// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeCharts();
});

function initializeCharts() {
  // Sales Trend Chart (Line Chart)
  const salesTrendCtx = document.getElementById('salesTrendChart');
  if (salesTrendCtx) {
    new Chart(salesTrendCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Daily Sales (UGX)',
          data: [1200000, 1900000, 1500000, 2100000, 1800000, 2400000, 2200000],
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
                return 'UGX ' + (value / 1000000) + 'M';
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

  // Top Products Chart (Bar Chart)
  const topProductsCtx = document.getElementById('topProductsChart');
  if (topProductsCtx) {
    new Chart(topProductsCtx, {
      type: 'bar',
      data: {
        labels: ['Beans', 'Maize', 'Cowpeas', 'Gnuts', 'Soybeans'],
        datasets: [{
          label: 'Sales (UGX)',
          data: [8000000, 6500000, 5200000, 4800000, 3500000],
          backgroundColor: [
            'rgba(49, 130, 206, 0.8)',
            'rgba(72, 187, 120, 0.8)',
            'rgba(237, 137, 54, 0.8)',
            'rgba(159, 122, 234, 0.8)',
            'rgba(236, 72, 153, 0.8)'
          ],
          borderColor: [
            '#3182ce',
            '#48bb78',
            '#ed8936',
            '#9f7aea',
            '#ec4899'
          ],
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
                return 'UGX ' + (value / 1000000) + 'M';
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
  const salesDistributionCtx = document.getElementById('salesDistributionChart');
  if (salesDistributionCtx) {
    new Chart(salesDistributionCtx, {
      type: 'doughnut',
      data: {
        labels: ['Beans', 'Maize', 'Cowpeas', 'Gnuts', 'Soybeans'],
        datasets: [{
          label: 'Sales Distribution',
          data: [28.5, 23.2, 18.6, 17.1, 12.6],
          backgroundColor: [
            'rgba(49, 130, 206, 0.8)',
            'rgba(72, 187, 120, 0.8)',
            'rgba(237, 137, 54, 0.8)',
            'rgba(159, 122, 234, 0.8)',
            'rgba(236, 72, 153, 0.8)'
          ],
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
