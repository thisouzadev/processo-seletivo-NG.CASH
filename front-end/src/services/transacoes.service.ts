import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST || "localhost:3001";
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || "https";

class TransactionsService {
  async depositar(value: number, username: string, token: any) {
    
    const response = await axios({
      method: 'post',
      url: `${PROTOCOL}://${HOST}/transactions`,
      data: {
        value: value,
        username: username,
      },
      headers: { authorization: token },
    });
    return response;
  }

  async getTransactions(token: any, transactionsDate: any){
    const response = await axios({
      method: 'get',
      url: `${PROTOCOL}://${HOST}/transactions`,
      data: {},
      params: { transactionsDate: transactionsDate },
      headers: { authorization: token },
    });
    return response;
  }
}

export default TransactionsService;