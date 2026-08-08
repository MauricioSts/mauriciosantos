# mauriciosts.com

Portfólio pessoal de Mauricio Santos — desenvolvedor front-end em Natal/RN.

Single-page application em React, com navegação por seções (`home`, `projetos`,
`stack`, `experiencia`, `contato`), páginas de detalhe por projeto e alternância
de idioma entre português e inglês.

## Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **React Router** para as rotas de detalhe
- **Framer Motion** e **GSAP** para animação
- **OGL** para o plano de fundo em WebGL
- Deploy na **Vercel** (`vercel.json` faz o rewrite de SPA)

## Rodando localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção em dist/
npm run preview  # serve o build
npm run lint     # ESLint
```

## Estrutura

```
public/               imagens dos projetos, servidas na raiz (/cadsol.png, ...)
src/
  main.jsx            entrada
  App.jsx             monta o LanguageProvider em volta do Site
  Site.jsx            a página inteira: dados, seções e o modal de detalhe
  index.css           estilos globais e utilitários
  contexts/
    LanguageContext.js    contexto + hook useLanguage
    LanguageProvider.jsx  o provider (separado para não quebrar o Fast Refresh)
  hooks/
    useTranslation.js     devolve o dicionário do idioma ativo
  translations/
    pt.js  en.js          todo o texto do site
```

### Como o conteúdo é organizado

`Site.jsx` não guarda texto. Os hooks de dados no topo do arquivo — `useProjects`,
`useExperiences`, `useStacks`, `useCoreStack` — juntam o que é estrutural
(id, numeração, ano, imagens, tags, link, cor de destaque) com o que é texto,
espalhado a partir de `src/translations/`.

Para adicionar um projeto:

1. Coloque a imagem em `public/`.
2. Acrescente a entrada em `useProjects()` (`src/Site.jsx`), mantendo `num` em ordem.
3. Adicione o bloco correspondente em `projects` nos **dois** arquivos de tradução,
   com a mesma chave usada no spread `...p.<chave>`.
4. Atualize o contador de projetos no hero, que é literal em dois pontos de `Site.jsx`.

Cada projeto usa `type`, `role`, `head`, `problem`, `solution` e `description`;
faltar um deles deixa buraco na página de detalhe.

## Arquivos fora do app

`Portfolio.html`, `portfolio.jsx`, `portfolio.css`, `prompt-para-IA.md` e os PNGs
numerados na raiz são de uma versão standalone anterior, carregada no navegador via
`<script type="text/babel">`. Não entram no build do Vite nem no deploy.
