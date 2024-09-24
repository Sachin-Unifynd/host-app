document.addEventListener("DOMContentLoaded", function() {
  // Assuming you have a way to get the product ID on the page
  const productId = window.productId; // Update to match your method of getting the product ID

  // Fetch metafield value via a fetch request to your server
  fetch(`/api/getMetafield?productId=${productId}`)
    .then(response => response.json())
    .then(data => {
      if (data && data.metafield && data.metafield.value === "true") {
        // Create and insert the Best Seller div
        const bestSellerDiv = document.createElement("div");
        bestSellerDiv.innerHTML = "<strong>Best Seller</strong>";
        bestSellerDiv.style.color = "lime"; // Style as needed
        bestSellerDiv.style.fontWeight = "bold";
        
        // Insert the div into your desired location on the product page
        const productContainer = document.querySelector(".product-container"); // Adjust selector as needed
        if (productContainer) {
          productContainer.appendChild(bestSellerDiv);
        }
      }
    })
    .catch(error => console.error("Error fetching metafield:", error));
});
