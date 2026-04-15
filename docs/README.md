## 🎙️ Podcast Manager - Backend

### Descrição:

Permite organizar episódios de podcasts em categorias, facilitando a navegação e o acesso a conteúdos por tema ou preferência do usuário.

### Domínio:

Podcasts em vídeo

---

### 🧱 Esboço da Arquitetura

![Arquitetura](/docs/assets/architecture.png)

---

### 1. Feature: Cadastrar episódio de podcast

> **Method:** `POST` \
> **Endpoint:** `/episodes` \
> **Headers:** `Content-Type: application/json`

#### 📥 JSON de Requisição

```json
{
    "title": "PROFESSOR HOC - Flow #578",
    "youtubeId": "cGQV2KIzS6E",
    "channel": "Flow Podcast",
    "categoryIds": [
        "a1b7e4d2-9c3f-4f2a-b6d8-5e1c9a7b2d34",
        "7c2d1f9a-3e8b-4a6d-9f1c-2b7e5a4d8c10"
    ]
}
```

#### 📤 JSON de Resposta

> **Status Code:** `201 - CREATED`

```json
{
    "id": "b3f1c2a0-8e4a-4d91-9c2a-7f5d2c9a1e33",
    "title": "PROFESSOR HOC - Flow #578",
    "youtubeId": "cGQV2KIzS6E",
    "channel": "Flow Podcast",
    "categories": [
        {
            "id": "a1b7e4d2-9c3f-4f2a-b6d8-5e1c9a7b2d34",
            "name": "Geopolítica",
            "slug": "geopolitica",
            "createdAt": "2026-03-29T09:10:00Z",
            "updatedAt": "2026-03-29T09:10:00Z"
        },
        {
            "id": "7c2d1f9a-3e8b-4a6d-9f1c-2b7e5a4d8c10",
            "name": "Educação",
            "slug": "educacao",
            "createdAt": "2026-03-29T09:15:00Z",
            "updatedAt": "2026-03-29T09:15:00Z"
        }
    ],
    "createdAt": "2026-03-29T09:40:00Z",
    "updatedAt": "2026-03-29T09:40:00Z"
}
```

---

### 2. Feature: Listar episódios de podcasts

> **Method:** `GET` \
> **Endpoint:** `/episodes` \
> **Query Params:** `?category=` \
> **Headers:** `Content-Type: application/json`

#### 📤 JSON de Resposta

> **Status Code:** `200 - OK`

```json
[
    {
        "id": "b3f1c2a0-8e4a-4d91-9c2a-7f5d2c9a1e33",
        "title": "PROFESSOR HOC - Flow #578",
        "youtubeId": "cGQV2KIzS6E",
        "channel": "Flow Podcast",
        "categories": [
            {
                "id": "a1b7e4d2-9c3f-4f2a-b6d8-5e1c9a7b2d34",
                "name": "Geopolítica",
                "slug": "geopolitica",
                "createdAt": "2026-03-29T09:10:00Z",
                "updatedAt": "2026-03-29T09:10:00Z"
            },
            {
                "id": "7c2d1f9a-3e8b-4a6d-9f1c-2b7e5a4d8c10",
                "name": "Educação",
                "slug": "educacao",
                "createdAt": "2026-03-29T09:15:00Z",
                "updatedAt": "2026-03-29T09:15:00Z"
            }
        ],
        "createdAt": "2026-03-29T09:40:00Z",
        "updatedAt": "2026-03-29T09:40:00Z"
    },
    {
        "id": "6e1a9c3d-2b7f-4d8a-9c5e-1f3b7a2d4c55",
        "title": "ACHISMOS [3 CONTINENTES] - Flow #395",
        "youtubeId": "BWNGGbsevN0",
        "channel": "Flow Podcast",
        "categories": [
            {
                "id": "c8d2a7b1-4e9f-4c3a-b6d1-2a7e5f9c3d44",
                "name": "Humor",
                "slug": "humor",
                "createdAt": "2026-03-29T09:20:00Z",
                "updatedAt": "2026-03-29T09:20:00Z"
            }
        ],
        "createdAt": "2026-03-29T09:50:00Z",
        "updatedAt": "2026-03-29T09:50:00Z"
    }
]
```

---

### 3. Feature: Buscar episódio de podcast

> **Method:** `GET` \
> **Endpoint:** `/episodes/:id` \
> **Headers:** `Content-Type: application/json`

#### 📤 JSON de Resposta

> **Status Code:** `200 - OK`

```json
{
    "id": "6e1a9c3d-2b7f-4d8a-9c5e-1f3b7a2d4c55",
    "title": "ACHISMOS [3 CONTINENTES] - Flow #395",
    "youtubeId": "BWNGGbsevN0",
    "channel": "Flow Podcast",
    "categories": [
        {
            "id": "c8d2a7b1-4e9f-4c3a-b6d1-2a7e5f9c3d44",
            "name": "Humor",
            "slug": "humor",
            "createdAt": "2026-03-29T09:20:00Z",
            "updatedAt": "2026-03-29T09:20:00Z"
        }
    ],
    "createdAt": "2026-03-29T09:50:00Z",
    "updatedAt": "2026-03-29T09:50:00Z"
}
```

---

### 4. Feature: Atualizar episódio de podcast

> **Method:** `PATCH` \
> **Endpoint:** `/episodes/:id` \
> **Headers:** `Content-Type: application/json`

#### 📥 JSON de Requisição

```json
{
    "categoryIds": [
        "c8d2a7b1-4e9f-4c3a-b6d1-2a7e5f9c3d44",
        "f1a9d3c7-2e8b-4f6a-b5c1-9d2e7a3c4b22"
    ]
}
```

