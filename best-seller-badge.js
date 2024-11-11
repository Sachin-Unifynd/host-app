(function () {
  try {
    console.log("Product data from Prisma:", window.productData);
    const productElements = document.querySelectorAll(".card-wrapper");
    const products = window.productData || [];

    productElements.forEach((productElement) => {
      const productId = productElement.getAttribute("data-product-id");
      const isBestSeller = products.some((product) => product.id === productId && product.isBestSeller);

      if (isBestSeller) {
        const badge = document.createElement("div");
        badge.className = "best-seller-badge";
        badge.innerText = "Best Seller";
        productElement.appendChild(badge);
        console.log("Added Best Seller badge to product:", productId);
      }
    });
  } catch (error) {
    console.error("An error occurred while processing product data:", error);
  }
})();
