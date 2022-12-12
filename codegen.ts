import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true, // for better experience with the watcher
  schema: 'http://localhost:4000/graphql',
  documents: './src/graphql/schema.graphql',
  hooks: {
    afterOneFileWrite: ['prettier --write']
  },
  generates: {
    './src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ]
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
}

export default config
