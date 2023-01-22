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

<img src='readme_assets/correccion_linter.png' />

Como podemos ver a funcionado perfectamente.

<hr>

## Cypress_job

Se encargará de ejecutar los tests de cypress (link) que contiene el proyecto. Para ello, utilizaréis la action oficial del proyecto (link). Si lo deseáis, podéis ejecutar manualmente mediante el comando npm run cypress (siempre que esté arrancado el proyecto previamente). Este job, que se ejecutará después del Linter_job, estará compuesto por los siguientes steps:
 - El encargado de realizar el checkout del código
 - El encargado de ejecutar los tests de cypress que continuará aunque se produzca un error (existe una propiedad que podéis establecer para conseguir este comportamiento)
 - El encargado de crear un artefacto (result.txt) que contendrá la salida del step anterior

A continuación de `linter_job` crearemos el `cypress_job`

````yml
cypress_job:
  runs-on: ubuntu-latest
  needs: linter_job
  steps:
    - name: Checkout 
      uses: actions/checkout@v3
    - name: Cypress Run
      uses: cypress-io/github-action@v5
      with:
        config-file: cypress.json
        build: npm run build
        start: npm start
      continue-on-error: true
      id: cypressTests
    - name: Resultado en - result.txt
      run: echo ${{ steps.cypressTests.outcome }} > result.txt
    - name: Upload Artifact Result
      uses: actions/upload-artifact@v3
      with:
        name: test_result
        path: result.txt
````
