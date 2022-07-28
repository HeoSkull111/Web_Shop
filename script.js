class Vendor {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}

class ShopGear {
    /**
     * 
     * @param {string} name 
     * @param {number} price 
     * @param {nunber} stock 
     * @param {Vendor} vendor 
     */
    constructor(name, price, stock,des, img, vendor) {
        this.name = name;
        this.des = des;
        this.price = price;
        this.stock = stock;
        this.img = img;
        this.vendor = vendor;
    }
    calcTotalPrice() {
        return this.price * this.stock;
    }
}

class Shop {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.items = [];
        this.vendors = [];
    }

    registerVendor(name, address) {
        this.vendors.push(new Vendor(name, address));
    }

    registerItem(name, price, stock, vendorName) {
        let foundVendor = this.vendors.find((vendor) => vendor.name === vendorName);
        if (foundVendor === undefined) {
            throw new Error("Vendor not found");
        }
        this.items.push(new ShopGear(name, price, stock, foundVendor));
    }

    /**
     * 
     * @returns {ShopItem[]}
     */
    getItems() {
        return this.items;
    }

    /**
     * 
     * @returns {Vendor[]}
     */
    getVendors() {
        return this.vendors;
    }

    buyItem(itemName, qty) {
        let foundItem = this.items.find((item) => item.name === itemName);
        if (foundItem == undefined) {
            throw new Error("Item ${itemName} is not found");
        }
        if (qty > foundItem.stock) {
            throw new Error("Out of stock");
        }
        foundItem.stock -= qty;
        return new ShopGear(foundItem.name, foundItem.price, qty, foundItem.vendor);
    }
}
let myShop = new Shop("Nerf Gun", "231 Main St");
myShop.registerVendor("Apple", "123 Apple St");
myShop.registerVendor("Google", "123 Google St");
myShop.registerVendor("Dell", "123 Dell St");

myShop.registerItem("Nerf AK", 1000, 15, "Apple");
myShop.registerItem("Gear", 500, 10, "Google");
myShop.registerItem("Glasses", 800, 10, "Dell");

function createCardItem(ShopGear) {
    return `
        <div class="card">
            <div class="content">
                <h2 class="title">${ShopGear.name}</h2>
                <p class="copy"">Price: ${ShopGear.price}$ <br/>
                    In Stock: ${ShopGear.stock}
                </p>
                <button class="btn">Buy</button>
            </div>
        </div>`
}

let listItems = document.getElementById("list-shop-item");

console.log(listItems);

for(let item in myShop.items) {
    let itemCard = createCardItem(myShop.items[item]);
    listItems.innerHTML += itemCard;
}