const API_URL = 'https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products';

let availableProducts = [];
const newProduct = {
    "name": "Samsung Galaxy A23 Chính Hãng",
    "price": "5000000",
    "screen": "6.1 inches, OLED",
    "backCamera": "Chính 64 MP & Phụ 12 MP, 5 MP, 5 MP",
    "frontCamera": "24MP",
    "img": "https://didongviet.vn/pub/media/catalog/product//s/a/samsung-galaxy-a23-didongviet_2.jpg",
    "desc": "Samsung Galaxy A23 sở hữu thiết kế nguyên khối làm từ nhựa cao cấp, màn hình Infinity-V 6.6 inch HD+ với tấm nền TFT.",
    "type": "Samsung",
    "id": "79",
    "quantity": "19"
}

const handleSelectChange = (e) => {
    const selectedProduct = e.target.value.toLowerCase();
    console.log(selectedProduct);
    if (selectedProduct === 'all') {
        renderProducts(availableProducts);
        return
    }

    const selectedProducts = availableProducts.filter(product => product.type.toLowerCase() === selectedProduct);
    renderProducts(selectedProducts);
}
document.getElementById('device-type').addEventListener('change', handleSelectChange);

const getProducts = async () => {
    const response = await axios.get(API_URL);
    availableProducts = response.data;
    availableProducts = mapProducts(availableProducts);
    renderProducts(availableProducts);
    return availableProducts;
}

const mapProducts = (products) => {
    const result = products.map(product => new Product(product.name, product.price, product.screen, product.backCamera, product.frontCamera, product.img, product.desc, product.type, product.id, product.quantity));
    return result;
}

const renderProducts = (products) => {
    let availableProductsHTML = '';
    products.forEach(product => {
        availableProductsHTML += product.render();
    });
    document.getElementById('available-products').innerHTML = availableProductsHTML;
}

const handleOpenModal = () => {
    $('#longTitle').text('Thêm Sản Phẩm');
    $('#addBtn').show()
    $('#updateBtn').hide()

    $('#name').val('');
    $('#price').val('');
    $('#screen').val('');
    $('#backCamera').val('');
    $('#frontCamera').val('');
    $('#imgURL').val('');
    $('#productDescription').val('');
    $('#quantity').val('');
}

const handleCreateProduct = async () => {
    const name = document.getElementById('name').value.trim();
    const price = document.getElementById('price').value.trim();
    const screen = document.getElementById('screen').value.trim();
    const backCamera = document.getElementById('backCamera').value.trim();
    const frontCamera = document.getElementById('frontCamera').value.trim();
    const img = document.getElementById('imgURL').value.trim();
    const desc = document.getElementById('productDescription').value.trim();
    const type = document.getElementById('brand').value;
    const quantity = document.getElementById('quantity').value;

    const newProduct = {
        "name": name,
        "price": price,
        "screen": screen,
        "backCamera": backCamera,
        "frontCamera": frontCamera,
        "img": img,
        "desc": desc,
        "type": type,
        "quantity": quantity
    }

    const response = await axios.post('https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products', newProduct);
    let newProductWithId = {
        ...newProduct,
        id: response.data.id
    }

    newProductWithId = new Product(newProductWithId.name, newProductWithId.price, newProductWithId.screen, newProductWithId.backCamera, newProductWithId.frontCamera, newProductWithId.img, newProductWithId.desc, newProductWithId.type, newProductWithId.id, newProductWithId.quantity);


    availableProducts.push(newProductWithId);
    renderProducts(availableProducts);
}

const handleDeleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    const deletedProduct = availableProducts.find(product => product.id == id);
    availableProducts = availableProducts.filter(product => product.id != id);
    renderProducts(availableProducts);
}

const handleOpenUpdateModal = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    $('#productModal').modal('show');
    $('#longTitle').text('Sửa Sản Phẩm');
    $('#addBtn').hide()
    $('#updateBtn').show()

    document.getElementById('name').value = response.data.name;
    document.getElementById('price').value = response.data.price;
    document.getElementById('screen').value = response.data.screen;
    document.getElementById('backCamera').value = response.data.backCamera;
    document.getElementById('frontCamera').value = response.data.frontCamera;
    document.getElementById('imgURL').value = response.data.img;
    document.getElementById('productDescription').value = response.data.desc;
    document.getElementById('brand').value = response.data.type;
    document.getElementById('quantity').value = response.data.quantity;

    $('#updateBtn').off('click').click(async () => {
        handleUpdateProduct(id);
    })
}

const handleUpdateProduct = async (id) => {
    try {
        const name = document.getElementById('name').value.trim();
        const price = document.getElementById('price').value.trim();
        const screen = document.getElementById('screen').value.trim();
        const backCamera = document.getElementById('backCamera').value.trim();
        const frontCamera = document.getElementById('frontCamera').value.trim();
        const img = document.getElementById('imgURL').value.trim();
        const desc = document.getElementById('productDescription').value.trim();
        const type = document.getElementById('brand').value;
        const quantity = document.getElementById('quantity').value;

        const updatedProduct = {
            "name": name,
            "price": price,
            "screen": screen,
            "backCamera": backCamera,
            "frontCamera": frontCamera,
            "img": img,
            "desc": desc,
            "type": type,
            "quantity": quantity
        }

        const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
        const updatedProductWithId = {
            ...response.data,
            id: id
        }

        const updatedProductIndex = availableProducts.findIndex(product => product.id == id);
        availableProducts[updatedProductIndex] = new Product(updatedProductWithId.name, updatedProductWithId.price, updatedProductWithId.screen, updatedProductWithId.backCamera, updatedProductWithId.frontCamera, updatedProductWithId.img, updatedProductWithId.desc, updatedProductWithId.type, updatedProductWithId.id, updatedProductWithId.quantity);
        renderProducts(availableProducts);
    } catch (error) {
        console.error(error);
    }
}

getProducts();