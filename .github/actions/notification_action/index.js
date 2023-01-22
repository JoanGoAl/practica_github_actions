const core = require('@actions/core')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: core.getInput('email_from'),
        pass: core.getInput('email_password')
    }
})

let mailToOptions = {
    from: core.getInput("email_from"),
    to: core.getInput('email_to'),
    subject: "Resultado del workflow ejecutado",
    html: `
    <p>
    Se ha realizado un push en la rama main que ha provocado la ejecución del workflow practica_github_actions_workflow de Joan González Albert de 2DAW con los siguientes resultados: 
    </p>
    <ul>
        <li>linter_job: ${core.getInput('result_linter')}</li>
    </ul>
    <ul>
        <li>cypress_job: ${core.getInput('result_cypress')}</li>
    </ul>
    <ul>
        <li>add_badge_job: ${core.getInput('result_badge')}</li>
    </ul>
    <ul>
        <li>deploy_job: ${core.getInput('result_deploy')}</li>
    </ul>
    `
}

transporter.sendMail(mailToOptions, (e) => {
    if (e != null) {
      throw err;
    }
    process.exit(0)
})