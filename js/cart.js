// ============================================
// SHOPPING CART MODULE
// Handles all cart operations with localStorage persistence
// ============================================

const Cart = {
    items: [],
    
    // ============================================
    // INITIALIZE CART
    // ============================================
    
    init: function() {
        console.log('Cart.js initializing...');
        this.loadFromStorage();
        this.updateUI();
        this.attachEventListeners();
    },
    
    // ============================================
    // LOAD CART FROM LOCALSTORAGE
    // ============================================
    
    loadFromStorage: function() {
        try {
            const saved = localStorage.getItem('nepaliShopCart');
            if (saved) {
                this.items = JSON.parse(saved);
                console.log('Cart loaded from localStorage:', this.items.length + ' items');
            } else {
                console.log('No saved cart found');
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            this.items = [];
        }
    },
    
    // ============================================
    // SAVE CART TO LOCALSTORAGE
    // ============================================
    
    save: function() {
        try {
            localStorage.setItem('nepaliShopCart', JSON.stringify(this.items));
            console.log('Cart saved to localStorage');
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    },
    
    // ============================================
    // ADD ITEM TO CART
    // ============================================
    
    addItem: function(productId, quantity = 1) {
        // Find product in products array
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }
        
        // Check if item already in cart
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            // Increase quantity
            existingItem.quantity += quantity;
            console.log('Increased quantity for:', product.name);
        } else {
            // Add new item
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
            console.log('Added to cart:', product.name);
        }
        
        // Save and update UI
        this.save();
        this.updateUI();
        
        // Trigger haptic feedback
        if (typeof HapticFeedback !== 'undefined') {
            HapticFeedback.vibrate('addToCart');
        }
        
        // Show notification
        this.showNotification('✓ ' + product.name + ' added to cart');
    },
    
    // ============================================
    // REMOVE ITEM FROM CART
    // ============================================
    
    removeItem: function(productId) {
        const item = this.items.find(i => i.id === productId);
        const itemName = item ? item.name : 'Item';
        
        this.items = this.items.filter(item => item.id !== productId);
        
        this.save();
        this.updateUI();
        
        // Trigger haptic feedback
        if (typeof HapticFeedback !== 'undefined') {
            HapticFeedback.vibrate('removeFromCart');
        }
        
        // Show notification
        this.showNotification('✗ ' + itemName + ' removed from cart');
        
        console.log('Removed from cart:', itemName);
    },
    
    // ============================================
    // UPDATE ITEM QUANTITY
    // ============================================
    
    updateQuantity: function(productId, newQuantity) {
        newQuantity = parseInt(newQuantity);
        
        // Remove if quantity is 0 or negative
        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }
        
        // Find and update item
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.save();
            this.updateUI();
            console.log('Updated quantity:', item.name, newQuantity);
        }
    },
    
    // ============================================
    // CALCULATE CART TOTAL
    // ============================================
    
    getTotal: function() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    },
    
    // ============================================
    // GET TOTAL ITEM COUNT
    // ============================================
    
    getTotalItems: function() {
        return this.items.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    },
    
    // ============================================
    // CLEAR CART
    // ============================================
    
    clear: function() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.items = [];
            this.save();
            this.updateUI();
            this.showNotification('Cart cleared');
            console.log('Cart cleared');
        }
    },
    
    // ============================================
    // UPDATE UI ELEMENTS
    // ============================================
    
    updateUI: function() {
        // Update cart count badge
        this.updateCartBadge();
        
        // If on cart page, render cart items
        const cartContainer = document.getElementById('cart-items');
        if (cartContainer) {
            this.renderCartPage();
        }
    },
    
    // ============================================
    // UPDATE CART BADGE
    // ============================================
    
    updateCartBadge: function() {
        const cartBadge = document.getElementById('cart-count');
        if (cartBadge) {
            const totalItems = this.getTotalItems();
            cartBadge.textContent = totalItems;
            
            // Add animation class
            cartBadge.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBadge.style.transform = 'scale(1)';
            }, 200);
        }
    },
    
    // ============================================
    // RENDER CART PAGE
    // ============================================
    
    renderCartPage: function() {
        const container = document.getElementById('cart-items');
        const totalElement = document.getElementById('cart-total');
        
        if (!container) return;
        
        // Empty cart state
        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <h3>Your cart is empty</h3>
                    <p>Add some authentic Nepali products to get started!</p>
                    <a href="index.html" class="btn btn-primary">Browse Products</a>
                </div>
            `;
            if (totalElement) {
                totalElement.textContent = '£0.00';
            }
            return;
        }
        
        // Render cart items
        let html = '';
        this.items.forEach(item => {
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image"
                         onerror="this.src='https://via.placeholder.com/100x100?text=Product'">
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-price">£${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="Cart.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                        <input type="number" 
                               class="quantity-input" 
                               value="${item.quantity}" 
                               min="1" 
                               onchange="Cart.updateQuantity(${item.id}, this.value)">
                        <button class="quantity-btn" onclick="Cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="cart-item-total">
                        £${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button class="cart-item-remove" onclick="Cart.removeItem(${item.id})" title="Remove item">
                        ×
                    </button>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Update total
        if (totalElement) {
            totalElement.textContent = '£' + this.getTotal().toFixed(2);
        }
    },
    
    // ============================================
    // SHOW NOTIFICATION
    // ============================================
    
    showNotification: function(message) {
        // Remove existing notifications
        const existing = document.querySelector('.cart-notification');
        if (existing) {
            existing.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },
    
    // ============================================
    // ATTACH EVENT LISTENERS
    // ============================================
    
    attachEventListeners: function() {
        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.items.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                
                // Trigger haptic feedback
                if (typeof HapticFeedback !== 'undefined') {
                    HapticFeedback.vibrate('success');
                }
                
                alert('Checkout functionality coming in next milestone!\n\nTotal: £' + this.getTotal().toFixed(2));
            });
        }
    }
};

// ============================================
// INITIALIZE CART ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    Cart.init();
});