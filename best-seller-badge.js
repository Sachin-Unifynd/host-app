(async function() {
  // Fetch the list of best-seller products from your API endpoint
  const response = await fetch('/api/best-sellers');
  const bestSellers = await response.json(); // Assuming this returns an array of product IDs

  // Assuming the response is an array of product IDs that are best sellers
  bestSellers.forEach(productId => {
    // Find the product elements on the page based on a unique selector
    const productElement = document.querySelector(`[data-product-id="${productId}"]`);

    if (productElement) {
      // Create the badge element
      const badge = document.createElement('div');
      badge.className = 'best-seller-badge';
      badge.innerText = 'Best Seller';

      // Add the badge to the product element
      productElement.appendChild(badge);
    }
  });
})();
