 function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const main = document.getElementById('main');
      sidebar.classList.toggle('collapsed');
      main.classList.toggle('collapsed');
    }

    // Dummy data
    document.getElementById('dailySales').textContent = "Shs 3,250";
    document.getElementById('satisfaction').textContent = "88%";
    document.getElAementById('grossProfit').textContent = "35%";
    document.getElementById('payments').textContent = "Shs 1,200";
    document.getElementById('attendance').textContent = "92%";
    document.getElementById('campaign').textContent = "120 Leads / 5% Conversion";

    const topProducts = ["Cowpeas", "Beans", "Maize", "Gnuts", "Soybeans"];
    const lowStock = ["Cowpeas", "Soybeans"];

    const topList = document.getElementById('topProducts');
    const stockList = document.getElementById('lowStock');

    topProducts.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      topList.appendChild(li);
    });

    lowStock.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      stockList.appendChild(li);
    });
    