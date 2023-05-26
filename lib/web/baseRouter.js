'use strict'

const Router = require('express').Router

const response = require('../response')

const baseRouter = module.exports = Router()

const errors = require('../errors')

const config = require('../config')

// get index
baseRouter.get('/', response.showIndex)
// get 403 forbidden
baseRouter.get('/403', function (req, res) {
  errors.errorForbidden(res)
})
// get 404 not found
baseRouter.get('/404', function (req, res) {
  errors.errorNotFound(res)
})
// get 500 internal error
baseRouter.get('/500', function (req, res) {
  errors.errorInternalError(res)
})

baseRouter.get('/logbuch', function (req, res) {
  return res.render("logbuch.ejs")
})

baseRouter.post('/logbuch', function (req, res) {
  if (0) {
    let info = JSON.stringify(req.body,null,2)
    info += "\n"
    info += "config="+JSON.stringify(config,null,2)
    res.send("<pre>"+info+"</pre>")
    return
  }
  let user = req.body.user || ''
  let password = req.body.password || ''
  res.send(`<iframe src="${config.serverURL}/${user}${password}?create=false" width="100%" height="100%" frameborder="0"></iframe>`)
})

baseRouter.get(/^.*\$DATE.*$/, function (req, res) {
  // get current date
  let date = new Date()
  // format as YYYY-MM-DD
  let formattedDate = date.toISOString().substring(0, 10)
  // replace DATE with formatted date
  let url = req.url.replace(/\$DATE/, formattedDate)
  // redirect to new url  
  res.redirect(url)
})