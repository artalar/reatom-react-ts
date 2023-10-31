This is a template project with boilerplate code for starting your SPA with Reatom.

Tech stack: Vite, TypeScript, React, **Reatom**.

Try it online: [codesandbox](https://codesandbox.io/p/sandbox/github/artalar/reatom-react-ts/tree/main), [stackblitz](https://githubblitz.com/artalar/reatom-react-ts), [gitpod](https://gitpod.io/#https://github.com/artalar/reatom-react-ts)


## Code organization

This is a basic recommendation which you could follow or not.

- one feature - one `model.ts` file with all logic.
- export public atoms and actions, stay internal units in a scope.
- describe your atoms as your types, simple and clean. It is good to separate atom with object with a few properties to a few atoms using [atomization](https://www.reatom.dev/recipes/atomization/).
- describe your actions, which handle main domain complexity. Separate complex task to several actions for a better debugging.
- use [hooks](https://www.reatom.dev/package/hooks/) to simplify your public interfaces and reduce coupling - instead of export init-like action, start your model on main atom connection.
- if you need to make your model reusable, just wrap all logic in a factory function and export it. Name it `reatomMyFeature` (`reatom` is a verb).
