import Joi from "joi";

export default class ReqValidation {
  static idSchema = Joi.number().positive().integer().min(1).required();
  static quantitySchema = Joi.number().positive().integer().min(1).required();
  static registrationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[0-9])(?=.*[A-Z]).{8,}$"))
      .required(),
  });
  static updateCartItemSchema = Joi.object({
    quantity: this.quantitySchema,
    userId: this.idSchema,
    cartItemId: this.idSchema,
  });

  static removeFromCart = Joi.object({
    cartItemId: this.idSchema,
    userId: this.idSchema,
  });
}
