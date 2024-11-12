(function () {
  try {
    // Access product data injected into the page
    const productData = window.productData || {}; // Assuming `productData` is available on the window object

    if (!productData || !Array.isArray(productData)) {
      console.log('No product data available or invalid format');
      return;
    }

    let hasBestSeller = false;

    // Iterate over the product data and add badges where needed
    productData.forEach((product) => {
      const isBestSeller = product.metafields['best_seller'] === 'true'; // Access best_seller metafield directly

      if (isBestSeller) {
        // Find the corresponding product element on the page
        const productElement = document.querySelector(`[data-handle="${product.handle}"]`);

        if (productElement) {
          // Create the badge element
          const badge = document.createElement('div');
          badge.className = 'best-seller-badge';
          badge.innerText = 'Best Seller';

          // Add the badge to the product element
          productElement.appendChild(badge);
          console.log('Added Best Seller badge to product:', productElement);

          hasBestSeller = true;
        }
      } else {
        console.log('Product is not a best-seller:', product);
      }
    });

    console.log(hasBestSeller ? 'Best seller badges have been added successfully.' : 'No Best Seller badges were added.');

  } catch (error) {
    console.error('An error occurred while adding best-seller badges:', error);
  }
})();
