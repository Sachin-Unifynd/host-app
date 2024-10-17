(async function() {
  try {
    // Fetch the list of best-seller products from your API endpoint
    const response = await fetch('/api/app.best-sellers.ts');

    // Check if the response is successful
    if (!response.ok) {
      console.error('Failed to fetch best-seller products. Status:', response.status);
      return; // Exit the function if the request failed
    }

    const bestSellers = await response.json();

    // Verify that the response is an array
    if (!Array.isArray(bestSellers)) {
      console.error('Unexpected response format. Expected an array of product IDs:', bestSellers);
      return;
    }

    console.log('Fetched best-seller product IDs:', bestSellers);

    // Iterate over the array of best-seller product IDs
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

        console.log('Added Best Seller badge to product ID:', productId);
      } else {
        console.warn('Product element not found for product ID:', productId);
      }
    });

  } catch (error) {
    // Handle any other errors that occur during the fetch
    console.error('An error occurred while fetching best-seller products:', error);
  }
})();
