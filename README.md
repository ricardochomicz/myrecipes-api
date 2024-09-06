# MyRecipes API

![MyRecipes API](https://img.shields.io/badge/version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

## Descrição

A **MyRecipes API** é uma API RESTful desenvolvida para gerenciar receitas e ingredientes. Esta API permite ao usuário cadastrar, editar e listar ingredientes e receitas, bem como listar receitas que incluem ou quase incluem os ingredientes informados. O objetivo é proporcionar uma forma eficiente de gerenciar receitas e ingredientes, garantindo uma compatibilidade prática entre os itens.

## Tecnologias Utilizadas

- **Backend**: Node.js (Express)
- **Banco de Dados**: MongoDB

## Funcionalidades

- **Gerenciamento de Ingredientes**
  - Cadastro de novos ingredientes
  - Edição de ingredientes existentes
  - Listagem de ingredientes
  
- **Gerenciamento de Receitas**
  - Cadastro de novas receitas
  - Edição de receitas existentes
  - Listagem de receitas

- **Compatibilidade de Ingredientes**
  - Listagem de receitas que incluem ou quase incluem os ingredientes fornecidos
  - Marcação de receitas como 100% compatíveis com os ingredientes
 
## Uso

- GET /api/ingredients: Listar todos os ingredientes.

- POST /api/ingredients: Cadastrar um novo ingrediente.

- PUT /api/ingredients/{id}: Atualizar um ingrediente existente.

- GET /api/recipes: Listar todas as receitas.

- POST /api/recipes: Cadastrar uma nova receita.

- PUT /api/recipes/{id}: Atualizar uma receita existente.

- PUT /api/:id/rating: Atualizar classificação receita

- POST /api/recipes/search-by-ingredients: Listar receitas que incluem ou quase incluem os ingredientes fornecidos

## Instalação

### Requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Clonar o Repositório

```bash
git clone https://github.com/ricardochomicz/myrecipes-api.git
cd myrecipes-api
```
### Instalar as depêndencias
```bash
npm install
```
### Carregar imagem docker (local)
```bash
docker load -i myrecipes-api.tar
```
### rodar no Docker
```bash
docker compose up --build
```

### Link imagem
https://drive.google.com/file/d/1scX-gmNxNoft3LSgyNxQFQldWA_N33ai/view?usp=sharing