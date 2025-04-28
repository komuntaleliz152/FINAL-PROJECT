document.addEventListener("DOMContentLoaded", () => {
    const quantityInput = document.getElementById("quantity");
    const priceInput = document.getElementById("price");
    const totalInput = document.getElementById("total");
    const form = document.getElementById("updateSalesForm");
  
    // Auto-calculate total
    function updateTotal() {
      const quantity = parseInt(quantityInput.value) || 0;
      const price = parseInt(priceInput.value) || 0;
      totalInput.value = quantity * price;
    }
  
    quantityInput.addEventListener("input", updateTotal);
    priceInput.addEventListener("input", updateTotal);
  
    // Simulate loading existing sale data
    function loadSaleData() {
      // Normally you'd fetch this from a server using fetch/AJAX
      const existingSale = {
        id: 123,
        product: "beans",
        quantity: 1000,
        saleDate: "2025-04-20",
        price: 20000,
        customer: "mark joel"
      };
  
      document.getElementById("saleId").value = existingSale.id;
      document.getElementById("product").value = existingSale.product;
      document.getElementById("quantity").value = existingSale.quantity;
      document.getElementById("saleDate").value = existingSale.saleDate;
      document.getElementById("price").value = existingSale.price;
      document.getElementById("customer").value = existingSale.customer;
  
      updateTotal(); // update total with loaded data
    }
  
    loadSaleData();
  
    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const updatedSale = {
        id: document.getElementById("saleId").value,
        product: document.getElementById("product").value,
        quantity: parseInt(quantityInput.value),
        saleDate: document.getElementById("saleDate").value,
        price: parseInt(priceInput.value),
        total: parseInt(totalInput.value),
        customer: document.getElementById("customer").value
      };
  
      console.log("Updated Sale:", updatedSale);
  
      // Here you would normally send the updatedSale object to your backend
      alert("Sale updated successfully!");
    });
  });
  