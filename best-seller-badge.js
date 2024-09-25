document.addEventListener("DOMContentLoaded", async function() {
  console.log("DOM fully loaded and parsed.");

  // Assume product ID is available on the page
  const productId = '{{ product.id }}'; 
  console.log("Product ID:", productId);

  // Shopify Storefront API URL (to fetch metafields for the product)
  const apiUrl = `/products/${productId}.json`;
  console.log("API URL to fetch product data:", apiUrl);

  try {
    // Fetch product data
    const response = await fetch(apiUrl);
    console.log("API response:", response);

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    const productData = await response.json();
    console.log("Product data fetched successfully:", productData);

    // Check if the metafield for best seller is "true"
    const bestSellerMetafield = productData.product.metafields.find(metafield => 
      metafield.namespace === 'product_badges' && metafield.key === 'best_seller'
    );

    console.log("Best Seller Metafield:", bestSellerMetafield);

    if (bestSellerMetafield && bestSellerMetafield.value === 'true') {
      console.log("Best Seller metafield is true. Adding Best Seller badge.");

      // Create a Best Seller badge
      const bestSellerBadge = document.createElement('div');
      bestSellerBadge.classList.add('best-seller-badge');
      bestSellerBadge.innerHTML = '🔥 Best Seller';
      console.log("Best Seller badge created:", bestSellerBadge);

      // Add the badge to the product element on the page
      const productElement = document.querySelector('.product');
      console.log("Product element on the page:", productElement);

      if (productElement) {
        productElement.appendChild(bestSellerBadge);
        console.log("Best Seller badge successfully added to the product.");
      } else {
        console.log("Product element not found. Could not add the badge.");
      }
    } else {
      console.log("Best Seller metafield is false or not found.");
    }
  } catch (error) {
    console.error("Error fetching or processing product data:", error);
  }
});
