# Grade Manager — Processo Seletivo dti digital

Sistema de gestão de notas e frequência desenvolvido como parte do processo seletivo da dti digital.

---

## Como executar

**Pré-requisitos:** Node.js 18+

```bash
# Clonar o repositório
git clone https://github.com/Guelmcf/Grade-Manager.git

# Entrar na pasta
cd Grade-Manager

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## Funcionalidades

- Cadastro de alunos com notas em 5 disciplinas (0–10) e frequência (0–100%)
- Edição e exclusão de alunos
- Persistência automática de dados no LocalStorage
- Cálculo automático da média individual de cada aluno
- Cálculo automático da média da turma por disciplina
- Identificação de alunos acima da média geral da turma
- Identificação de alunos com frequência abaixo de 75%
- Validação de todos os campos do formulário

---

##  Tecnologias

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## Demo

![dtiTestGif](https://github.com/user-attachments/assets/7eb755b6-08d9-45c7-be89-dadd01ae276d)

---

## Estrutura do projeto

```
src/
├── types/
│   └── index.ts          # Interfaces e tipos TypeScript
├── utils/
│   └── calculations.ts   # Funções puras de cálculo (sem efeitos colaterais)
├── hooks/
│   └── useStudents.ts    # Custom hook — estado e operações dos alunos
├── components/
│   ├── Header.tsx        # Cabecalho da pagina
│   ├── StudentForm.tsx   # Formulário de cadastro/edição
│   ├── StudentTable.tsx  # Tabela com todos os alunos e notas
│   ├── StatsPanel.tsx    # Médias por disciplina e média geral
│   ├── AlertPanel.tsx    # Alertas de média alta e frequência baixa
│   └── footer.tsx        # footer da pagina com link pro git hub
└── App.tsx               # Componente raiz — orquestra os demais
```

---

##  Premissas assumidas

- Os dados são persistidos localmente no navegador via LocalStorage, garantindo que não sejam perdidos ao recarregar a página.
- "Média da turma" é calculada como a média aritmética simples das notas de todos os alunos
- A comparação "acima da média" usa a média geral de todos os alunos (não por disciplina)
- Frequência é um valor percentual inserido manualmente pelo professor (não calculado por presença)
- Nomes de alunos são únicos por convenção de uso, mas não há validação de duplicidade
- O sistema é voltado para desktop, com responsividade básica para mobile

---

##  Decisões de projeto

**TypeScript com tipos explícitos**
Optei por definir interfaces claras em `types/index.ts` antes de escrever qualquer componente. Isso força um contrato de dados explícito e facilita a manutenção.

**Funções puras separadas em `utils/`**
Toda a lógica de cálculo (médias, filtros) vive em funções puras sem dependência de estado ou UI. Isso as torna previsíveis, fáceis de testar e reutilizáveis.

**Custom hook `useStudents`**
O estado e as operações sobre alunos foram extraídos para um hook dedicado, mantendo os componentes focados apenas na renderização. Isso separa responsabilidades de forma clara.

**Sem biblioteca de formulário**
Optei por validação manual para manter o código simples e demonstrar entendimento dos conceitos, sem adicionar dependências desnecessárias para um formulário de baixa complexidade.

**Sem biblioteca de estado global**
O volume de dados não justifica Redux ou Context API. O `useStudents` resolve o problema com `useState` simples e prop drilling controlado.

---

##  O que eu adicionaria com mais tempo

- [ ] Testes unitários para as funções de `utils/calculations.ts` com Vitest
- [ ] Importação de alunos via CSV
- [ ] Gráfico de desempenho por disciplina (ex: Recharts)
- [ ] Modo de edição inline na tabela
- [ ] Ordenação da tabela por nome, média ou frequência
- [ ] deploy do projeto

---

## Autor

Miguel Figueiredo — Linkedin: (https://www.linkedin.com/in/miguel-figueiredo-2523092b6?utm_source=share_via&utm_content=profile&utm_medium=member_ios) · GitHub : (https://github.com/Guelmcf)
