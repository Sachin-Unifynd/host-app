(function () {
  try {
    const productElements = document.querySelectorAll('.card-wrapper');
    const bestSellerProducts = window.bestSellerProducts || []; // Access the embedded data

    productElements.forEach((productElement) => {
      const productId = productElement.getAttribute('data-product-id'); // Ensure this attribute is set in your HTML
      const isBestSeller = bestSellerProducts.some((product) => product.id === productId);

      if (isBestSeller) {
        const badge = document.createElement('div');
        badge.className = 'best-seller-badge';
        badge.innerText = 'Best Seller';
        productElement.appendChild(badge);
        console.log('Added Best Seller badge to product:', productElement);
      } else {
        console.log('Product is not a best seller:', productElement);
      }
    });

    console.log(bestSellerProducts.length > 0 ? 'Best seller badges have been added.' : 'No Best Seller badges found.');
  } catch (error) {
    console.error('An error occurred while adding best-seller badges:', error);
  }
})();
