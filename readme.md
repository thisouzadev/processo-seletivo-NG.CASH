- [x] Qualquer pessoa deverá poder fazer parte da NG. Para isso, basta realizar o cadastro informando _username_ e _password_.
- [x] Deve-se garantir que cada _username_ seja único e composto por, pelo menos, 3 caracteres.
- [x] Deve-se garantir que a _password_ seja composta por pelo menos 8 caracteres, um número e uma letra maiúscula. Lembre-se que ela deverá ser _hashada_ ao ser armazenada no banco.
- [x] Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela **Accounts** com um _balance_ de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado, a tabela **Accounts** não deverá ser afetada.
- [x] Todo usuário deverá conseguir logar na aplicação informando _username_ e _password._ Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.
- [x] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio _balance_ atual. Um usuário A não pode visualizar o _balance_ de um usuário B, por exemplo.
- [x] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um _cash-out_ informando o _username_ do usuário que sofrerá o _cash-in_), caso apresente _balance_ suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.
- [x] Toda nova transação bem-sucedida deverá ser registrada na tabela **Transactions**. Em casos de falhas transacionais, a tabela **Transactions** não deverá ser afetada.
- [x] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar as transações financeiras (_cash-out_ e _cash-in_) que participou. Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela.
- [x] Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de filtrar as transações financeiras que participou por:
  - Data de realização da transação e/ou
    - Transações de _cash-out;_
    - Transações de _cash-in._
    
    
[trabalho concluído](https://front-end-production-0064.up.railway.app/login)
