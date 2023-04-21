import { Request, Response, Router } from "express";
import { adaptRequest, httpRequest } from "../helper";
import UserService, { IUserService } from "./UserService";
import UserRepository from "./UserRepository";
import UserCache from "./UserCache";

const router = Router();

const userRepository = new UserRepository();
const userCache = new UserCache(userRepository);
const userService: IUserService = new UserService(userRepository, userCache);

router.get("/users", makeUserController("getUsers", userService));
router.get("/users/:id", makeUserController("getUser", userService));
router.post("/users", makeUserController("createUser", userService));
router.put("/users/:id", makeUserController("updateUser", userService));
router.delete("/users/:id", makeUserController("deleteUser", userService));
router.post("/register", makeUserController("register", userService));
router.post("/login", makeUserController("login", userService));
router.post(
  "/auth/verifyToken",
  makeUserController("verifyToken", userService)
);

function makeUserController(action: keyof IUserService, handler: IUserService) {
  return async function controller(req: Request, res: Response) {
    const httpRequest: httpRequest = adaptRequest(req);
    const { headers, status, data } = await handler[action](httpRequest);
    res.status(status).set(headers).json(data);
  };
}

export default router;
