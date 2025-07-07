const shopItems = [
  {
    name: "Traditional Longyi", // Name of the item
    description: "Worn for generations in Myanmar, symbolizing elegance and comfort.", // Short description
    image: "assets/imgs/shopping/longyi.jpg", // Image source path
    price:"25000ks" // Price of the item
  },
  {
    name: "Burmese Puppet",
    description: "Handcrafted puppet used in traditional theatre performances.",
    image: "assets/imgs/shopping/puppet.jpg",
    price:"50000ks"
  },
  {
    name: "Lacquerware Box",
    description: "Beautifully carved container made with ancient techniques in Bagan.",
    image: "assets/imgs/shopping/lacquer-box.jpg",
    price:"30000ks"
  }

];

// Get the container element where shop items will be displayed
const shopContainer = document.getElementById("shopContainer");

// Loop through each item in the shopItems array
shopItems.forEach(item => {
  // Create a div element for Bootstrap column layout
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4"; // Set Bootstrap column and margin-bottom classes

  // Set the inner HTML of the column to a card with item details
  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 220px; object-fit: cover;">
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title">${item.name}</h5> <!-- Item name -->
          <p class="card-text">${item.description}</p> <!-- Item description -->
          <h3 class="card-price">${item.price}</h3> <!-- Item price -->
        </div>
        <a href="#" class="btn mt-3" style="background-color:#643b47; color: white;">Buy </a> <!-- Buy button -->
      </div>
    </div>
  `;

  // Add the column with the card into the shop container on the page
  shopContainer.appendChild(col);
});
