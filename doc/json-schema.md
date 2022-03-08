# JSON Schema

1. Collect all schemas in `schema` folder and assign them into hash table where its `$id` is the key and the schema object is a value. Most likely should be done with codegen.
2. Create interfaces from the schemas.
3. Create validation functions which consume schemas and return their related interface.