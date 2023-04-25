import apiRequestHandler from "../../config/apiRequestHandler";

const BASE_URL = "/identity-service/1.0.0";

export default class UsersRepository {
  async getUser(userId: number): Promise<any> {
    const [data, error] = await apiRequestHandler({
      url: BASE_URL + `/users/${userId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (error) {
      console.log(error);
      return null;
    }
    if (data.status !== 200) {
      console.log(data.data.message);
      return null;
    }

    console.log(data.data.user);
    return data.data.user;
  }
}
