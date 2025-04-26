document.getElementById("produceForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let valid = true;
});
    let produceName = document.getElementById("produceName").value.trim();
    let category = document.getElementById("category").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;
    let supplier = document.getElementById("supplier").value.trim();

    document.getElementById("nameError").textContent = "";
    document.getElementById("categoryError").textContent = "";
    document.getElementById("quantityError").textContent = "";
    document.getElementById("priceError").textContent = "";
    document.getElementById("supplierError").textContent = "";

    if (produceName === "") {
        document.getElementById("nameError").textContent = "Produce name is required.";
        valid = false;
    }
    if (category === "") {
        document.getElementById("categoryError").textContent = "Please select a category.";
        valid = false;
    }
    if (quantity === "" || quantity <= 0) {
        document.getElementById("quantityError").textContent = "Enter a valid quantity.";
        valid = false;
    }
    if (price === "" || price <= 0) {
        document.getElementById("priceError").textContent = "Enter a valid price.";
        valid = false;
    }
    if (supplier === "") {
        document.getElementById("supplierError").textContent = "Supplier name is required.";
        valid = false;
    }

    if (valid) {
        document.getElementById("message").style.display = "block";
        setTimeout(() => {
            document.getElementById("message").style.display = "none";
            document.getElementById("produceForm").reset();
        }, 2000);
    }

