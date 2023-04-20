import { Request, Response, Router } from "express";
import { adaptRequest, httpRequest } from "../helper";
import OrdersService, { IOrdersService } from "./OrdersService";
import { CartsRepository, OrdersRepository } from "./repositories";

const router = Router();

const ordersRepository = new OrdersRepository();
const cartsRepository = new CartsRepository();
const ordersService: IOrdersService = new OrdersService(
  ordersRepository,
  cartsRepository
);

router.post("/", makeRegistrationController("createOrder", ordersService));
router.put(
  "/:orderId",
  makeRegistrationController("updateOrder", ordersService)
);
router.get("/", makeRegistrationController("getUserOrders", ordersService));
router.get("/all", makeRegistrationController("getAllOrders", ordersService));
router.get("/:orderId", makeRegistrationController("getOrder", ordersService));
router.delete(
  "/:orderId",
  makeRegistrationController("deleteOrder", ordersService)
);
router.patch(
  "/:orderId/cancel",
  makeRegistrationController("cancelOrder", ordersService)
);

function makeRegistrationController(
  action: keyof IOrdersService,
  handler: IOrdersService
) {
  return async function controller(req: Request, res: Response) {
    const httpRequest: httpRequest = adaptRequest(req);
    const { headers, status, data } = await handler[action](httpRequest);
    res.status(status).set(headers).json(data);
  };
}

export default router;
