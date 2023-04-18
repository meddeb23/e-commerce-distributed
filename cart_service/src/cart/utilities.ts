import Joi from "joi";

export default class ReqValidation {
  static idSchema = Joi.number().positive().integer().min(1).required();

  static addToCartSchema = Joi.object({
    quantity: Joi.number().positive().integer().min(1),
    userId: this.idSchema,
    productId: this.idSchema,
  });

  static removeFromCart = Joi.object({
    cartItemId: this.idSchema,
    userId: this.idSchema,
  });
}
