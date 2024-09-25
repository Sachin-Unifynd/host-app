document.addEventListener("DOMContentLoaded", async function() {
  console.log("DOM fully loaded and parsed.");

  // Get all product elements on the page
  const productElements = document.querySelectorAll('.product'); // Adjust the selector to match your HTML structure
  console.log("Found product elements:", productElements);

  for (const productElement of productElements) {
    // Assume each product element contains a data attribute with its product ID
    const productId = productElement.dataset.productId; // Example: <div class="product" data-product-id="{{ product.id }}"> 
    console.log("Product ID:", productId);

    // Shopify Storefront API URL to fetch metafields for each product
    const apiUrl = `/products/${productId}.json`;
    console.log("API URL to fetch product data:", apiUrl);

    try {
      // Fetch product data
      const response = await fetch(apiUrl);
      console.log("API response for product ID:", productId, response);

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const productData = await response.json();
      console.log("Product data fetched successfully:", productData);

      // Check if the metafield for best seller is "true"
      const bestSellerMetafield = productData.product.metafields.find(metafield => 
        metafield.namespace === 'product_badges' && metafield.key === 'best_seller'
      );

      console.log("Best Seller Metafield for product ID:", productId, bestSellerMetafield);

      if (bestSellerMetafield && bestSellerMetafield.value === 'true') {
        console.log("Best Seller metafield is true. Adding Best Seller badge.");

        // Create a Best Seller badge
        const bestSellerBadge = document.createElement('div');
        bestSellerBadge.classList.add('best-seller-badge');
        bestSellerBadge.innerHTML = '<div>Best Seller</div>'; // Updated to include <div>Best Seller</div>
        console.log("Best Seller badge created:", bestSellerBadge);

        // Add the badge to the product element
        productElement.appendChild(bestSellerBadge);
        console.log("Best Seller badge successfully added to the product ID:", productId);
      } else {
        console.log("Best Seller metafield is false or not found for product ID:", productId);
      }
    } catch (error) {
      console.error("Error fetching or processing product data for product ID:", productId, error);
    }
  }
});
