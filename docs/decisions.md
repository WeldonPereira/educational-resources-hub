# Decisões Arquiteturais (ADR)

## ADR 01: Escolha do FastAPI
**Contexto:** Necessidade de uma API rápida, moderna e com validação de tipos.
[cite_start]**Decisão:** Utilizamos o **FastAPI** devido ao suporte nativo a `async/await`, integração profunda com **Pydantic** para validação e geração automática de documentação via Swagger/OpenAPI. [cite: 4, 5]

## ADR 02: Otimização de Performance (Problema N+1)
**Contexto:** A listagem de recursos estava disparando múltiplas consultas ao banco para buscar as tags de cada item.
**Decisão:** Implementamos o `joinedload` do SQLAlchemy no `ResourceRepository`. Isso transforma N consultas em um único `JOIN` no banco de dados, reduzindo drasticamente a latência e o consumo de CPU do servidor.

## ADR 03: Estratégia de Logs e Observabilidade
**Contexto:** O desafio exige visibilidade sobre a latência da IA e o uso de recursos.
[cite_start]**Decisão:** - Implementamos um **Middleware de Logging** personalizado que captura o tempo de processamento de cada request. [cite: 5]
- [cite_start]Configuramos logs estruturados no `AIService` para registrar latência e falhas de integração com LLMs. [cite: 3]
- [cite_start]Silenciamos logs verbose do `sqlalchemy.engine` e `uvicorn.access` para manter o ambiente de produção limpo. [cite: 5]

## ADR 04: Resiliência da Integração com IA
**Contexto:** APIs de LLM podem falhar por timeout, limite de cota ou instabilidade de rede.
**Decisão:** O `AIService` foi projetado com um padrão de **Fallback**. Caso a integração real falhe, o sistema retorna um Mock pedagógico coerente. [cite_start]Isso impede que uma falha externa quebre a experiência do usuário final. [cite: 3]

## ADR 05: Segurança de Chaves de API
**Contexto:** Requisito obrigatório de não deixar segredos no código.
**Decisão:** Utilizamos `pydantic-settings` para carregar variáveis de ambiente via arquivos `.env`. [cite_start]Configuramos a classe `Settings` para ignorar campos extras, evitando erros de inicialização se o ambiente tiver variáveis não utilizadas. [cite: 4]