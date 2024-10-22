/ Main function to check for best-seller metafield and display badges
(function () {
  try {
    // Select all product elements
    const productElements = document.querySelectorAll('.card-wrapper'); // Adjust the selector to target your product elements

    let hasBestSeller = false;

    // Iterate over each product element once
    productElements.forEach((productElement) => {
      // Check if the product has a "Best Seller" metafield value
      const metafieldValue = productElement.getAttribute('metafield-product_badges.best_seller'); // Use the namespace and key for the metafield
      const isBestSeller = metafieldValue === 'true'; // Check if the metafield indicates best seller

      // Create the badge element if the metafield value is true
      if (isBestSeller) {
        const badge = document.createElement('div');
        badge.className = 'best-seller-badge';
        badge.innerText = 'Best Seller';

        // Add the badge to the product element
        productElement.appendChild(badge);
        console.log('Added Best Seller badge to product:', productElement);

        hasBestSeller = true; // Set flag to true if at least one best seller is found
      } else {
        console.log('Product is not a best seller:', productElement);
      }
    });

    // Log the result once after processing
    console.log(hasBestSeller ? 'Best seller badges have been added successfully.' : 'No Best Seller badges were added.');

  } catch (error) {
    // Handle any other errors that occur during the process
    console.error('An error occurred while adding best-seller badges:', error);
  }
})();
