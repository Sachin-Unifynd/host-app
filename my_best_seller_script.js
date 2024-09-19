(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM fully loaded and parsed");

        // Fetch the product data from Shopify's Storefront API
        const productHandle = window.location.pathname.split("/").pop(); // Get the product handle from the URL
        console.log("Product handle:", productHandle);
        
        fetch(`/products/${productHandle}.json`)
            .then(response => {
                console.log("Fetched product data response:", response);
                return response.json();
            })
            .then(data => {
                console.log("Parsed product data:", data);
                const metafields = data.product.metafields || [];
                console.log("Metafields:", metafields);

                // Check for the 'best_seller' metafield
                const bestSellerField = metafields.find(metafield => 
                    metafield.namespace === 'product_badges' && metafield.key === 'best_seller'
                );
                console.log("Best Seller Metafield:", bestSellerField);

                if (bestSellerField && bestSellerField.value === 'true') {
                    // Create the "Best Seller" badge
                    const badge = document.createElement('div');
                    badge.innerHTML = '<span class="best-seller-badge">Best Seller</span>';
                    badge.style.cssText = 'background-color: gold; color: black; font-weight: bold; padding: 5px; border-radius: 5px; display: inline-block;';
                    
                    // Append the badge to the product title (you can customize this selector)
                    const productTitleElement = document.querySelector('.product-title');
                    if (productTitleElement) {
                        console.log("Appending badge to product title");
                        productTitleElement.appendChild(badge);
                    } else {
                        console.log("Product title element not found");
                    }
                } else {
                    console.log("No 'Best Seller' metafield found or value is not true");
                }
            })
            .catch(error => console.error('Error fetching product metafields:', error));
    });
})();
