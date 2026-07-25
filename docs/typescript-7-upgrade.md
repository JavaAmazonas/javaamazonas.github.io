# Atualização para TypeScript 7

O PR do Dependabot que bumpa `typescript` de `6.0.3` para `7.0.2` **não dá pra mergear, e ao contrário do Tailwind v4, não tem um passo a passo pra "fazer funcionar" hoje** — é um bloqueio real, fora do nosso controle.

## Por que não dá

Testado localmente: o `npm ci` nem completa.

```
npm error Conflicting peer dependency: typescript@6.0.3
npm error   peer typescript@">=6.0 <6.1" from @angular-devkit/build-angular@22.0.8
```

Isso não é frescura de peer dependency: **o TypeScript 7.0 é a reescrita nativa do compilador (o "tsgo", em Go) e ele é lançado sem API programática** (`ts.Program`, `LanguageService`, etc.). Toda ferramenta que depende dessa API pra compilar — incluindo o `@angular/compiler-cli`, que é o que o Angular CLI usa por baixo dos panos — simplesmente não roda em cima do TS 7 ainda. A própria equipe do TypeScript admite isso e promete a API de volta só na versão **7.1** (via um pacote de compatibilidade, `@typescript/typescript6`, pra rodar 6.x e 7.x lado a lado nesse meio tempo).

Do lado do Angular: existe um pedido aberto pra alargar o range de `typescript` no Angular 22 pra aceitar o 7.x ([angular/angular#69704](https://github.com/angular/angular/issues/69704)) — foi **fechado como "not planned"** pelos mantenedores. Ou seja, nem o Angular 22 nem nenhuma versão anterior suporta TypeScript 7 hoje, e não há um Angular mais novo esperando só isso ser destravado.

## O que faria isso desbloquear

Duas coisas precisam acontecer, nessa ordem, e nenhuma está sob nosso controle:
1. TypeScript 7.1 (ou posterior) expor de volta uma API programática estável.
2. O `@angular/compiler-cli`/`@angular-devkit/build-angular` adotar essa API e alargar o peer dependency de `typescript` pra incluir a 7.x.

Não tem workaround seguro pra forçar isso agora (`--legacy-peer-deps`/`--force` só engana o `npm install` — o build ia quebrar de verdade na hora de compilar, já que o compiler-cli literalmente não consegue chamar uma API que não existe no TS 7.0).

## O que fazer com o PR e com o Dependabot

- Fechar o PR do Dependabot (#24) por enquanto — não é algo pra deixar "aberto esperando", porque não depende de nós.
- Adicionar `typescript` ao `ignore` de majors no `.github/dependabot.yml` (igual já existe pra `@angular/*`), pra parar de reabrir esse mesmo PR toda semana sem necessidade.
- Revisitar quando o Angular lançar uma versão nova com suporte a TypeScript 7.x nas release notes — nesse momento também vale reavaliar a versão do Angular do projeto, já que provavelmente virá junto de um major novo do Angular.
