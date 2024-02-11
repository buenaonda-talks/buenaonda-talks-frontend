import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:8787/graphql',
    documents: './src/**/*.gql',

    generates: {
        './src/api/graphql.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
            config: {
                avoidOptionals: true,
                maybeValue: 'T | null',
                arrayInputCoercion: false,
                scalars: {
                    Date: 'string',
                    DateTime: 'string',
                },
            },
        },
        './src/api/graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
    hooks: {
        afterAllFileWrite: 'prettier --write',
    },
};
export default config;
