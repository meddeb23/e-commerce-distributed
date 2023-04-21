import { User } from "../entities";
import { httpResponse, makeHttpError, makeHttpResponse } from "../helper";
import { httpRequest } from "../helper/adapt-request";
import UserCache from "./UserCache";
import UserRepository from "./UserRepository";
import ReqValidation from "./utilities";

export interface IUserService {
  getUsers(req: httpRequest): Promise<httpResponse>;
  getUser(req: httpRequest): Promise<httpResponse>;
  createUser(req: httpRequest): Promise<httpResponse>;
  updateUser(req: httpRequest): Promise<httpResponse>;
  deleteUser(req: httpRequest): Promise<httpResponse>;
  register(req: httpRequest): Promise<httpResponse>;
  login(req: httpRequest): Promise<httpResponse>;
  verifyToken(req: httpRequest): Promise<httpResponse>;
}

class UserService implements IUserService {
  userRepository: UserRepository;
  cache: UserCache;

  constructor(userRepository: UserRepository, cache: UserCache) {
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async getUsers(req: httpRequest): Promise<httpResponse> {
    const users = this.userRepository.findAll();

    return makeHttpResponse(200, { users });
  }

  async getUser(req: httpRequest): Promise<httpResponse> {
    const userId = parseInt(req.body.userId);

    const { error } = ReqValidation.idSchema.validate(userId);
    if (error) return makeHttpError(400, error.message);

    const user = await this.userRepository.findById(userId);
    if (!user) return makeHttpError(404, "user not found");

    return makeHttpResponse(200, { user });
  }

  async createUser(req: httpRequest): Promise<httpResponse> {
    return makeHttpResponse(200, { message: "createUser not implemented" });
  }

  async updateUser(req: httpRequest): Promise<httpResponse> {
    return makeHttpResponse(200, { message: "updateUser not implemented" });
  }

  async deleteUser(req: httpRequest): Promise<httpResponse> {
    return makeHttpResponse(200, { message: "deleteUser not implemented" });
  }

  async register(req: httpRequest): Promise<httpResponse> {
    const { error } = ReqValidation.registrationSchema.validate(req.body);
    if (error) return makeHttpError(400, error.message);

    const { name, email, password } = req.body;

    const user = await this.userRepository.createUser(name, email, password);
    if (!user) return makeHttpError(500, "could not create user");

    const token = user.generateToken(process.env.JWT_SECRET);

    return makeHttpResponse(200, user, { authorization: token });
  }

  async login(req: httpRequest) {
    const { email, password } = req.body;

    const user = await this.userRepository.findByEmail(email);
    if (!user) return makeHttpError(400, "Account not found");
    if (!(await user.comparePassword(password)))
      return makeHttpError(400, "Wrong password");

    const token = user.generateToken(process.env.JWT_SECRET);

    return makeHttpResponse(200, { user }, { token });
  }

  async verifyToken(req: httpRequest) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return makeHttpError(401, "Missing authorization header");
    const token = authHeader.split(" ")[1];
    try {
      const { decode, error } = User.verifyToken(token, process.env.JWT_SECRET);
      if (error) return makeHttpError(400, error);
      const user = await this.cache.getUserByEmail(decode.email);
      return makeHttpResponse(200, {
        user: {
          ...user,
          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);
      return makeHttpError(400, error);
    }
  }
}
export default UserService;
