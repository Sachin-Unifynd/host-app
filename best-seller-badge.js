(function () {
  try {
    // Print all product data to check availability
    console.log('Product data from Prisma:', window.bestSellerProducts);

    // If needed, proceed with the rest of the script logic after verification
    const productElements = document.querySelectorAll('.card-wrapper');
    const bestSellerProducts = window.bestSellerProducts || [];

    productElements.forEach((productElement) => {
      const productId = productElement.getAttribute('data-product-id'); // Ensure this attribute exists in your HTML
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

  } catch (error) {
    console.error('An error occurred while accessing product data:', error);
  }
})();
