const shopItems = [
    {
      name: "Traditional Longyi",
      description: "Worn for generations in Myanmar, symbolizing elegance and comfort.",
      image: "images/longyi.jpg",
      price:"1ks"
    },
    {
      name: "Burmese Puppet",
      description: "Handcrafted puppet used in traditional theatre performances.",
      image: "images/puppet.jpg",
      price:"1ks"
    },
    {
      name: "Lacquerware Box",
      description: "Beautifully carved container made with ancient techniques in Bagan.",
      image: "images/lacquerware.jpg",
      price:"1ks"
    },
    {
        name: "a",
        description: "b",
        image: "images/lacquerware.jpg",
        price:"c"
      }
  ];
  
  const shopContainer = document.getElementById("shopContainer");
  
  shopItems.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
  
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 220px; object-fit: cover;">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <h3 class="card-price">${item.price}</h3>
          </div>
          <a href="#" class="btn mt-3" style="background-color:#643b47; color: white;">Buy it</a>

        </div>
      </div>
    `;
  
    shopContainer.appendChild(col);
  });
  