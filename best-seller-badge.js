// Function to introduce a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Main function to check for best-seller metafield and display badges
(async function () {
  try {
    // Select all product elements
    const productElements = document.querySelectorAll('.card-wrapper'); // Adjust the selector to target your product elements

    // Iterate over each product element
    for (const productElement of productElements) {
      // Check if the product has a "Best Seller" metafield value
      const metafieldValue = productElement.getAttribute('data-metafield-best-seller'); // Change to the actual attribute you use
      const isBestSeller = metafieldValue === 'true'; // Check if the metafield indicates best seller

      // Create the badge element if the metafield value is true
      if (isBestSeller) {
        const badge = document.createElement('div');
        badge.className = 'best-seller-badge';
        badge.innerText = 'Best Seller';

        // Add the badge to the product element
        productElement.appendChild(badge);
        console.log('Added Best Seller badge to product:', productElement);
      } else {
        console.log('Product is not a best seller:', productElement);
      }

      // Throttle requests by adding a delay between iterations
      await delay(500); // 500ms delay to avoid any potential performance issues
    }

    // Alert to indicate the script has finished
    alert('Best seller badges have been added successfully.');

  } catch (error) {
    // Handle any other errors that occur during the process
    console.error('An error occurred while adding best-seller badges:', error);
    alert('Failed to display best-seller products.');
  }
})();
