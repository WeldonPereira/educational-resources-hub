# Arquitetura do Sistema - Hub de Recursos Educacionais

## 1. Visão Geral
O sistema utiliza uma arquitetura de camadas (Layered Architecture) para garantir a separação de responsabilidades, facilidade de manutenção e testabilidade.

## 2. Tecnologias Principais
- **Backend:** FastAPI (Python 3.12+)
- **Frontend:** React + TypeScript (Vite)
- **Banco de Dados:** MySQL
- **ORM:** SQLAlchemy 2.0 (com padrão Repository)
- **IA:** Google Gemini Pro / Flash (via Google Generative AI)

## 3. Camadas do Backend
O backend segue a seguinte estrutura de diretórios:
- [cite_start]`app/api`: Controladores e definição de rotas (Endpoids). [cite: 1]
- [cite_start]`app/services`: Lógica de negócio e integração com serviços externos (como o `AIService`). [cite: 1, 3]
- [cite_start]`app/repositories`: Abstração de acesso ao banco de dados, isolando o SQLAlchemy da lógica de negócio. [cite: 1]
- [cite_start]`app/models`: Definição das entidades do banco de dados. [cite: 1]
- [cite_start]`app/schemas`: Contratos de entrada e saída (Pydantic), garantindo a validação de dados. [cite: 1, 4]

## 4. Fluxo da Funcionalidade "Smart Assist"
1. [cite_start]O Frontend envia o Título e Tipo para `/api/v1/ai/generate-description`. [cite: 3, 5]
2. [cite_start]O `AIService` realiza o **Prompt Engineering** e consulta a API do Google Gemini. [cite: 3]
3. [cite_start]Se a API estiver indisponível ou a chave for inválida, o sistema ativa um **Fallback automático** para um Mock simulado, garantindo resiliência (Graceful Degradation). [cite: 3]
4. [cite_start]O resultado (JSON) é retornado para o Frontend para preenchimento automático do formulário. [cite: 2, 3]