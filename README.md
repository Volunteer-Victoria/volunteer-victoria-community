# @volunteer-victoria/community

# Bootstrapping the repository

1. Ensure you have [pnpm installed](https://pnpm.io/installation)
2. Install the project `pnpm i`
3. (optional) transpile all packages `pnpm -r build`

# Running scripts

## Per package

You can run any script in any package directly

```
cd packages/common
pnpm test
```

## Running multiple

[-r flag](https://pnpm.io/cli/run#--recursive--r) runs per package
[--filter flag](https://pnpm.io/filtering) filters to a subset of packages

```
pnpm -r test
```
