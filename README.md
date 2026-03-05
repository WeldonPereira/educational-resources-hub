# Educational Resources Hub

![Python Version](https://img.shields.io/badge/python-3.12-blue.svg)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.134.0-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

O **Educational Resources Hub** é uma plataforma fullstack moderna projetada para centralizar e gerenciar materiais didáticos.  
O diferencial do sistema é o recurso **Smart Assist**, que utiliza **Inteligência Artificial** para sugerir descrições pedagógicas e categorizações automáticas, otimizando o trabalho dos curadores de conteúdo.

# 🎬 Demonstração do Projeto

## Vídeo em execução do sistema

https://github.com/user-attachments/assets/9117e18d-baab-4dc4-b714-5aa14db5c319


## Terminal do Backend em execução

<img width="818" height="155" alt="Captura de tela 2026-03-04 074149" src="https://github.com/user-attachments/assets/cd01f960-011d-4ddf-9a3a-5d7c472a85b7" />

# 🚀 Tecnologias Utilizadas

## Backend

- **FastAPI (v0.134.0)**: Core da aplicação, utilizado por sua alta performance e suporte nativo a operações assíncronas, garantindo endpoints rápidos e documentação automática via Swagger.
- **SQLAlchemy (v2.0.47)**: Implementação de ORM com mapeamento declarativo, utilizando o padrão *Repository* para isolar a lógica de persistência.
- **Alembic (v1.18.4)**: Gestão estratégica de migrações de banco de dados, assegurando o versionamento e a integridade do esquema MySQL.
- **Pydantic V2 (v2.12.5)**: Motor de validação de dados e serialização, garantindo que o contrato da API seja estritamente respeitado.
- **Google GenAI (v1.65.0)**: Integração avançada com o modelo **Gemini**, utilizando *Prompt Engineering* para o recurso **Smart Assist** de descrição pedagógica.
- **Uvicorn (v0.41.0)**: Servidor ASGI de nível de produção para execução da aplicação de forma concorrente.
- **PyMySQL (v1.1.2)**: Driver de conexão eficiente para comunicação robusta com o banco de dados MySQL.

## Frontend 

- **React (v19.2.0) + TypeScript**: Desenvolvimento baseado em componentes reutilizáveis com tipagem estrita, elevando a segurança e manutenibilidade do código.
- **Vite**: *Toolchain* de última geração que proporciona um ambiente de desenvolvimento instantâneo e builds otimizados.
- **Tailwind CSS (v4.2.1)**: Framework utilitário para estilização responsiva e design system consistente, integrado via `@tailwindcss/vite`.
- **Framer Motion (v12.34.4)**: Biblioteca de animações potente para transições de página fluidas e micro-interações que enriquecem a experiência do usuário.
- **Axios (v1.13.6)**: Cliente HTTP para comunicação com a API, configurado com interceptadores para tratamento global de erros.
- **React Router Dom (v7.13.1)**: Gestão de rotas dinâmica e protegida para navegação fluida entre Dashboard e telas de gestão.
- **React Toastify (v11.0.5)**: Sistema de notificações inteligentes para feedback imediato de ações (Sucesso, Erro, Alerta).

## Qualidade & DevOps

- **Black (v26.1.0)**: O "uncompromising code formatter" que garante um estilo visual único e padronizado em todo o backend.
- **Flake8 (v7.3.0)**: Linter rigoroso para conformidade com a **PEP 8**, garantindo um código limpo, sem redundâncias e seguindo as melhores práticas da comunidade Python.

# 📁 Estrutura do Projeto


```
educational-resources-hub
│
├── .github
│   └── workflows
│       └── lint.yml
│
├── backend
│   ├── alembic
│   ├── app
│   │   ├── __pycache__
│   │   ├── ai
│   │   ├── core
│   │   ├── db
│   │   ├── models
│   │   ├── repositories
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   ├── venv
│   ├── .env
│   ├── .env.example
│   ├── alembic.ini
│   ├── requirements.txt
│
├── docs
│   ├──  architecture.md
│   ├──  decisions.md
│
├── frontend
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── hooks
│   │   ├── layout
│   │   ├── pages
│   │   ├── services
│   │   ├── types
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── router.tsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
└── .flake8
└── .gitignore
└── README.md
```

# 🛠️ Configuração e Instalação

## Pré-requisitos

- Python 3.12+
- Node.js 18+
- MySQL Server

## 1. Clonar o Repositório

```bash
git clone https://github.com/WeldonPereira/educational-resources-hub.git
cd educational-resources-hub
```

## 2. Configuração do Backend

### 1. Entre na pasta e crie o ambiente virtual

```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
```

### 2. Instale as dependências

```bash
pip install -r requirements.txt
```

### 3. Configure o arquivo `.env` (use o `.env.example` como base)

```env
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/db_name

APP_ENV=development
APP_NAME="Educational Resources Hub"

AI_PROVIDER=gemini
AI_ENABLED=true

AI_API_KEY=sua_chave
```
### 3.5 Criar o Banco de Dados

**Antes de prosseguir, acesse seu terminal do MySQL ou uma ferramenta visual (como o MySQL Workbench) e crie o schema:**

```sql
CREATE DATABASE db_name;
```

### 4. Execute as migrações do banco de dados

```bash
alembic upgrade head
```

### 5. Inicie o servidor

```bash
uvicorn app.main:app --reload
```

## 3. Configuração do Frontend

### 1. Em outro terminal, entre na pasta e instale os pacotes

```bash
cd frontend
npm install
```

### 2. Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

## 📚 Documentação Técnica

Para uma compreensão aprofundada das escolhas de engenharia e da estrutura do projeto, consulte os documentos abaixo:

- **[Arquitetura do Sistema](docs/architecture.md)**: Detalhamento das camadas (API, Service, Repository), fluxo de dados e integração com a IA.

- **[Decisões Arquiteturais (ADRs)](docs/decisions.md)**: Registro das motivações por trás da escolha do FastAPI, estratégia de fallback da IA e otimizações de performance (como a solução do problema N+1).

# 🧠 Funcionalidades em Destaque

## Smart Assist (IA)

- Ao cadastrar um novo recurso, o usuário pode clicar em **"Gerar Descrição com IA"**.
  O sistema utiliza técnicas de **Prompt Engineering** para instruir a LLM a atuar como um **Assistente Pedagógico**, garantindo respostas úteis e formatadas em JSON estrito.

## Resiliência e Fallback

- Caso a API de IA atinja limites de cota ou falhe, o backend possui um mecanismo de **Graceful Degradation** que ativa automaticamente um **Mock simulado**, garantindo que o usuário nunca tenha sua experiência interrompida.

# 📊 Observabilidade e DevOps

- **Logs Estruturados**: O backend registra a latência das requisições de IA e o status de cada operação, facilitando o monitoramento de performance.
- **Health Check**: Endpoint disponível em `/health` para monitoramento de disponibilidade.
- **CI/CD**: Pipeline do GitHub Actions configurada para rodar Linters (`black`, `flake8`) a cada push, garantindo a qualidade do código.

# 🛠️ Diferenciais Técnicos

## Qualidade & DevOps

- **Linting Automatizado**: Uso de Black (formatação) e Flake8 (estilo PEP8) via GitHub Actions.
- **CI/CD**: O merge só é permitido se o código estiver dentro dos padrões de qualidade.

## Performance & Dados

- **Otimização SQL**: Implementação de `joinedload` nos repositórios para mitigar o problema de N+1, garantindo carregamento eficiente de tags.
- **Observabilidade**: Logs estruturados para chamadas de IA, monitorando latência e status.

Exemplo de log:

```txt
[INFO] AI Request: Title="React Hooks", Latency=1.8s
```

## Inteligência Artificial

- **Prompt Engineering**: Instruções específicas para garantir que a IA atue como um assistente pedagógico real.
- **Resiliência (Fallback)**: Mecanismo de Graceful Degradation que ativa um Mock simulado caso a cota da API Gemini seja atingida.

# 📡 Principais Endpoints (v1)

| Método | Endpoint              | Descrição                        |
| ------ | --------------------- | -------------------------------- |
| GET    | `/health`             | Status do sistema (Health Check) |
| GET    | `/api/v1/resources`   | Listagem paginada de materiais   |
| POST   | `/api/v1/resources`   | Cadastro de novo recurso         |
| POST   | `/api/v1/ai/generate` | Aciona o Smart Assist (IA)       |

# 🔐 Segurança

- **Variáveis de Ambiente**: Nenhuma chave de API ou credencial de banco de dados está exposta no código fonte.
- **CORS**: Configurado estritamente para permitir apenas comunicações do frontend autorizado.

## 📘 Educational Resources Hub | V-LAB UFPE Case
> **Projeto desenvolvido como Desafio Técnico para a vaga de Desenvolvedor Fullstack no V-LAB – UFPE.**

Desenvolvido por [Weldon Pereira](https://github.com/WeldonPereira)
