const core = require("@actions/core")
const fs = require("fs")

const info = core.getInput("result")

const success = "https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg"
const failure = "https://img.shields.io/badge/test-failure-red"

let result = info == 'success' ? success : failure

let readme = "./README.md"

fs.readFile(readme, "utf8", (err, data) => {

    if (err) throw err;

    if (data.indexOf(`(${success})`) != -1) {
        data = data.replace(`(${success})`, `(${result})`)
    }

    if (data.indexOf(`(${failure})`) != -1) {
        data = data.replace(`(${failure})`, `(${result})`)
    }

    fs.writeFile(readme, data, (err) => {
        if (err) throw err;

        process.exit(0)
    })

})