#### 📤 JSON de Resposta

> **Status Code:** `200 - OK`

```json
{
    "id": "6e1a9c3d-2b7f-4d8a-9c5e-1f3b7a2d4c55",
    "title": "ACHISMOS [3 CONTINENTES] - Flow #395",
    "youtubeId": "BWNGGbsevN0",
    "channel": "Flow Podcast",
    "categories": [
        {
            "id": "c8d2a7b1-4e9f-4c3a-b6d1-2a7e5f9c3d44",
            "name": "Humor",
            "slug": "humor",
            "createdAt": "2026-03-29T09:20:00Z",
            "updatedAt": "2026-03-29T09:20:00Z"
        },
        {
            "id": "f1a9d3c7-2e8b-4f6a-b5c1-9d2e7a3c4b22",
            "name": "Cultura",
            "slug": "cultura",
            "createdAt": "2026-03-29T09:25:00Z",
            "updatedAt": "2026-03-29T09:25:00Z"
        }
    ],
    "createdAt": "2026-03-29T09:50:00Z",
    "updatedAt": "2026-03-29T10:00:00Z"
}
```

---

### 5. Feature: Remover episódio de podcast

> **Method:** `DELETE` \
> **Endpoint:** `/episodes/:id` \
> **Headers:** `Content-Type: application/json`

#### 📤 JSON de Resposta

> **Status Code:** `204 - NO CONTENT`

---

### 6. Feature: Cadastrar categoria de episódio

> **Method:** `POST` \
> **Endpoint:** `/categories` \
> **Headers:** `Content-Type: application/json`

#### 📥 JSON de Requisição

```json
{
    "name": "Geopolítica"
}
```

#### 📤 JSON de Resposta

> **Status Code:** `201 - CREATED`

```json
{
    "id": "a1b7e4d2-9c3f-4f2a-b6d8-5e1c9a7b2d34",
    "name": "Geopolítica",
    "slug": "geopolitica",
    "createdAt": "2026-03-29T09:10:00Z",
    "updatedAt": "2026-03-29T09:10:00Z"
}
```

---

### 7. Feature: Listar categorias de episódios

> **Method:** `GET` \
> **Endpoint:** `/categories` \
> **Headers:** `Content-Type: application/json`

#### 📤 JSON de Resposta

> **Status Code:** `200 - OK`

```json
[
    {
        "id": "a1b7e4d2-9c3f-4f2a-b6d8-5e1c9a7b2d34",
        "name": "Geopolítica",
        "slug": "geopolitica",
        "createdAt": "2026-03-29T09:10:00Z",
        "updatedAt": "2026-03-29T09:10:00Z"
    },
    {
        "id": "7c2d1f9a-3e8b-4a6d-9f1c-2b7e5a4d8c10",
        "name": "Educação",
        "slug": "educacao",
        "createdAt": "2026-03-29T09:15:00Z",
        "updatedAt": "2026-03-29T09:15:00Z"
    },
    {
        "id": "c8d2a7b1-4e9f-4c3a-b6d1-2a7e5f9c3d44",
        "name": "Humor",
        "slug": "humor",
        "createdAt": "2026-03-29T09:20:00Z",
        "updatedAt": "2026-03-29T09:20:00Z"
    },
    {
        "id": "f1a9d3c7-2e8b-4f6a-b5c1-9d2e7a3c4b22",
        "name": "Cultura",
        "slug": "cultura",
        "createdAt": "2026-03-29T09:25:00Z",
        "updatedAt": "2026-03-29T09:25:00Z"
    }
]
```

---

### 8. Feature: Buscar categoria de episódio

> **Method:** `GET` \
> **Endpoint:** `/categories/:id` \
> **Headers:** `Content-Type: application/json`

#### 📤 JSON de Resposta

**Status Code:** `200 - OK`

```json
{
    "id": "c8d2a7b1-4e9f-4c3a-b6d1-2a7e5f9c3d44",
    "name": "Humor",
    "slug": "humor",
    "createdAt": "2026-03-29T09:20:00Z",
    "updatedAt": "2026-03-29T09:20:00Z"
}
```

---

### 9. Feature: Atualizar categoria de episódio

> **Method:** `PATCH` \
> **Endpoint:** `/categories/:id` \
> **Headers:** `Content-Type: application/json`

#### 📥 JSON de Requisição

```json
{
    "name": "Educação Militar"
}
```

#### 📤 JSON de Resposta

> **Status Code:** `200 - OK`

```json
{
    "id": "7c2d1f9a-3e8b-4a6d-9f1c-2b7e5a4d8c10",
    "name": "Educação Militar",
    "slug": "educacao-militar",
    "createdAt": "2026-03-29T09:15:00Z",
    "updatedAt": "2026-03-29T10:20:00Z"
}
```

---

### 10. Feature: Remover categoria de episódio

> **Method:** `DELETE` \
> **Endpoint:** `/categories/:id` \
> **Headers:** `Content-Type: application/json`

#### 📤 JSON de Resposta

> **Status Code:** `204 - NO CONTENT`

---

### 💻 Tecnológias

![Stack de Tecnológias](https://skillicons.dev/icons?i=nodejs,npm,typescript,prisma,postgresql,git)

---

### 🔗 Integração com YouTube

A partir do youtubeId (identificador do vídeo no Youtube) associado ao episódio, é possível obter no cliente:

```ts
// 1. Thumbnail do vídeo
const cover = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

// 2. Link para o vídeo
const link = `https://www.youtube.com/watch?v=${youtubeId}`;
```
