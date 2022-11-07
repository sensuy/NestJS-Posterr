

## Anotações a serem feitas

- Implementação de interfaces nos repositories para ser facil uma troca futura de banco sem alterar outras camadas;
- Utilização de swagger para sanitização dos dados
- Versionamento da api, em caso de mudanças futuras
- Sanitização de dados de api's externas e melhora na sanitização dos dados da api.
- Limitações de requisições por um mesmo ip segurança.
- Se aumentasse o número de banco de dados a pasta shared dentro de migration seria dividida.
- Adicionaria os logs para a produção com o wintom para ficar fácil a depuração em caso de erro.
- Work more on datetime specification.
- Como todos os posts estão bem relacionados no banco de dados eles ficaram em um mesmo módulo.
- Apesar de muita coisa poderia ser simplificada preferi fazer bem separarado para mostrar como esse projeto poderia escalar sem problemas.
- Utilizar o expcion filters para centralizar os tratamentos de erro @Catch.
- Redis as microservice.
- Midlewares para verficar post original e users!
- Midlewares para contar a soma dos posts, reposts e quotes.
- Utilizar o id no header./ listar post por id não está validando o usuário.
- Escolher o Joi pois ele possui maior nota no snky de segurança, optar por essas bibliotecas.

## License

Nest is [MIT licensed](LICENSE).


# Node.js Challenge

## About the api-service
  When structuring the application I used the module structure. Database entities very close to each other are in the same module. That way the project can scale without getting cluttered.

  As in this project we only have four database entities: User, post, repost and quote they are in the same module: the user module.
```
api-service
├── node_modules
├── src
    └── configs     
    └── modules
      └── post
        ├── controllers  // Request and responses and parse data
        ├── dtos  
        ├── middlewares  // Intercepts requests and responses and performs validations. 
        ├── repositories // ORM
        ├── schemas  // Third party library
        ├── services // Business ruless
		└──  post.module.ts
	  └── user
    └── shared
      ├── interfaces 
      ├── middlewares  
      ├── migrations  
      └── utils
    ├── app.module.ts
    ├── main.ts
```
Inside the modules, responsibilities were uncoupled as much as possible. For example, the services that run the business rules don't know which ORM(Typeorm) the repository layer is using. With this approach, an ORM or library replacement becomes less complicated.

In the shared folder are what will be common to more than one module. For example the interface "IPagination.ts" will definitely be used in future new modules, to check the validity of the JWT token. As well as the provider that is responsible for sending email.


### Run posterr
  After cloning the project, follow the steps below.
- In the project root folder there is a `docker-compose.yaml` file. If you don't have any postgres instance     installed open a terminal and execute:
  ```sh
  docker-compose up
  ```
  the password and username will be `postgres`, and the available port will be the default `5432`. after that close the terminal and open a new one in the root folder.

- Access the `api-service` folder, in the root of this folder there is a `.env.example` file. Copy paste and rename the copy to .env.
- In this file we will configure some environment variables. Fill it with your `JWT secret` and `token expiration`.

  ```sh
  #jwt configuration
  JWT_SECRET: "your secret"
  JWT_EXPIRESIN: "1d"

  #Data base options
  DB_HOST: "localhost"
  DB_USERNAME: "postgres"
  DB_PASSWORD: "postgres"
  DB_DATABASE: "your database"
  ```
- If you are already using a `postgres` instance on port `5432`, put the `username`, `password` and `host` in the `.env`.
- Fill the `DB_DATABASE` field with the name you want. `Sequelize` will create it automatically when running migrations.
-Now install the dependencies with or with an `npm install`/`yarn`.
-Run migrations with the command `npm run migrations`/`yarn migrations`.
-Now you can run api service: `npm run start`/`yarn start`. The api-service will run on port `3001`.
-To see the swagger documentation go to `http://localhost:3001/api-docs/`. Just use it after run the stock-service. 

## Run stock-service
- Access the `stock-service` folder, and install the dependecies `npm install`/`yarn`.
-Run the service: `npm run start`/`yarn start`. The stock-service will run on port `3002`.

## Migration commands
```bash
# generate
$ npm run typeorm -- migration:generate ./path/to/folder/nameMigration

# run
$ npm run typeorm -- migration:run
```

