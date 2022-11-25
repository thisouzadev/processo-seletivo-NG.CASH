import axios from 'axios';

class TransactionsService {
  async depositar(value: number, username: string, token: any) {
    
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3001/transactions',
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
      url: 'http://localhost:3001/transactions',
      data: {},
      params: { transactionsDate: transactionsDate },
      headers: { authorization: token },
    });
    return response;
  }
}

export default TransactionsService;