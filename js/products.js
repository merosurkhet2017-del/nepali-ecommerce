// ============================================
// PRODUCT DATA
// Sample Nepali products for the platform
// ============================================

const products = [
    {
        id: 1,
        name: "Traditional Dhaka Topi",
        price: 15.99,
        image: "images/products/dhaka-topi.jpg",
        description: "Handwoven traditional Nepali hat from Palpa district",
        cultural_context: "The Dhaka topi is a symbol of Nepali national identity, worn during festivals and formal occasions.",
        category: "clothing",
        inStock: true
    },
    {
        id: 2,
        name: "Tibetan Singing Bowl",
        price: 45.00,
        image: "images/products/singing-bowl.jpg",
        description: "Authentic handcrafted singing bowl from Kathmandu",
        cultural_context: "Used in meditation and healing practices for centuries across the Himalayan region.",
        category: "spiritual",
        inStock: true
    },
    {
        id: 3,
        name: "Pashmina Shawl",
        price: 89.99,
        image: "images/products/pashmina.jpg",
        description: "Premium cashmere pashmina from the Himalayan highlands",
        cultural_context: "Prized for its softness and warmth, pashmina has been a luxury textile for over 500 years.",
        category: "clothing",
        inStock: true
    },
    {
        id: 4,
        name: "Lokta Paper Journal",
        price: 12.50,
        image: "images/products/lokta-journal.jpg",
        description: "Handmade journal using traditional Lokta paper",
        cultural_context: "Lokta paper-making is an ancient Nepali craft using bark from the Daphne shrub.",
        category: "crafts",
        inStock: true
    },
    {
        id: 5,
        name: "Khukuri Knife",
        price: 65.00,
        image: "images/products/khukuri.jpg",
        description: "Traditional Gurkha knife, handforged in Dharan",
        cultural_context: "The khukuri is the national weapon of Nepal, symbolizing bravery and honor.",
        category: "cultural",
        inStock: true
    },
    {
        id: 6,
        name: "Prayer Flags Set",
        price: 18.00,
        image: "images/products/prayer-flags.jpg",
        description: "Traditional Buddhist prayer flags - set of 25",
        cultural_context: "Prayer flags carry mantras and prayers, believed to spread goodwill and compassion.",
        category: "spiritual",
        inStock: true
    },
    {
        id: 7,
        name: "Dhaka Fabric Bag",
        price: 28.50,
        image: "images/products/dhaka-bag.jpg",
        description: "Handwoven shoulder bag with traditional Dhaka patterns",
        cultural_context: "Dhaka fabric features intricate geometric patterns unique to Nepal.",
        category: "accessories",
        inStock: true
    },
    {
        id: 8,
        name: "Nepali Tea Set",
        price: 32.00,
        image: "images/products/tea-set.jpg",
        description: "Premium Himalayan tea collection with traditional cups",
        cultural_context: "Nepali tea culture blends Tibetan butter tea traditions with Indian chai.",
        category: "food",
        inStock: true
    },
    {
        id: 9,
        name: "Thangka Painting",
        price: 125.00,
        image: "images/products/thangka.jpg",
        description: "Small traditional Buddhist thangka painting",
        cultural_context: "Thangka paintings are sacred Buddhist art used for meditation and teaching.",
        category: "art",
        inStock: true
    },
    {
        id: 10,
        name: "Bamboo Flute (Bansuri)",
        price: 22.00,
        image: "images/products/bansuri.jpg",
        description: "Handcrafted bamboo flute from traditional artisans",
        cultural_context: "The bansuri is central to Nepali folk music and spiritual practices.",
        category: "music",
        inStock: true
    }
];

// ============================================
// DISPLAY PRODUCTS ON PAGE
// ============================================

function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) {
        console.log('Products grid not found - not on products page');
        return;
    }
    
    // Clear existing content
    productsGrid.innerHTML = '';
    
    // Create product cards
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// ============================================
// CREATE PRODUCT CARD
// ============================================

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" 
             onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}'">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">£${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <button class="btn btn-primary btn-full" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// ============================================
// ADD TO CART (will be implemented in cart.js)
// ============================================

function addToCart(productId) {
    if (typeof Cart !== 'undefined') {
        Cart.addItem(productId);
    } else {
        console.error('Cart object not loaded');
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Products.js loaded');
    displayProducts();
});