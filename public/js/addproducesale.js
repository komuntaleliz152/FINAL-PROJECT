
// Simple form validation
function validateForm() {
  const produce = document.getElementById("produce").value;
  const tonnage = document.getElementById("tonnage").value;
  const amountPaid = document.getElementById("amountPaid").value;
  const buyerName = document.getElementById("buyerName").value;
  const salesAgent = document.getElementById("salesAgent").value;
  const saleDateTime = document.getElementById("saleDateTime").value;

  // Check if all fields are filled
  if (!produce || !tonnage || !amountPaid || !buyerName || !salesAgent || !saleDateTime) {
    document.getElementById("errorMsg").style.display = "block";
    document.getElementById("errorMsg").innerText = "Please fill in all fields.";
    return false;
  }

  // If everything is correct, submit the form
  return true;
}
