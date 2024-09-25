document.addEventListener("DOMContentLoaded", async function() {
  // Assume product ID is available on the page
  const productId = '{{ product.id }}'; 

  // Shopify Storefront API URL (to fetch metafields for the product)
  const apiUrl = `/products/${productId}.json`;

  // Fetch product data
  const response = await fetch(apiUrl);
  const productData = await response.json();
  
  // Check if the metafield for best seller is "true"
  const bestSellerMetafield = productData.product.metafields.find(metafield => 
    metafield.namespace === 'product_badges' && metafield.key === 'best_seller'
  );

  if (bestSellerMetafield && bestSellerMetafield.value === 'true') {
    // Create a Best Seller badge
    const bestSellerBadge = document.createElement('div');
    bestSellerBadge.classList.add('best-seller-badge');
    bestSellerBadge.innerHTML = '🔥 Best Seller';

    // Add the badge to the product element on the page
    const productElement = document.querySelector('.product');
    if (productElement) {
      productElement.appendChild(bestSellerBadge);
    }
  }
});
