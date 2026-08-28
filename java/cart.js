document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalSpan = document.getElementById('cart-total');
    
    if (!container || !totalSpan) return;

    let cart = JSON.parse(localStorage.getItem('salves_cart')) || [];

    if (cart.length === 0) {
        container.innerHTML = `<p>Your cart is empty. Time to adopt a little yarn friend! 🧶</p>`;
        totalSpan.textContent = '0';
        return;
    }

    let html = '';
    let grandTotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        html += `
            <div style="border-bottom: 1px solid #ddd; padding: 10px 0; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="margin: 0;">${item.name}</h4>
                    <p style="margin: 5px 0 0 0;">${item.price} OMR × ${item.quantity} = <strong>${itemTotal} OMR</strong></p>
                </div>
                <button onclick="removeItem(${index})" style="background: #b5838d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remove</button>
            </div>
        `;
    });

    container.innerHTML = html;
    totalSpan.textContent = grandTotal;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('salves_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('salves_cart', JSON.stringify(cart));
    renderCart();
    
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
}