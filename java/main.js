document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('salves_cart')) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartBadge = document.querySelector('header a[href="cart.html"] span');
    if (cartBadge) {
        cartBadge.textContent = totalCount;
    }
}