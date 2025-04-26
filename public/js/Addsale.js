  const form = document.getElementById('salesRegisteer');
  const quantity = document.getElementById('quantity');
  const price = document.getElementById('price');
  const total = document.getElementById('total');

  function updateTotal() {
    const q = parseFloat(quantity.value) || 0;
    const p = parseFloat(price.value) || 0;
    const t = (q * p).toFixed(2);
    total.textContent = `Total: $${t}`;
  }

  quantity.addEventListener('input', updateTotal);
  price.addEventListener('input', updateTotal);

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const data = {
      product: document.getElementById('product').value,
      quantity: parseInt(quantity.value),
      price: parseFloat(price.value),
      total: parseFloat((quantity.value * price.value).toFixed(2)),
      customer: document.getElementById('customer').value
    };

    try {
      const response = await fetch('https://your-backend-url.com/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Sale submitted successfully:', result);
      alert('Sale Registered Successfully!');
      form.reset();
      updateTotal();
    } catch (error) {
      console.error('Error submitting sale:', error);
      alert('Error submitting sale. Please try again.');
    }
  });

  updateTotal(); // Initial call
