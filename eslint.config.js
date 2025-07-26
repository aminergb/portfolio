import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

const formattingRules = {
  semi: ['error', 'never'],
  quotes: ['error', 'single'],
  indent: ['error', 2],
  'comma-dangle': ['error', 'never'],
  'space-before-function-paren': ['error', 'never'],
  'object-curly-spacing': ['error', 'always']
  ,
  'linebreak-style': ['error', 'unix'] // 👈 ajoute cette ligne
  ,
  // 👇 Line spacing rules
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: 'import', next: '*' },
    { blankLine: 'any', prev: 'import', next: 'import' },
    { blankLine: 'always', prev: '*', next: 'return' },
    { blankLine: 'always', prev: 'block-like', next: '*' }
  ],
  'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }]

}

const jsConfig = {
  files: ['**/*.js'],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    ...js.configs.recommended.rules,
    ...formattingRules
  }
}
//sets parser ! 
const tsConfig = tseslint.config([
  {
    ignores: ['dist', '**/*.min.js', 'node_modules']

  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      ...formattingRules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn'
    }
    ,
    settings: {
      react: {
        version: 'detect'
      }
    }

  }
])

export default [
  jsConfig,
  ...tsConfig
]