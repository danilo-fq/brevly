# Brev.ly

Brev.ly é um encurtador de URLs simples e eficiente, projetado para transformar links longos em URLs curtas e fáceis de compartilhar.

> **Aviso:** Este projeto está em desenvolvimento. Novas funcionalidades e melhorias serão adicionadas em breve.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** (backend)
- **TypeScript**
- **Fastify** (API HTTP)
- **Drizzle ORM** (migrations e acesso ao banco)
- **PostgreSQL** (banco de dados)
- **React** + **Vite** (frontend)
- **TailwindCSS** (estilização)
- **Cloudflare R2** (armazenamento de arquivos)
- **Vitest** (testes)
- **Docker** & **Docker Compose** (containerização)
- **pnpm** (gerenciador de pacotes)

---

## 📁 Estrutura do Projeto

```
brevly/
├── server/         # Backend (API, banco, migrations)
│   ├── src/
│   ├── dist/
│   ├── Dockerfile
│   ├── compose.yaml
│   └── .env
├── web/            # Frontend (React)
│   ├── src/
│   ├── public/
│   └── vite.config.ts
└── README.md
```

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 8+
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) Conta Cloudflare R2 para armazenamento

---

## 🛠️ Principais Comandos

### Backend (server)

| Comando                  | Descrição                                      |
|--------------------------|------------------------------------------------|
| `pnpm install`           | Instala as dependências                        |
| `pnpm dev`               | Inicia o servidor em modo desenvolvimento      |
| `pnpm build`             | Gera o build de produção                       |
| `pnpm start`             | Inicia o servidor em produção                  |
| `pnpm db:generate`       | Gera as migrations com Drizzle ORM             |
| `pnpm db:migrate`        | Aplica as migrations no banco de dados         |
| `pnpm test`              | Executa os testes unitários                    |

### Frontend (web)

| Comando                  | Descrição                                      |
|--------------------------|------------------------------------------------|
| `pnpm install`           | Instala as dependências                        |
| `pnpm dev`               | Inicia o frontend em modo desenvolvimento      |
| `pnpm build`             | Gera o build de produção                       |
| `pnpm preview`           | Visualiza o build de produção localmente       |

---

## 🐳 Como rodar com Docker

1. **Clone o repositório e acesse a pasta do projeto:**
   ```sh
   git clone https://github.com/danilo-fq/brevly.git

   cd brevly/server

   pnpm install
   ```

2. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env` e ajuste conforme necessário.

3. **Suba os containers do backend e banco de dados:**
   ```sh
   docker compose up -d
   ```

4. **Aplique as migrations para criar as tabelas no banco:**
   ```sh
   pnpm db:migrate
   ```

5. **(Opcional) Suba o frontend:**
   ```sh
   cd ../web
   pnpm install
   pnpm dev
   ```

---

## 📝 Fluxo de Deploy/Execução

1. **Instale as dependências** do backend e frontend.
2. **Configure o arquivo `.env`** com as variáveis do banco, Cloudflare, etc.
3. **Suba os containers** com Docker Compose.
4. **Rode as migrations** para criar as tabelas no banco.
5. **Acesse a API** em `http://localhost:3333` e o frontend em `http://localhost:5173` (ou porta configurada).

---

## 🧪 Testes

Para rodar os testes do backend, entre na pasta server e rode o comando:
```sh
pnpm test
```

---

## ☁️ Integração com Cloudflare R2

O projeto suporta exportação de relatórios CSV para o Cloudflare R2. Configure as variáveis de ambiente relacionadas no `.env` para ativar essa funcionalidade. Caso não faça uma configuração do Cloudflare R2 não será possível baixar o relatório CSV.

---

## 💡 Observações

- As migrations **devem ser aplicadas manualmente** após subir os containers, usando `pnpm db:migrate`.
- O projeto utiliza Drizzle ORM para versionamento e aplicação das migrations.
- O frontend e backend são independentes, mas podem ser rodados juntos via Docker Compose.

---

## 👨‍💻 Autor

- [Danilo](https://github.com/danilo-fq)

---

Sinta-se à vontade para contribuir, abrir issues ou sugerir melhorias. Obrigado por usar o Brev.ly!
