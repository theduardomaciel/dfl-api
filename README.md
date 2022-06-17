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
| Description | Route | Authentication? | Method | 
| ----------- | ----------- | ----------- |----------- |
| Authenticate the user on the mobile app or create a account based on Google Accounts for him.<br>Returns a access token to request authenticated api paths. | /authenticate | ❌ | POST 
| Returns the user object. | /user/[user_id] | ADMIN | GET

## Profile
| Description | Route | Authentication? | Method | Body
| ----------- | ----------- | ----------- |----------- | -- |
| Returns the user profile object. | /profile/[profile_id] | ❌ | GET 
| Updates the user profile object.<br/> | /profile/[profile_id] | ✅ | PATCH|  defaultCity: string, username: string }
| Updates the user experience wihout needing to create a report. | /profile/[profile_id]/experience | ✅ | PATCH


## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

<br />
