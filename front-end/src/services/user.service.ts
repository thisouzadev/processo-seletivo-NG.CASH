import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST || "localhost:3001";
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || "http";

const fetch = axios.create({
  baseURL: `${PROTOCOL}://${HOST}`,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
class UserService {
  async login(username: string, password: string) {
    const response = await axios({
      method: 'post',
      url: `${PROTOCOL}://${HOST}/login`,
      data: {
        username,
        password,
      },
    });
    return response;
  }

  async register(username: string, password:string) {
    const response = await axios
    .post(`${PROTOCOL}://${HOST}/users`, {
      username: username,
      password: password,
    })
    return response;
  }

  async getUser(token: any){
    const response = await axios({
      method: 'get',
      url: `${PROTOCOL}://${HOST}/balance`,
      data: {},
      headers: { authorization: token },
    });
    return response;
  }

  async getAllUser(token: any){
    const response = await axios({
      method: 'get',
      url: `${PROTOCOL}://${HOST}/users`,
      data: {},
      headers: { authorization: token },
    });
    return response;
  }

  async getByIdUser(token: any, userId: any){
    const response = await axios({
      method: 'get',
      url: `${PROTOCOL}://${HOST}/userById`,
      data: {
        id: userId
      },
      headers: { authorization: token },
    });
    return response;
  }
}

export default UserService;