const sgmail = require('@sendgrid/mail')

sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'gsinghs1998@gmail.com',
        subject: 'Thank you for joining',
        text: `Hi ${name}, contact me for any issue or improvements`
    })
}

const goodbyeEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'gsinghs1998@gmail.com',
        subject: `Goodbye ${name}`,
        text: `Hi ${name}, please let us know why you decided to leave us. We hope you will join us again in the future`
    })
}

module.exports = {
    sendWelcomeEmail,
    goodbyeEmail
}