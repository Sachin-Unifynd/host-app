document.addEventListener("DOMContentLoaded", function() {
  // Find all best seller badges on the page
  const bestSellerBadges = document.querySelectorAll('.best-seller-badge');
  
  // Loop over each badge and apply any desired styling
  bestSellerBadges.forEach(function(badge) {
    console.log(badge); // Log the badge element to the console
    badge.style.backgroundColor = 'gold';   // Example styling
    badge.style.padding = '10px';
    badge.style.borderRadius = '5px';
    badge.style.fontWeight = 'bold';
    badge.innerText = '🔥 Best Seller';     // Customize the badge text
  });
});
