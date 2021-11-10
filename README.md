
# Workace Backend

Este é o projeto do Backend da empresa Workace

Framework: NestJS



## API Reference

#### Retorna todos os usuários

```http
  GET /api/users
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token JWT |

#### Retorna um usuário específicado pelo id

```http
  GET /api/users/${id}
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :-------------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token JWT |
| `id`      | `string` | **Obrigatório**. Id do usuário |

#### Cria um novo usuário

```http
  POST /api/users
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :-------------------------------- |
| `nome`      | `string` | **Obrigatório**. Nome do usuário |
| `email`      | `string` | **Obrigatório**. Email do usuário |
| `password`      | `string` | **Obrigatório**. Senha do usuário |
| `image`      | `file` | **Obrigatório**. Arquivo de imagem |


#### Atualiza um usuário

```http
  PUT /api/users/${id}
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :-------------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token JWT |
| `nome`      | `string` | Novo nome |
| `email`      | `string` |  Novo email |
| `password`      | `string` | Nova senha |
| `image`      | `file` |  Nova imagem |

#### Retorna uma imagem caso exista

```http
  GET /api/res/${imgpath}
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `imgpath` | `string` | **Obrigatório**. Path da imagem |

#### Cria uma nova publicação

```http
  POST /api/publication
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token JWT |
| `name` | `string` | **Obrigatório**. Nome da publicação |
| `description` | `string` | **Obrigatório**. Descrição da publicação |
| `price` | `number` | **Obrigatório**. Preço da publicação |
| `userId` | `string` | **Obrigatório**. Id do usuário que está criando a publicação |
| `image` | `file` | **Obrigatório**. Imagem da publicação |
| `categoryId` | `string` | **Obrigatório**. Id da categoria que a publicação faz parte |

#### Retorna todas as publicações

```http
  GET /api/publications
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token JWT |

#### Retorna uma publicação pelo id

```http
  GET /api/publications/${id}
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token JWT |
| `id` | `string` | **Obrigatório**. Id da publicação |


#### Atualiza uma publicação pelo id

```http
  PUT /api/publications/${id}
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token JWT |
| `id` | `string` | **Obrigatório**. Id da publicação |
| `name` | `string` | Novo nome da publicação |
| `description` | `string` | Nova descrição da publicação |
| `price` | `number` | Novo preço da publicação |
| `image` | `file` | Nova imagem da publicação |
| `categoryId` | `string` |Nova categoria que a publicação faz parte |


#### Deleta uma publicação pelo id

```http
  DELETE /api/publications/${id}
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token JWT |
| `id` | `string` | **Obrigatório**. Id da publicação |

#### Cria uma categoria

```http
  POST /api/category
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token (ADMIN) |
| `name` | `string` | **Obrigatório**. Nome da categoria |
| `image` | `file` | **Obrigatório**. Imagem da categoria |

#### Busca todas as categorias

```http
  GET /api/category
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token (ADMIN) |

#### Busca uma categoria pelo id

```http
  GET /api/category/${id}
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token (ADMIN) |
| `id` | `string` | **Obrigatório**. Id da categoria |


#### Atualiza uma categoria pelo id

```http
  PUT /api/category/${id}
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token (ADMIN) |
| `id` | `string` | **Obrigatório**. Id da categoria |
| `name` | `string` | Novo nome da categoria |
| `image` | `file` | Nova imagem da categoria |

#### Deleta uma categoria pelo id

```http
  DELETE /api/category/${id}
```

| Parâmetro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `BearerToken` | `string` | **Obrigatório**. Token (ADMIN) |
| `id` | `string` | **Obrigatório**. Id da categoria |
