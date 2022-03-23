# Multilanguage support

## Language tags

The dates are consumed as BCP-47 strings across the codebase. Any manupilations/inference with these strings can only be done through the functions provided by `#lib/language` module.

## Page language

The language of the page should be decided by server in this order:

- url path (using nextjs multilang support) if present
- account setting if registered
- cookie value (there is a nextjs cookie for that)
