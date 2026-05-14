import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Obtener detalles del producto por ID
    this.product = await this.dataSource.findProductById(this.productId);
    // Renderizar el HTML con los detalles
    this.renderProductDetails();
    // Agregar listener al botón Add to Cart
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // Obtener carrito existente o iniciar uno vacío
    let cart = getLocalStorage('so-cart') || [];
    // Agregar el producto
    cart.push(this.product);
    // Guardar carrito actualizado
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    document.getElementById('productBrand').textContent = this.product.Brand.Name;
    document.getElementById('productName').textContent = this.product.NameWithoutBrand;
    document.getElementById('productImage').src = this.product.Image;
    document.getElementById('productImage').alt = this.product.Name;
    document.getElementById('productPrice').textContent = `$${this.product.FinalPrice}`;
    document.getElementById('productColor').textContent = this.product.Colors[0].ColorName;
    document.getElementById('productDescription').textContent = this.product.DescriptionHtmlSimple.replace(/<[^>]+>/g, '');
    document.getElementById('addToCart').dataset.id = this.product.Id;
  }
}