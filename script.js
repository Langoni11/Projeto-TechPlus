// Inicializa o carrinho e elementos da interface
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceDisplay = document.getElementById("total-price");

// Função para adicionar ao carrinho
function addToCart(button) {
    const productElement = button.closest(".product");
    const productName = productElement.getAttribute("data-name");
    const productPrice = parseFloat(productElement.getAttribute("data-price"));

    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

// Função para atualizar o carrinho na interface
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} 
            <button onclick="removeFromCart('${item.name}')">Remover</button>
        </div>
    `).join("");

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceDisplay.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
}

// Função para remover itens do carrinho
function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        const product = cart[productIndex];
        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            cart.splice(productIndex, 1);
        }
    }

    updateCart();
}

// Função de login
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    alert("Login realizado com sucesso!");
    
    // Redireciona para a página principal
    window.location.href = "index.html"; 
});

// Função para logout e redefinir o carrinho
function logout() {
    cart = [];
    updateCart();
    alert("Você saiu com sucesso!");
    window.location.href = "login.html"; // Redireciona para a página de login
}
