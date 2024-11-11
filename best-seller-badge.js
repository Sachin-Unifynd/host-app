(async function () {
  try {
    const response = await fetch("/api/products.ts");
    const products = await response.json();
    console.log("Fetched product data:", products);

    const productElements = document.querySelectorAll(".card-wrapper");

    productElements.forEach((productElement) => {
      const productId = productElement.getAttribute("data-product-id");
      const isBestSeller = products.some((product) => product.id === productId && product.isBestSeller);

      if (isBestSeller) {
        const badge = document.createElement("div");
        badge.className = "best-seller-badge";
        badge.innerText = "Best Seller";
        productElement.appendChild(badge);
      }
    });
  } catch (error) {
    console.error("An error occurred while fetching product data:", error);
  }
})();
