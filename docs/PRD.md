# Product Requirements Document (PRD): TechStore E-Commerce

**Versão:** 1.0  
**Data da Versão:** 03 de Agosto de 2026  
**Status:** Em Desenvolvimento (MVP)  
**Projeto:** TechStore DevOps Labs  
**Autor:** Equipe TechStore  

---

## 📑 Sumário

1. [Visão Geral](#1-visão-geral)
   - [1.1. Problema](#11-problema)
   - [1.2. Solução Proposta](#12-solução-proposta)
   - [1.3. Objetivos de Negócio](#13-objetivos-de-negócio)
   - [1.4. Público-Alvo](#14-público-alvo)
2. [Escopo](#2-escopo)
   - [2.1. Incluído (MVP - Marco 1)](#21-incluído-mvp---marco-1)
   - [2.2. Evolução (Marco 2)](#22-evolução-marco-2)
   - [2.3. Fora do Escopo](#23-fora-do-escopo)
3. [Roadmap](#3-roadmap)
4. [Regras de Negócio (RN)](#4-regras-de-negócio-rn)
5. [Requisitos Funcionais (RF)](#5-requisitos-funcionais-rf)
   - [Marco 1: MVP](#marco-1-mvp)
   - [Marco 2: Evolução](#marco-2-evolução)
6. [Requisitos Não Funcionais (RNF)](#6-requisitos-não-funcionais-rnf)
7. [Fluxos de Usuário e Interfaces Principais](#7-fluxos-de-usuário-e-interfaces-principais)
8. [Critérios de Aceite](#8-critérios-de-aceite)
   - [Marco 1 (MVP)](#marco-1-mvp-1)
   - [Marco 2 (Evolução)](#marco-2-evolução-1)
9. [Histórico de Versões](#9-histórico-de-versões)

---

## 1. Visão Geral

### 1.1. Problema
A TechStore é uma empresa fictícia do ramo de **comércio eletrônico (e-commerce)** que enfrenta desafios críticos de processos manuais, resultando em perda de dados, inconsistência no **estoque**, falta de segurança nas transações e uma experiência de **checkout** fragmentada. Não há uma plataforma unificada para gerenciar a jornada completa do cliente, desde a navegação no catálogo até a confirmação do pagamento.

### 1.2. Solução Proposta
Uma plataforma de **e-commerce** robusta e segura que gerencia o ciclo de vida completo do pedido: autenticação, navegação no catálogo, **checkout**, gestão de estoque e pagamento via PIX. O sistema prioriza a integridade dos dados, segurança de sessão e uma arquitetura preparada para evolução (migração futura para bancos relacionais e orquestração), garantindo uma experiência de compra fluida e confiável.

### 1.3. Objetivos de Negócio
- Garantir a **consistência de estoque** durante a jornada de compra.
- Implementar **autenticação e sessão seguras** (sem exposição de tokens no front-end).
- Permitir a **gestão eficiente do catálogo de produtos** e controle de inventário.
- Integrar **pagamento via PIX** com confirmação assíncrona, idempotente e **checkout otimizado**.
- Estabelecer **governança técnica** no ciclo de desenvolvimento (qualidade, CI/CD, segurança automatizada).

### 1.4. Público-Alvo
- **Clientes (Compradores):** Usuários finais que realizam cadastro, navegação, **checkout**, compra e acompanhamento de pedidos.
- **Time Técnico/Admin:** Responsáveis pela gestão do catálogo (CRUD), operação do sistema, monitoramento e manutenção da infraestrutura.

---

## 2. Escopo

### 2.1. Incluído (MVP - Marco 1)
- Cadastro, login e logout seguros de clientes.
- Gestão e listagem do **catálogo de produtos** (CRUD operado pelo time técnico).
- Área do Cliente com rotas privadas e **histórico de compras**.
- **Carrinho de compras** com cálculo de subtotal, total e gestão de itens.
- **Checkout** e criação de pedido integrado ao pagamento via PIX.
- Recuperação de senha com token seguro.
- Expiração automática de pedidos pendentes e carrinhos abandonados.

### 2.2. Evolução (Marco 2)
- Lista de desejos (Wishlist).
- Histórico de pedidos detalhado com rastreio.
- Sistema de avaliações e comentários de produtos.
- Notificações por e-mail (confirmação de pedido, envio, etc.).
- Cupons de desconto.

### 2.3. Fora do Escopo (Por enquanto)
- Outros meios de pagamento além do PIX.
- Aplicativo mobile nativo (foco em Web Responsivo).
- Programa de fidelidade.
- Integração com ERPs externos ou logística de entrega (cálculo de frete).

---

## 3. Roadmap

### Marco 1: MVP (Base Crítica)
*Dependência: Nenhum. É a fundação do sistema.*
- [ ] **TS-01:** Cadastro de Clientes
- [ ] **TS-02:** Login e Logout de Usuários
- [ ] **TS-03:** Recuperação de Senha
- [ ] **TS-11:** Gestão de Catálogo de Produtos (CRUD Técnico)
- [ ] **TS-04:** Carrinho de Compras
- [ ] **TS-06:** Pagamento via PIX (Início, Webhook, Confirmação)

### Marco 2: Evolução do Produto
*Dependência: Marco 1 estável e funcional.*
- [ ] **TS-05:** Lista de Desejos
- [ ] **TS-07:** Histórico de Pedidos
- [ ] **TS-08:** Sistema de Avaliações
- [ ] **TS-09:** Notificações por E-mail (Multieventos)
- [ ] **TS-10:** Cupom de Desconto

---

## 4. Regras de Negócio (RN)

> **Nota:** Estas regras são obrigatórias e devem ser respeitadas na implementação.

**RN01: Sessão Segura por Cookie**
Autenticação via cookie de sessão (`HttpOnly`, `Secure`, `SameSite`). Tokens não são persistidos no front-end (proibido LocalStorage para sessão). O logout deve invalidar a sessão no servidor, não apenas remover o cookie localmente.

**RN02: Hash de Senhas**
Senhas devem ser armazenadas **exclusivamente** como hash (ex: bcrypt). Nunca em texto plano.

**RN03: Controle de Acesso e API**
- Rotas privadas exigem sessão autenticada (RN01).
- A listagem de produtos é pública.
- A modificação do catálogo (CRUD) é operada **apenas** pelo time técnico via API, protegida por **chave de API dedicada** (não usa sessão de cliente).
- O acesso à API de gestão pode ser restrito por IP em ambientes de produção.

**RN04: Persistência e Concorrência**
- **MVP:** Persistência em arquivos JSON estruturados (`backend/data/`), com camada de dados isolada (Repository Pattern).
- **Futuro:** A arquitetura deve permitir migração para banco relacional sem reescrever regras de negócio.
- **Concorrência:** Escritas concorrentes (ex: dois pedidos no mesmo item) devem ser serializadas (fila de escrita ou lock de arquivo) para evitar corrupção de dados.

**RN05: Integridade do Estoque e Pagamento**
- O **estoque** é reduzido **apenas** na confirmação do pagamento PIX.
- A criação do pedido ou o início do PIX **não** bloqueia o estoque (para evitar bloqueio indevido de itens).
- O status do pedido deve transitar consistentemente: `Criado` → `Pendente (Pagamento)` → `Pago` → `Concluído`.

**RN06: Idempotência do Pagamento**
A confirmação de pagamento (webhook) deve ser idempotente. Reenvios da mesma notificação não devem reduzir estoque nem alterar o status do pedido mais de uma vez. Uso de ID único da transação para verificação.

**RN07: Expiração de Pedido**
Pedidos com PIX iniciado e não confirmado devem expirar automaticamente após um prazo definido. Ao expirar, o pedido é cancelado e o estoque (se houver bloqueio temporário) é liberado.

**RN08: Distinção entre Catálogo e Estoque**
- O **Catálogo** contém dados mestres (descrição, preço, imagem) que não devem ser alterados retroativamente em pedidos finalizados.
- O **Estoque** é uma variável dinâmica que controla a disponibilidade de compra.
- A alteração de preço no catálogo afeta apenas novos pedidos, preservando o histórico de preços nos pedidos concluídos.

---

## 5. Requisitos Funcionais (RF)

> *Nota de Documentação:* Detalhes técnicos de implementação, contratos de API e endpoints específicos estão na pasta **[docs/specs/](specs)**




### Marco 1: MVP

**RF01: Cadastro de Clientes (TS-01)**
- Validação de campos obrigatórios e formato de e-mail.
- E-mail como identificador único (não duplicado).
- Acesso imediato ao sistema após cadastro.

**RF02: Login e Logout (TS-02)**
- Autenticação com criação de sessão segura.
- Rate limiting em tentativas de login (proteção contra força bruta).
- Logout: invalidação da sessão no servidor.

**RF03: Recuperação de Senha (TS-03)**
- Geração de token temporário, seguro e de uso único.
- Token armazenado como hash no back-end.
- Entrega via e-mail com link de redefinição.
- Rate limiting nas solicitações de recuperação.

**RF04: Gestão de Catálogo (TS-11)**
- Listagem pública de produtos (GET) com paginação e filtros básicos.
- CRUD de produtos operado via API com chave de segurança (RN03).
- Validação estrita de tipos (preço numérico, estoque inteiro, descrição).
- Separação clara entre dados do **Catálogo** e controle de **Estoque**.

**RF05: Carrinho de Compras (TS-04)**
- Adicionar, remover e ajustar quantidades de itens do catálogo.
- Cálculo automático de subtotal e total.
- Vinculação do carrinho ao usuário logado ou sessão anônima (se aplicável).
- Persistência do carrinho entre sessões.

**RF06: Pagamento via PIX (TS-06)**
- Inicialização da cobrança PIX vinculada ao pedido no **checkout**.
- Validação de assinatura/token do provedor no webhook.
- Processamento idempotente da confirmação (RN06).
- Atualização de status e redução de estoque apenas na confirmação (RN05).
- Expiração automática de pedidos pendentes (RN07).

### Marco 2: Evolução

**RF07: Lista de Desejos (TS-05)**
- Adicionar/remover itens ao favorito.
- Persistência vinculada ao usuário.

**RF08: Histórico de Pedidos (TS-07)**
- Visualização de pedidos passados com status, itens e valores finais.

**RF09: Avaliações (TS-08)**
- Avaliação permitida **apenas** se o usuário tiver pedido confirmado com o item.
- Limite de uma avaliação por item adquirido.

**RF10: Notificações (TS-09)**
- Envio de e-mails transacionais para eventos do sistema (confirmação de pedido, envio, etc.).
- Falha no envio não deve corromper o estado do pedido.

**RF11: Cupons de Desconto (TS-10)**
- Aplicação de código no carrinho/checkout.
- Validação de validade, uso único e recálculo de totais.

---

## 6. Requisitos Não Funcionais (RNF)

**RNF01: Qualidade de Código e Arquitetura**
- O sistema deve ser desenvolvido com **tipagem forte** para garantir manutenibilidade e segurança.
- O back-end deve seguir princípios de arquitetura limpa (separação de responsabilidades).
- O front-end deve ser responsivo e acessível, otimizado para conversão em **e-commerce**.
- O ambiente deve ser containerizável para garantir consistência entre desenvolvimento e produção.

**RNF02: Segurança da Aplicação**
- Proteção contra vulnerabilidades comuns (XSS, CSRF, Injeção de SQL/NoSQL).
- Cookies de sessão com flags de segurança (`HttpOnly`, `Secure`, `SameSite`).
- Rate limiting em endpoints críticos (login, recuperação, API de gestão).
- **Segurança no Pipeline:** O processo de CI/CD deve incluir etapas automáticas de **Análise Estática de Segurança (SAST)** e **Análise de Composição de Software (SCA)**, bloqueando o merge se vulnerabilidades críticas forem detectadas.

**RNF03: Governança e Infraestrutura como Código (IaC)**
- **Infraestrutura como Código:** A infraestrutura do ambiente (servidores, redes, contêineres) deve ser definida como código, permitindo versionamento, revisão de mudanças e auditoria.
- **Pipeline de Qualidade:** Commits devem seguir o padrão Conventional Commits. O merge para a branch principal exige Pull Request aprovado e pipelines de CI/CD (GitHub Actions/GitLab CI) passando com sucesso (build, testes unitários, SAST).
- **Testes Dinâmicos:** O pipeline deve prever execução periódica de **Testes Dinâmicos de Segurança (DAST)** em ambientes de staging para validar a aplicação em execução.

**RNF04: Observabilidade**
- Preparação para integração com Prometheus e Grafana para métricas e monitoramento.

**RNF05: Infraestrutura Futura**
- A arquitetura deve prever migração para Kubernetes e Cloud (AWS) em fases avançadas, sem refatoração drástica do núcleo de negócio.

**RNF06: Privacidade (LGPD - Conceitual)**
- O projeto é um laboratório com dados fictícios. Em produção real, deve-se garantir coleta mínima, finalidade explícita e mecanismo de exclusão de dados.

---

## 7. Fluxos de Usuário e Interfaces Principais

O sistema deve apresentar as seguintes interfaces e comportamentos:
1.  **Autenticação:** Telas de Cadastro, Login e Recuperação de Senha.
2.  **Vitrine (Catálogo):** Página pública de produtos com busca, filtros e listagem.
3.  **Página de Produto:** Detalhes do item, preço, disponibilidade de estoque e avaliações (Marco 2).
4.  **Carrinho:** Resumo de itens, cálculo de totais e entrada para o **checkout**.
5.  **Checkout:** Fluxo de confirmação de dados, seleção de pagamento (PIX) e finalização da compra.
6.  **Área do Cliente:** Painel com histórico de pedidos, gestão de perfil e lista de desejos.
7.  **Gestão Técnica:** Interface/API para gestão de produtos e estoque (acesso restrito).

---

## 8. Critérios de Aceite

### Marco 1 (MVP)
- [ ] Cliente consegue se cadastrar, recuperar senha e fazer login/logout (sessão invalidada no servidor).
- [ ] Catálogo listável publicamente; gestão de produtos protegida por chave de API.
- [ ] Carrinho calcula totais corretamente e permite criação de pedido.
- [ ] **Checkout:** Fluxo de pagamento PIX inicia, aguarda confirmação e atualiza status corretamente.
- [ ] **Idempotência:** Reenvio de webhook não duplica estoque nem altera status.
- [ ] **Expiração:** Pedidos pendentes expiram automaticamente após o prazo.
- [ ] **Estoque:** Reduzido apenas após confirmação de pagamento (RN05).
- [ ] **Segurança:** Rate limiting bloqueia tentativas excessivas de login/recuperação.
- [ ] **Área Privada:** Acessível apenas com sessão ativa.
- [ ] **Pipeline:** O merge de código é bloqueado se falhar em testes, build ou análise de segurança (SAST/SCA).

### Marco 2 (Evolução)
- [ ] Funcionalidades de Desejos, Histórico, Avaliações, Notificações e Cupons operam conforme especificado.
- [ ] Avaliações bloqueadas para usuários sem pedido confirmado do item.
- [ ] Nenhuma regressão nas funcionalidades do Marco 1.

---

## Histórico de Versões

| Versão | Data | Autor | Descrição da Mudança |
| :--- | :--- | :--- | :--- |
| **1.0** | 03/08/2026 | Equipe TechStore | Versão inicial do PRD (MVP). Define regras de segurança, sessão, pagamento PIX, **fluxo de checkout**, distinção entre catálogo/estoque e requisitos de governança (SAST, IaC, DAST). |
| 1.1 | [Data] | Equipe TechStore | [Descrição da mudança futura, ex: Adicionado requisito de Cupom de Desconto] |
| 1.2 | [Data] | Equipe TechStore | [Descrição de ajuste futuro] |

---

*Este documento é a fonte da verdade para o comportamento do produto. A implementação técnica detalhada (stack específica, estrutura de arquivos, contratos de API) deve ser derivada deste PRD na fase de Especificação Técnica (Spec).*
