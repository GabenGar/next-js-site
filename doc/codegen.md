# Codegen

Codegen module consists of two parts:
- One-off generation for templates, which are then get copied and modified manually somewhere else. The results of these generations do not get commited.
- Generated modules which then get exported and consumed by the codebase directly. The results of these geneations do get commited and can only be changed by changing the underlying generator.

## Generated modules
Each generated module is a folder which consist of 3 files:
- `generator`

    A file which only has a single default export - a function with no arguments which returns a string - the generated code.

- `result`

    A file to which the generated code is written to. Only named exports are allowed in generated code.

- `_index`

    A file which reexports all exports from `result`. Outside code is only allowed to import from indexes.