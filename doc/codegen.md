# Codegen

Codegen module consists of two parts:
- One-off generation for templates, which are then get copied and modified somewhere else. The results of these generations do not get commited.
- Generated modules which then get exported and consumed by the codebase directly. The results of these geneations do get commited and can only be changed by changing the underlying generator.