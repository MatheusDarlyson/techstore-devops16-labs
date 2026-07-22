# Changelog

Todas as mudanças relevantes deste projeto serão documentadas neste arquivo.

Este projeto segue as recomendações do **Keep a Changelog** e utiliza **Versionamento Semântico (Semantic Versioning)**.

> A TechStore é um projeto desenvolvido ao longo da disciplina de DevOps. Cada versão representa uma nova etapa da evolução tecnológica da empresa fictícia, incorporando práticas, ferramentas e processos utilizados em ambientes corporativos.

---

# [0.1.0] - 2026-07-21

## 🎉 Primeira versão funcional (MVP)

Esta versão estabelece a base do projeto TechStore e marca a implementação da primeira entrega funcional da API, juntamente com a estrutura inicial de Integração Contínua (CI).

---

## ✨ Adicionado

### Estrutura do Projeto

- Estrutura inicial do backend utilizando **Node.js** e **Express**.
- Organização do projeto seguindo o padrão:
  - Controllers
  - Services
  - Routes
  - Data
- Separação entre regras de negócio e controle das requisições.
- Arquivos de configuração do ambiente (`.env.example` e `.gitignore`).

---

### API REST

Implementação da primeira versão da API da TechStore.

Endpoints disponíveis:

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/api/health` | Verifica o status da aplicação |
| POST | `/api/auth/register` | Cadastro de usuários |
| POST | `/api/auth/login` | Autenticação de usuários |
| GET | `/api/products` | Listagem de produtos |
| POST | `/api/products` | Cadastro de produtos |
| PUT | `/api/products/:id` | Atualização de produtos |
| DELETE | `/api/products/:id` | Exclusão de produtos |

---

### Autenticação

- Cadastro de usuários.
- Login de usuários.
- Criptografia de senhas utilizando **bcrypt**.
- Persistência dos usuários em arquivo JSON.

---

### Produtos

Implementação completa do CRUD de produtos contendo:

- Cadastro
- Consulta
- Atualização
- Exclusão

Modelo inicial do produto:

- ID
- Nome
- Descrição
- Preço
- Estoque

Persistência utilizando arquivos JSON.

---

### Testes

Primeiro teste automatizado do projeto.

Implementado:

- Health Check automatizado.
- Validação do endpoint `/api/health`.
- Execução através do comando:

```bash
npm test
```

---

### Integração Contínua

Primeira pipeline utilizando **GitLab CI**.

Pipeline inicial responsável por:

- Preparar ambiente Node.js.
- Instalar dependências.
- Inicializar a API.
- Executar os testes automatizados.
- Validar o Health Check da aplicação.

---

### Documentação

Adicionados:

- README completo do projeto.
- Documentação da disciplina.
- Estrutura inicial do repositório.
- Objetivos do projeto.
- Metodologia da disciplina.

---

## 🔄 Alterado

- Organização da estrutura do backend.
- Padronização da arquitetura em Controllers e Services.
- Padronização dos commits utilizando Conventional Commits.
- Melhoria da documentação do projeto.

---

## 🐞 Corrigido

### Produtos

Correção da geração automática dos identificadores dos produtos.

Antes:

- IDs eram gerados utilizando o tamanho do vetor.
- Exclusões podiam ocasionar IDs duplicados.

Agora:

- IDs são gerados utilizando o maior identificador existente acrescido de uma unidade.
- Garantia de unicidade mesmo após exclusões.

---

## 📚 Conceitos abordados nesta versão

Durante esta etapa foram introduzidos os seguintes conceitos:

- Git
- GitLab
- Versionamento de Código
- API REST
- Arquitetura em Camadas
- Controllers
- Services
- Persistência em JSON
- Hash de Senhas com bcrypt
- Testes Automatizados
- Health Check
- Integração Contínua (CI)
- GitLab CI
- Conventional Commits
- Documentação Técnica

---

## 🎯 Próxima versão (0.2.0)

Planejado:

- Containerização da aplicação com Docker.
- Criação do Dockerfile.
- Execução da API em containers.
- Introdução ao Docker Compose.
- Evolução da pipeline para construção automática de imagens.

---


