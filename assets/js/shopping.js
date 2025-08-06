// Shop items data
const shopItems = [
  {
    name: "Traditional Longyi",
    description: "Worn for generations in Myanmar, symbolizing elegance and comfort.",
    image: "assets/imgs/shopping/longyi.jpg",
    price: "25000ks"
  },
  {
    name: "Burmese Puppet",
    description: "Handcrafted puppet used in traditional theatre performances.",
    image: "assets/imgs/shopping/puppet.jpg",
    price: "50000ks"
  },
  {
    name: "Lacquerware Box",
    description: "Beautifully carved container made with ancient techniques in Bagan.",
    image: "assets/imgs/shopping/lacquer-box.jpg",
    price: "30000ks"
  }
];

// Get the container element where shop items will be displayed
const shopContainer = document.getElementById("shopContainer");

// Clear loading message
shopContainer.innerHTML = "";

// Loop through each item in the shopItems array
shopItems.forEach(item => {
  // Create a div element for Bootstrap column layout
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4"; // Set Bootstrap column and margin-bottom classes

  // Set the inner HTML of the column to a card with item details
  col.innerHTML = `
    <div class="card h-100 product-card">
      <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 220px; object-fit: cover;">
      <div class="card-body d-flex flex-column">
        <div>
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <h3 class="card-price">${item.price}</h3>
        </div>
        <div class="mt-auto pt-3">
          <div class="d-flex justify-content-center align-items-center mb-3">
            <button class="btn btn-outline-secondary quantity-btn minus">-</button>
            <input type="number" class="form-control quantity-input" value="1" min="1">
            <button class="btn btn-outline-secondary quantity-btn plus">+</button>
          </div>
          <button class="btn w-100 add-to-cart" data-id="${item.name}" style="background-color:#643b47; color: white;">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;

  // Add the column with the card into the shop container on the page
  shopContainer.appendChild(col);
});