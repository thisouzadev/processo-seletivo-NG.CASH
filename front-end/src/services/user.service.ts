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
    console.log(username, password);
    
    const response = await axios
    .post("http://localhost:3001/users", {
      username: username,
      password: password,
    })
    return response;
  }
}

export default UserService;