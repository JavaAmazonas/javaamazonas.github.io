# Migração para Tailwind CSS v4

O PR do Dependabot que bumpa `tailwindcss` de `3.4.1` para `4.3.3` **não pode ser mergeado direto** — testado localmente e o build quebra:

```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS
with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS
configuration.
```

Isso é esperado: no v4 o pacote `tailwindcss` deixou de funcionar como plugin do PostCSS. É uma migração, não um bump de versão. Este documento é o roteiro pra fazer isso com calma, fora do fluxo automático do Dependabot.

## O que muda no v4 (relevante pra este projeto)

- **PostCSS**: o plugin agora é `@tailwindcss/postcss`, um pacote separado.
- **`autoprefixer`**: não é mais necessário — o v4 já faz vendor prefixing sozinho. Dá pra remover do `package.json` depois da migração.
- **CSS de entrada** (`src/styles.css`): troca `@tailwind base; @tailwind components; @tailwind utilities;` por `@import "tailwindcss";`. `@apply` continua funcionando igual.
- **`tailwind.config.js`**: não é mais auto-detectado. Pra manter o arquivo atual funcionando (inclui `darkMode: "class"`, usado em várias telas via classes `dark:`), é preciso referenciá-lo explicitamente no CSS com `@config`.
- **Suporte de navegador**: v4 exige Safari 16.4+, Chrome 111+, Firefox 128+ (usa `@property` e `color-mix()`). Não deve ser um problema pro público do site, mas vale checar analytics antes de migrar.
- **Angular + esbuild**: o builder do Angular CLI não faz a troca de plugin sozinho — precisa de um `.postcssrc.json` explícito na raiz apontando pro `@tailwindcss/postcss`.

## Passo a passo manual

1. Trocar a dependência e instalar o plugin novo:
   ```bash
   npm install tailwindcss@^4 @tailwindcss/postcss
   npm uninstall autoprefixer
   ```
2. Criar `.postcssrc.json` na raiz do projeto:
   ```json
   {
     "plugins": {
       "@tailwindcss/postcss": {}
     }
   }
   ```
3. Em `src/styles.css`, trocar:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
   por:
   ```css
   @config "../tailwind.config.js";
   @import "tailwindcss";
   ```
   (o `@config` é só uma ponte pra não perder o `darkMode: "class"` e o `content` globbing que já existem em `tailwind.config.js`; migrar de vez pro formato CSS-first — `@theme`, `@custom-variant dark` — pode ficar pra uma segunda etapa, sem pressa.)
4. Rodar `npm run build -- --configuration production` e `npm test` e comparar visualmente o site (claro e escuro) antes de abrir o PR.
5. Alternativa mais rápida: rodar `npx @tailwindcss/upgrade`, que automatiza boa parte disso — só revisar o diff gerado antes de confiar.

## Quando fazer isso

Sem urgência — a v3.4.1 atual segue funcionando e recebendo patches normalmente. Fazer essa migração numa branch dedicada (`feat/tailwind-v4`), testar build + visual, e só então fechar o PR do Dependabot como superado por ela.
