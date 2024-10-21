// Function to introduce a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to fetch data with retry logic and exponential backoff
async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);
    if (response.status === 429) {
      // If we get a 429 error, we should wait before retrying
      const retryAfter = response.headers.get('Retry-After');
      const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : (2 ** i) * 1000; // Exponential backoff
      console.warn(`Rate limited, retrying after ${waitTime / 1000} seconds...`);
      await delay(waitTime);
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

// Main function to fetch and display best-seller product IDs with caching
(async function () {
  try {
    // Check local storage for cached data
    const cacheKey = 'bestSellersCache';
    const cacheDuration = 60 * 60 * 1000; // 1 hour
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

    let bestSellers;
    if (cachedData && cacheTimestamp && (Date.now() - parseInt(cacheTimestamp, 10)) < cacheDuration) {
      // Use cached data if it's still fresh
      console.log('Using cached best-seller data');
      bestSellers = JSON.parse(cachedData);
    } else {
      // Fetch the list of best-seller products from your API endpoint with retry logic
      bestSellers = await fetchWithRetry('/api/best-sellers.ts');

      if (!bestSellers || !Array.isArray(bestSellers)) {
        console.error('Unexpected response format. Expected an array of product IDs:', bestSellers);
        return;
      }

      // Cache the fetched data
      localStorage.setItem(cacheKey, JSON.stringify(bestSellers));
      localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
    }

    console.log('Fetched best-seller product IDs:', bestSellers);

    // Iterate over the array of best-seller product IDs
    for (const productId of bestSellers) {
      // Find the product elements on the page based on a unique selector
      const productElement = document.querySelector(`[data-product-id="${productId}"]`);

      if (productElement) {
        // Check if the product has a "Best Seller" metafield value
        const isBestSeller = productElement.getAttribute('data-best-seller') === 'true';

        if (isBestSeller) {
          // Create the badge element
          const badge = document.createElement('div');
          badge.className = 'best-seller-badge';
          badge.innerText = 'Best Seller';

          // Add the badge to the product element
          productElement.appendChild(badge);
          console.log('Added Best Seller badge to product ID:', productId);
        } else {
          console.log(`Product ID ${productId} is not marked as a Best Seller.`);
        }
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
