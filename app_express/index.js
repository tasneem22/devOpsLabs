// index.js

/**
 * Required External Modules
 */
const express = require('express')
/**
 * App Variables
 */
const app = express()
const port = process.env.PORT || '8080'
const FILE_PATH = './visits.json'
const fs = require('fs')
let visits = 0
const { writeFile } = require('fs')
/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
app.get('/', (req, res) => {
  const dateOb = (new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Moscow'
  }))
  if (fs.existsSync(FILE_PATH)) {
    fs.readFile(FILE_PATH, 'utf8', (err, jsonString) => {
      if (err) {
        console.log('File read failed:', err)
        return
      }
      visits = (JSON.parse(jsonString)).visits
      writeFile(FILE_PATH, JSON.stringify({ visits: (++visits) }), (err) => {
        if (err) {
          console.log('Failed to write updated data to file')
        }
      })
    })
  } else {
    console.log(visits)
    writeFile(FILE_PATH, JSON.stringify({ visits: 1 }), (err) => {
      if (err) {
        console.log('Failed to write updated data to file')
        return
      }
      console.log('Updated file successfully1')
    })
  }
  res.status(200).send(`<h1>${dateOb}</h1>`)
})

app.get('/visits', (req, res) => {
  if (fs.existsSync(FILE_PATH)) {
    fs.readFile(FILE_PATH, (err, jsonString) => {
      if (err) {
        console.log('File read failed:', err)
        return
      }
      visits = (JSON.parse(jsonString)).visits
    })
  }
  console.log(visits)
  res.status(200).send(`<h1>${visits}</h1>`)
})
/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`)
})

module.exports = app
