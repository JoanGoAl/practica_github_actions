# PRÁCTICA FINAL GITHUB ACTIONS JOAN GONZÁLEZ

## ULTIMO TEST

<hr>

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

## Linter_job

Para crear el job de linter tendremos que crear dentro de la carpeta `.gihtub/workflows` un fichero yml con el nombre de nuestro repositorio `practica_github_actions_workflow.yml` que ejecutara `linter` 

````yml
linter_job:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout lint
      uses: actions/checkout@v2
    - run: npm install
    - run: npm run lint
````

Al hacer un commit desde la rama `main` se ejecutara el workflow, al hacerlo nos dara un error en el codigo:

<img src='readme_assets/error_linter.png' />

Corregimos los errores y volvemos ha hacer el push

