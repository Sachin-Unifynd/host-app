document.addEventListener("DOMContentLoaded", async function() {
  alert("Best Seller Badge Script Loaded!"); // Add alert to confirm the script has loaded
  console.log("DOM fully loaded and parsed.");

  // Retrieve the product card class name from local storage
  const productCardClass = localStorage.getItem("productCardClass") || "";
  console.log("Retrieved product card class from local storage:", productCardClass);

  if (!productCardClass) {
    console.error("No product card class specified");
    return;
  }

  // Get all product elements with the specified class
  const productElements = document.querySelectorAll(`.${productCardClass}`);
  console.log(`Found product elements with class "${productCardClass}":`, productElements);

  if (productElements.length === 0) {
    console.warn(`No elements found with class "${productCardClass}".`);
  }

  for (const productElement of productElements) {
    // Fetch the product ID or handle from data attributes
    const productId = productElement.dataset.productId || productElement.dataset.productHandle;
    console.log("Processing product element:", productElement);
    console.log("Extracted Product ID/Handle:", productId);

    if (!productId) {
      console.error("Product ID or Handle not found for this element:", productElement);
      continue; // Skip to the next element
    }

    // Shopify Storefront API URL to fetch metafields for each product
    const apiUrl = `/products/${productId}.json`; // Adjust to your Storefront API endpoint
    console.log("API URL to fetch product data:", apiUrl);

    try {
      // Fetch product data
      const response = await fetch(apiUrl);
      console.log("API response for product ID:", productId, response);

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const productData = await response.json();
      console.log("Product data fetched successfully for product ID:", productId, productData);

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
        bestSellerBadge.innerHTML = '<div>Best Seller</div>';
        console.log("Best Seller badge created:", bestSellerBadge);

        // Add the badge to the product element
        productElement.appendChild(bestSellerBadge);
        console.log("Best Seller badge successfully added to the product ID:", productId);

        // Create another div to append to the targeted div
        const targetedDiv = document.createElement('div');
        targetedDiv.classList.add('targeted-div'); // Add your custom class
        targetedDiv.innerHTML = '<p>This is a targeted div</p>'; // Add content to the div
        console.log("Targeted div created:", targetedDiv);

        // Append the targeted div to the product element (or adjust this to a specific parent)
        productElement.appendChild(targetedDiv);
        console.log("Targeted div successfully added to the product ID:", productId);
      } else {
        console.log("Best Seller metafield is false or not found for product ID:", productId);
      }
    } catch (error) {
      console.error("Error fetching or processing product data for product ID:", productId, error);
    }
  }
});
