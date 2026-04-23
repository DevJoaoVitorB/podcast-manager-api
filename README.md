# 🎙️ Podcast Manager API - Gerenciamento de Episódios do YouTube

Este projeto consiste em uma **API para gerenciamento de episódios de podcast do YouTube**, desenvolvida com **TypeScript e Node.js**.

A aplicação oferece funcionalidades essenciais para o dia a dia, como:

- cadastro de episódios com título, canal, youtubeId e categorias
- listagem de episódios com filtro por categoria
- atualização e remoção de episódios
- cadastro e manutenção de categorias

Tudo isso por meio de uma API HTTP simples, com validação de dados e persistência em banco relacional.

Este projeto foi desenvolvido como **desafio prático** de backend com foco em arquitetura por camadas, validação e integração com banco de dados do curso:

> **Formação Node.js Fundamentals – Módulo VI: Criando APIs com Node.js**  
> Plataforma: [**DIO.me**](https://web.dio.me/)

<br>

## 🚀 Tecnologias Utilizadas

![Stack](https://skillicons.dev/icons?i=nodejs,typescript,prisma,postgresql)

<br>

## 🎯 Objetivo do Projeto

O objetivo principal e construir uma API reutilizável para organização de episódios de podcasts em vídeo no YouTube, explorando boas práticas de backend com Node.js.

O sistema permite:

- cadastrar episódios com vínculo a uma ou mais categorias
- listar episódios com filtros por categoria usando query params
- consultar episódios e categorias por ID
- atualizar e remover registros de episódios e categorias
- validar entradas com regras de negócio antes de persistir

Além disso, o projeto reforça a prática de:

- modelagem de dados com Prisma
- separação de responsabilidades por camadas (controller, service, repository)
- padronização de validação com Zod
- tratamento centralizado de erros

<br>

## 🧱 Estrutura das Funcionalidades

A API foi dividida em funcionalidades independentes, facilitando manutenção e evolução.

### Gestão de Episódios

Responsável por criar, listar, buscar, atualizar e remover episódios.

Características:

- vínculo de episódio com categorias
- validação de `youtubeId` e campos textuais
- filtro por categorias via query string (`?category=CUID&category=CUID`)

<br>

### Gestão de Categorias

Responsável por cadastrar e manter categorias de episódios.

Características:

- criação de slug automaticamente a partir do nome
- garantia de unicidade por nome e slug
- CRUD completo de categorias

<br>

### Camada de Validação e Erros

Responsável por validar dados de entrada e padronizar respostas de erro.

Características:

- validações com Zod para DTOs de criação e atualização
- uso de erros de domínio com status HTTP apropriado
- middleware central de tratamento de exceções

<br>

## 📚 Conceitos Praticados

Durante o desenvolvimento deste projeto foram aplicados conceitos importantes como:

- API REST com Node.js
- TypeScript com tipagem forte
- ORM com Prisma
- migrations e versionamento de schema
- modularização por camadas
- validação de payload com Zod
- tratamento de erros e status HTTP

<br>

## 🖥️ Execução do Projeto

Para executar o projeto localmente:

```bash
# clonar o repositório
git clone https://github.com/DevJoaoVitorB/podcast-manager-api.git

# acessar a pasta do projeto
cd podcast-manager-api

# instalar dependências
npm install

# gerar client e aplicar migrations iniciais
npm run prisma:init

# executar em desenvolvimento
npm run dev
```

Para build e execução em produção:

```bash
# gerar build
npm run build

# iniciar versão compilada
npm run start
```

Para inspecionar os dados com Prisma Studio:

```bash
npm run studio
```

Crie um arquivo `.env` na raiz com as configurações de conexão do PostgreSQL, por exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/podcast_manager"
```

<br>

## 🔗 Observação sobre YouTube

A partir do `youtubeId` associado ao episódio, o cliente pode montar:

```ts
// Thumbnail
const cover = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

// Link do vídeo
const link = `https://www.youtube.com/watch?v=${youtubeId}`;
```
