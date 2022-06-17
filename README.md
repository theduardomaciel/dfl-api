#  DFL - API
###  Neste repositório está contido o código do backend da aplicação, incluindo *services* e *controllers* para cuidarem das requisições realizadas tanto pelo aplicativo móvel [DFL - Mobile](https://github.com/theduardomaciel/dfl-mobile), quanto pelo [site](https://github.com/theduardomaciel/dfl-web) disponível na web para o download do aplicativo, que requer acesso a diversas informações do banco de dados da aplicação.

> No futuro, o [site](https://github.com/theduardomaciel/dfl-web) também será responsável por servir como uma dashboard para indivíduos responsáveis pela coleta de lixo.

## User Routes
| Rota | Autenticação requerida? | Descrição | 
| ----------- | ----------- |----------- |
| /authenticate | ❌ |  
| /user | ✅|

## Profile Routes
| Rota | Autenticação requerida? | Descrição | 
| ----------- | ----------- |----------- |
| /profile| ❌ |  
| /profile/update | ✅ |
| /profile/update/experience | ✅ |
| /profiles/search | ❌ | Retorna todos os perfis encontrados em um determinado local ou os dados de algum perfil pelo nome.

## Report Routes

### - General
| Rota | Autenticação requerida? | Descrição | 
| ----------- | ----------- |----------- |
| /report/create | ✅ |  
| /report/update | ✅ |
| /report/delete | ✅ |
| /reports/search | ❌ | Retorna todos os relatórios encontrados em um determinado local (cidade, estado, etc.)


### - Comment
| Rota | Autenticação requerida? | Descrição | 
| ----------- | ----------- |----------- |
| /report/comments/create | ✅ |  
| /report/comments/delete | ✅ |
| /report/comments/read| ✅ |

## Image Service Routes
| Rota | Autenticação requerida? | Descrição | 
| ----------- | ----------- |----------- |
| /upload | ✅ |  Envia uma *string* no formato **HASH** e a converte para uma imagem que será hospedada no Imgur.
| /delete | ✅ | Deleta a imagem enviada para o Imgur por meio de uma *string* ***image_deletehash***, disponível nos dados do relatório ao qual a imagem pertence.
