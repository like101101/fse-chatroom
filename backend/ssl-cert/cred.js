const fs = require('fs')

const key = fs.readFileSync("./ssl-cert/private.key")
const cert = fs.readFileSync("./ssl-cert/certificate.crt")

const cred = {
  key,
  cert
}

module.exports = cred
