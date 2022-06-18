<h1 align="center">
  <img alt="DFL - API" height="80" title="DFL - API" src=".github/app_icon.png" />
</h1>

<h1 align="center">
  DFL - API
</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=346259&labelColor=26413C">
    <img src="https://img.shields.io/static/v1?label=version&message=api&color=346259&labelColor=26413C" alt="API" />
</p>


![cover](.github/cover.png?style=flat)


## 💻 Projeto
API da aplicação DFL - Detector de Focos de Lixo, fundamental para o funcionamento dos seguintes elementos:
* Website
* Dashboard
* Mobile App

## ✨ Tecnologias

-   [ ] Prisma
-   [ ] PostgreSQL
-   [ ] JavaScript
-   [ ] Express
-   [ ] Axios

# API Routes

## User & Authentication
| Route           | Description                                                                                                                                                 | Authentication? | Method | Body                        |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------ | --------------------------- |
| /authenticate   | Authenticate the user on the mobile app or create a account based on Google Accounts for him.<br>Returns a access token to request authenticated api paths. | ❌               | POST   | { user_info, access_token } |
| /user/[user_id] | Returns the user object.                                                                                                                                    | ADMIN           | GET    |

~~~typescript
user_info: { 
    email: string, 
    id: number, //equivale ao ID do Google, e não ao ID que será criado pela API
    familyName: string, // equivalente a "lastName"
    givenName: string, //equivalente a "firstName"
    photo: string 
}
~~~

~~~typescript
access_token: string 
// equivale ao token de acesso do Google para que informações adicionais sejam obtidas (ex.: gênero e data de nascimento)
~~~

## Profile
| Route                            | Description                                                                                                          | Authentication? | Method | Body                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------- | ------ | ----------------------------------------- |
| /profile/[profile_id]            | Returns the user profile object.                                                                                     | ❌               | GET    |
| /profile/[profile_id]            | Updates the user profile object.<br/>                                                                                | ✅               | PATCH  | { username: string, defaultCity: string } |
| /profile/[profile_id]/experience | Updates the user experience without needing to create a report.<br/>Only updates the equivalent to the player level. | ✅               | PATCH  |

## Reports
| Route               | Description                                              | Authentication? | Method | Body       |
| ------------------- | -------------------------------------------------------- | --------------- | ------ | ---------- |
| /report/[report_id] | Returns the report object.                               | ❌               | GET    |
| /report             | Creates a report for a user profile with the given data. | ✅               | POST   | Post Body  |
| /report/[report_id] | Updates the report object.                               | ✅               | PATCH  | Patch Body |
|                     |

Post Body:
~~~typescript
{ 
    profile_id: number,
    tags: string || JSON, 
    address: string, 
    coordinates: Array<number>, 
    images: Array<string>, // devem estar no formato base64 
    suggestion: string, 
    hasTrashBins: boolean 
}
~~~

Patch Body:
~~~typescript
{ 
    profile_id: number, 
    rating: number, // a nota que está sendo adicionada pelo usuário (mobile app)
    tags: string || JSON, 
    resolved: boolean, 
    approved: boolean, 
}
~~~

### Comments
| Route                                    | Description                                       | Authentication? | Method | Body                                    |
| ---------------------------------------- | ------------------------------------------------- | --------------- | ------ | --------------------------------------- |
| /report/[report_id]/comment              | Creates a comment in a report                     | ✅               | POST   | { profile_id: number, content: string } |
| /report/[report_id]/comment/[comment_id] | Returns a comment of a report with the given ID's | ✅               | GET    |
| /report/[report_id]/comments             | Returns all the comments of a report.             | ✅               | GET    |

## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

<br />
