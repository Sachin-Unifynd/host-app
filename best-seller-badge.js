// Function to introduce a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to fetch data with retry logic
async function fetchWithRetry(url, options, retries = 2) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);
    if (response.status === 429) {
      // If we get a 429 error, we should wait before retrying
      const retryAfter = response.headers.get('Retry-After');
      console.warn(`Rate limited, retrying after ${retryAfter || 1} seconds...`);
      await delay((retryAfter || 1) * 1000); // Wait before retrying
    } else if (response.ok) {
      // If response is okay, return the data
      return response.json();
    } else {
      console.error('Failed to fetch data:', response.status, response.statusText);
      return null;
    }
  }
  throw new Error('Too many requests, please try again later.');
}

// Main function to fetch and display best-seller product IDs with throttling
(async function () {
  try {
    // Fetch the list of best-seller products from your API endpoint with retry logic
    const bestSellers = await fetchWithRetry('/api/best-sellers.ts');

    // Print the fetched content to the console
    console.log('API Content:', bestSellers);

    if (!bestSellers || !Array.isArray(bestSellers)) {
      console.error('Unexpected response format. Expected an array of product IDs:', bestSellers);
      return;
    }

    console.log('Fetched best-seller product IDs:', bestSellers);

    // Iterate over the array of best-seller product IDs
    for (const productId of bestSellers) {
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

      // Throttle requests by adding a delay between iterations
      await delay(500); // 500ms delay to avoid hitting the rate limit quickly
    }

    // Alert to indicate the script has finished
    alert('Best seller badges have been added successfully.');

  } catch (error) {
    // Handle any other errors that occur during the fetch
    console.error('An error occurred while fetching best-seller products:', error);
    alert('Failed to fetch or display best-seller products.');
  }
})();
