import { httpResponse, makeHttpError, makeHttpResponse } from "../helper";
import { httpRequest } from "../helper/adapt-request";
import CartRepository from "./CartRepository";
import ReqValidation from "./utilities";

export interface ICartService {
  getCart(req: httpRequest): Promise<httpResponse>;
  addItemToCart(req: httpRequest): Promise<httpResponse>;
  removeItemFromCart(req: httpRequest): Promise<httpResponse>;
  updateCartItemQuantity(req: httpRequest): Promise<httpResponse>;
  emptyCart(req: httpRequest): Promise<httpResponse>;
}

class CartService implements ICartService {
  cartRepository: CartRepository;

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  async getCart(req: httpRequest): Promise<httpResponse> {
    const { userId } = req.body;
    const cart = await this.cartRepository.getCart(userId);
    const total = cart.getCartsubTotal();

    const res = {
      cart,
      total,
    };
    return makeHttpResponse(200, res);
  }

  async addItemToCart(req: httpRequest): Promise<httpResponse> {
    const { userId, quantity } = req.body;
    const { productId } = req.pathParams;
    const { error } = ReqValidation.addToCartSchema.validate({
      userId,
      quantity,
      productId,
    });

    if (error) return makeHttpError(400, error.message);

    const product = await this.cartRepository.prodRepo.getProduct(productId);
    if (!product) return makeHttpError(404, "could not fetch product");

    const addedItem = await this.cartRepository.addItemToCart(
      userId,
      product,
      quantity
    );
    if (!addedItem) return makeHttpError(500, "somthing went wrong");

    return makeHttpResponse(200, addedItem);
  }

  async removeItemFromCart(req: httpRequest): Promise<httpResponse> {
    const { userId } = req.body;
    let { cartItemId } = req.pathParams;

    const { error } = ReqValidation.removeFromCart.validate({
      userId,
      cartItemId,
    });

    if (error) return makeHttpError(400, error.message);
    cartItemId = parseInt(cartItemId);
    // check if item exist in user cart
    const cart = await this.cartRepository.getCart(userId);

    if (!cart.hasItem(cartItemId))
      return makeHttpError(404, "Product does not exsit in your cart");

    const deleteItem = await this.cartRepository.removeItemFromCart(cartItemId);

    return makeHttpResponse(200, deleteItem);
  }

  async updateCartItemQuantity(req: httpRequest): Promise<httpResponse> {
    const { userId, quantity } = req.body;
    const { cartItemId } = req.pathParams;
    const { error } = ReqValidation.updateCartItemSchema.validate({
      userId,
      quantity,
      cartItemId,
    });

    if (error) return makeHttpError(400, error.message);

    const cart = await this.cartRepository.getCart(userId);

    if (!cart) return makeHttpError(404, "cart does not exit");
    if (!cart.hasItem(parseInt(cartItemId)))
      return makeHttpError(404, "product does not exsit in user cart");

    const updatedItem = await this.cartRepository.updatecartItem(
      cartItemId,
      quantity
    );

    return makeHttpResponse(200, updatedItem);
  }

  async emptyCart(req: httpRequest): Promise<httpResponse> {
    const { userId } = req.body;

    const { error } = ReqValidation.idSchema.validate(userId);

    if (error) return makeHttpError(400, error.message);
    const cart = await this.cartRepository.getCart(userId);

    if (!cart) return makeHttpError(404, "cart does not exist");

    const emptyCart = await this.cartRepository.emptyCart(userId);

    return makeHttpResponse(200, emptyCart);
  }
}

export default CartService;
