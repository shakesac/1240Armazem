## Pré-requisitos
 - Node.js - Transferir e Instalar [Node.js](https://nodejs.org/en/)
 - MySQL - Transferir e Instalar [MySQL](https://www.mysql.com/downloads/)

## Instalação
### Clone
```
$ git clone https://github.com/shakesac/1240Armazem.git
$ cd 1240Armazem
```
## Backend
### Criar variáveis de ambiente
```
$ cd backend
$ nano .env
```
```
SRV_PORT=5000
API_URL=/api/v1

DB_HOST=ENDERECO_BD
DB_PORT=PORTA_DB          // Porta padrão MySQL: 3306
DB_USER=UTILIZADOR_BD
DB_PASS=PALAVRA_PASSE_BD
DB_DATA=NOME_BD
DB_TYPE=mysql             //Possivel compatibilidade com PostgreSQL.

SEQUELIZE_DEV_MODE=false  //Caso true recria as tabelas a cada npm start

BCRYPT_SALT=10

JWT_SECRET=GrUp0$3sCuT4s  //Segredo do token JWT. Deverá ser uma string complexa.
JWT_EXPIRATION=14 days
JWT_ALGORITHM=HS256

LEASE_STATUS=pending,accepted,in progress,returned,refused,canceled
UNMUTABLE_STATUS=returned,canceled
```
**Notas**:
 - LEASE_STATUS: É um array de todos os estados possíveis de um pedido de emprestimo. Podem ser adicionados mais separando-os com uma virgula.
 - UNMUTABLE_STATUS: É um array de estados que "terminam" um emprestimo não permitindo que após a sua atribuição se possa adicionar mais estados ao emprestimo.

### Instalar modulos Node.js
```
$ npm install
```

### Correr servidor de desenvolvimento
```
$ npm start
```

## Frontend

```
$ cd frontend
$ nano .env
```
```
API_URL=http://127.0.0.1:5000/api/v1  //Valor padrão
```
**Nota**: Alterar o URl caso os valores do .env do backend também tenham sido alterados.


### Instalar modulos Node.js
```
$ npm install
```

### Correr em modo desenvolvimento
```
$ npm run serve
```

### Compilação e minificação para produção
```
$ npm run build
```

### Personalizar configuração
Consultar [Guia de configuração oficial](https://cli.vuejs.org/config/).

## Outros
### Ligação para a colecção Postman
[Postman](#)