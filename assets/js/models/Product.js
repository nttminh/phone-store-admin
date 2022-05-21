class Product {
    constructor(name, price, screen, backCamera, frontCamera, img, desc, type, id, quantity) {
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.desc = desc;
        this.type = type;
        this.id = id;
        this.quantity = quantity;
    }

    // format price with commas
    formatPrice(price) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'VND',
        });
        return formatter.format(price);
    }

    render = () => {
        return `
        <div class="card" style="width: 22rem;">
            <img class="card-img-top" src="${this.img}" alt="">
        <div class="card-body">
            <h3 class="card-title">${this.name}</h3>
            <p class="card-text">Giá: <span>${this.formatPrice(this.price)}</span></p>
            <p>Số lượng: <span>${this.quantity}</span></p>
            <button class="btn btn-primary" onclick="handleUpdate(${this.id})">Sửa</button>
            <button class="btn btn-danger" onclick="handleDeleteProduct(${this.id})">Xóa</button>
        </div>    
    </div>`
    }
}