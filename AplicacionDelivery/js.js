
      // Datos simulados de restaurantes y platos
      const restaurants = [
        {
          id: 1,
          name: "La Pizzería",
          cuisine: "Italiana",
          image: "/example/pizza.jpg",
          menu: [
            { id: 101, name: "Pizza Margherita", price: 10.99 },
            { id: 102, name: "Pizza Pepperoni", price: 12.99 },
            { id: 103, name: "Pasta Carbonara", price: 9.99 },
          ],
        },
        {
          id: 2,
          name: "Sushi Express",
          cuisine: "Japonesa",
          image: "",
          menu: [
            { id: 201, name: "Sushi Mix", price: 15.99 },
            { id: 202, name: "Ramen", price: 11.99 },
            { id: 203, name: "Tempura", price: 8.99 },
          ],
        },
        {
          id: 3,
          name: "Burger Palace",
          cuisine: "Americana",
          image: "/example/Hamburguesa.jpg",
          menu: [
            { id: 301, name: "Classic Burger", price: 8.99 },
            { id: 302, name: "Cheeseburger", price: 9.99 },
            { id: 303, name: "Fries", price: 3.99 },
          ],
        },
      ];
      const restaurantList = document.getElementById("restaurantList");
      const searchInput = document.querySelector(".search-input");
      const searchButton = document.querySelector(".search-button");
      const cartItems = document.getElementById("cartItems");
      const cartTotal = document.getElementById("cartTotal");
      const checkoutModal = document.getElementById("checkoutModal");
      const paymentForm = document.getElementById("paymentForm");

      let cart = [];

      function displayRestaurants(search = "") {
        const filteredRestaurants = restaurants.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(search.toLowerCase())
        );

        restaurantList.innerHTML = "";

        filteredRestaurants.forEach((restaurant) => {
          const card = document.createElement("div");
          card.className = "restaurant-card";
          card.innerHTML = `
      <img class="restaurant-image" src="./${restaurant.image}" alt="${restaurant.name}" width="200" height="150">
      <div class="restaurant-info">
        <div class="restaurant-name">${restaurant.name}</div>
        <div class="restaurant-cuisine">${restaurant.cuisine}</div>
        <button onclick="showMenu(${restaurant.id})">Ver Menú</button>
      </div>
    `;
          restaurantList.appendChild(card);
        });
      }

      function showMenu(restaurantId) {
        const restaurant = restaurants.find((r) => r.id === restaurantId);
        restaurantList.innerHTML = `
    <h2>${restaurant.name} - Menú</h2>
    <button onclick="displayRestaurants()">Volver a restaurantes</button>
    <div class="menu-list">
      ${restaurant.menu
        .map(
          (item) => `
        <div class="menu-item">
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button onclick="addToCart(${restaurantId}, ${
            item.id
          })">Añadir al carrito</button>
        </div>
      `
        )
        .join("")}
    </div>
  `;
      }

      function addToCart(restaurantId, itemId) {
        const restaurant = restaurants.find((r) => r.id === restaurantId);
        const item = restaurant.menu.find((i) => i.id === itemId);
        cart.push({ ...item, restaurantName: restaurant.name });
        updateCart();
      }

      function updateCart() {
        cartItems.innerHTML = cart
          .map(
            (item) => `
    <div>${item.restaurantName} - ${item.name} - $${item.price.toFixed(2)}</div>
  `
          )
          .join("");

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
      }

      function showCheckoutModal() {
        checkoutModal.style.display = "block";
      }

      function hideCheckoutModal() {
        checkoutModal.style.display = "none";
      }

      searchButton.addEventListener("click", () => {
        displayRestaurants(searchInput.value);
      });

      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          displayRestaurants(searchInput.value);
        }
      });

      paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("¡Pago procesado con éxito! Tu pedido está en camino.");
        cart = [];
        updateCart();
        hideCheckoutModal();
      });

      // Cerrar el modal si se hace clic fuera de él
      window.onclick = function (event) {
        if (event.target == checkoutModal) {
          hideCheckoutModal();
        }
      };

      // Cargar restaurantes iniciales
      displayRestaurants();
    