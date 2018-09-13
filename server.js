const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

module.exports = function () {
   return app.listen(PORT, () => {
        console.log(`Server Listening Port ${PORT}`)

    })
}