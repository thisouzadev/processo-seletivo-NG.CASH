import axios from 'axios';

class UserService {
  async login(username: string, password: string) {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3001/login',
      data: {
        username,
        password,
      },
    });
    return response;
  }

  async register(username: string, password:string) {
    const response = await axios
    .post("http://localhost:3001/users", {
      username: username,
      password: password,
    })
    return response;
  }

  async getUser(token: any){
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3001/balance',
      data: {},
      headers: { authorization: token },
    });
    return response;
  }

  async getAllUser(token: any){
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3001/users',
      data: {},
      headers: { authorization: token },
    });
    return response;
  }

  async getByIdUser(token: any, userId: any){
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3001/userById',
      data: {
        id: userId
      },
      headers: { authorization: token },
    });
    return response;
  }
}

export default UserService;