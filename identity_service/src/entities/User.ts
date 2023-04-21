import jwt, { VerifyErrors } from "jsonwebtoken";
import bcrypt from "bcryptjs";

export enum Roles {
  User = "user",
  Admin = "admin",
}
interface UserJWTPayload {
  email: string;
  id: number;
}

export default class User {
  id: number;
  name: string;
  email: string;
  gender: string;
  phoneNumber: string;
  password: string;
  address: string;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    gender: string,
    phoneNumber: string,
    password: string,
    address: string,
    role: Roles.User,
    createdAt = new Date(),
    updatedAt = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.address = address;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async setPassword(password: string) {
    // Set hashed password
    this.password = await User.hashPassword(password);
  }

  comparePassword(password: string) {
    // Compare password with hashed password
    return User.comparePassword(password, this.password);
  }

  generateToken(secrete: string) {
    // Generate JWT token
    return User.generateToken(this, secrete);
  }
  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10); // Hash password using bcrypt
  }

  static comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword); // Compare password with hashed password using bcrypt
  }
  static generateToken(user: User, secret: string): string {
    const payload: UserJWTPayload = { id: user.id, email: user.email }; // Generate payload with user data
    const options = { expiresIn: "1h" }; // Set expiration time for token
    console.log(secret);

    return jwt.sign(payload, secret, options); // Generate JWT token using payload, secret, and options
  }

  static verifyToken(token: string, secret: string) {
    try {
      console.log(secret);
      const decode = jwt.verify(token, secret) as UserJWTPayload;
      return { decode };
    } catch (err) {
      const error = (err as VerifyErrors).message;
      console.log(err);
      return { error };
    }
  }
}
