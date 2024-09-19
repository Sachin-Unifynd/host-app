(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Fetch the product data from Shopify's Storefront API
        const productHandle = window.location.pathname.split("/").pop(); // Get the product handle from the URL
        
        fetch(`/products/${productHandle}.json`)
            .then(response => response.json())
            .then(data => {
                const metafields = data.product.metafields || [];
                
                // Check for the 'best_seller' metafield
                const bestSellerField = metafields.find(metafield => 
                    metafield.namespace === 'product_badges' && metafield.key === 'best_seller'
                );

                if (bestSellerField && bestSellerField.value === 'true') {
                    // Create the "Best Seller" badge
                    const badge = document.createElement('div');
                    badge.innerHTML = '<span class="best-seller-badge">Best Seller</span>';
                    badge.style.cssText = 'background-color: gold; color: black; font-weight: bold; padding: 5px; border-radius: 5px; display: inline-block;';
                    
                    // Append the badge to the product title (you can customize this selector)
                    const productTitleElement = document.querySelector('.product-title');
                    if (productTitleElement) {
                        productTitleElement.appendChild(badge);
                    }
                }
            })
            .catch(error => console.error('Error fetching product metafields:', error));
    });
})();
