<!-- CABEÇALHO -->
<div id="readme-top" align="center">
    <h1>
      🐱 Find a Friend API 🐕
    </h1>
    <p>
        <a href="#%EF%B8%8F-sobre-o-projeto">Sobre o Projeto</a> •
        <a href="#-endpoints">Endpoints</a> •
        <a href="#%EF%B8%8F-tecnologias">Tecnologias</a> •
        <a href="#-autor">Autor</a>
    </p>
</div>

<!-- SOBRE O PROJETO -->

## 🖥️ Sobre o Projeto

> Projeto desenvolvido como desafio referente ao módulo **Implementando o SOLID** da Formação de Node.js da Rocketseat.

Esse projeto consiste em uma aplicação back-end de um sistema para adoção de animais.

As funcionalidades dessa aplicação são:

- [x] Cadastrar uma ORG
- [x] Login como uma ORG
- [x] Cadastrar um pet
- [x] Listar todos os pets disponíveis para adoção em uma cidade
- [x] Filtrar pets por suas características
- [x] Visualizar detalhes de um pet para adoção

<!-- ENDPOINTS -->

## 💡 Endpoints

| Método | Endpoint           | Responsabilidade                                                                         | Regras de Negócio                                                                                   |
| ------ | ------------------ | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| POST   | /orgs              | Cria uma ORG                                                                             |                                                                                                     |
| POST   | /orgs/authenticate | Autentica uma ORG                                                                        |                                                                                                     |
| POST   | /orgs/pets         | Cadastra um pet                                                                          | UM pet deve estar ligado a uma ORG                                                                  |
| GET    | /orgs/pets         | Lista os pets disponíveis para adoção em uma cidade e filtrados por suas características | Para listar os pets, obrigatoriamente precisamos informar a cidade. Os outros filtros são opcionais |
| GET    | /orgs/pets/:petId  | Retorna detalhes de um pet para adoção                                                   |                                                                                                     |

<!-- TECNOLOGIAS -->

## 🛠️ Tecnologias

Para o desenvolvimento desse projeto, as seguintes ferramentas foram utilizadas:

- **[Node.js](https://nodejs.org/)**
- **[Fastify](https://fastify.io/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Prisma](https://www.prisma.io/)**
- **[Zod](https://zod.dev/)**

## 👨‍💻 Autor

<img style="border-radius: 15%;" src="https://gitlab.com/uploads/-/system/user/avatar/8603970/avatar.png?width=400" width=70 alt="author-profile-picture"/>

Marcos Kenji Kuribayashi

---
