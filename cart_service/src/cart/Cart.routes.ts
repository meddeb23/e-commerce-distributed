import { Request, Response, Router } from "express";
import { adaptRequest, httpRequest } from "../helper";
import CartService, { ICartService } from "./CartService";
import CartRepository from "./CartRepository";
import faker from "../scripts/faker";

const router = Router();

const cartRepository = new CartRepository();
const cartService: ICartService = new CartService(cartRepository);

setTimeout(() => faker(cartRepository), 30000);

router.get("/", makeRegistrationController("getCart", cartService));

router.delete("/", makeRegistrationController("emptyCart", cartService));

router.delete(
  "/:cartItemId",
  makeRegistrationController("removeItemFromCart", cartService)
);
router.post(
  "/:productId",
  makeRegistrationController("addItemToCart", cartService)
);
router.put(
  "/:cartItemId",
  makeRegistrationController("updateCartItemQuantity", cartService)
);

function makeRegistrationController(
  action: keyof ICartService,
  handler: ICartService
) {
  return async function controller(req: Request, res: Response) {
    const httpRequest: httpRequest = adaptRequest(req);
    const { headers, status, data } = await handler[action](httpRequest);
    res.status(status).set(headers).json(data);
  };
}

export default router;
