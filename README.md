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

## Report Routes

### - General
| Rota | Autenticação requerida? | Descrição | 
| ----------- | ----------- |----------- |
| /report/create | ✅ |  
| /report/update | ✅ |
| /report/delete| ✅ |

### - Comment
| Rota | Autenticação requerida? | Descrição | 
| ----------- | ----------- |----------- |
| /report/comments/create | ✅ |  
| /report/comments/delete | ✅ |
| /report/comments/read| ✅ |

### - Geral
| Rota | Autenticação requerida? | Descrição | 
| ----------- | ----------- |----------- |
| /report/create | ✅ |  
| /report/update | ✅ |
| /report/delete| ✅ |

## Image Service Routes
| Rota | Autenticação requerida? | Descrição | 
| ----------- | ----------- |----------- |
| /upload | ✅ |  Envia uma *string* no formato **HASH** e a converte para uma imagem que será hospedada no Imgur.
| /delete | ✅ | Deleta a imagem enviada para o Imgur por meio de uma *string* ***image_deletehash***, disponível nos dados do relatório ao qual a imagem pertence.
