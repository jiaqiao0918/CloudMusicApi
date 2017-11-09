const express = require('express')
const crypto = require('crypto')
const router = express()
const { createWebAPIRequest } = require('../util/util')

router.get('/', (req, res) => {
  const phone = req.query.phone
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const md5sum = crypto.createHash('md5')
  console.dir("md5sum: ")
  console.dir(md5sum)
  md5sum.update(req.query.password)
  const md5password = md5sum.digest('hex')
  const data = {
    phone: phone,
    password: md5password,
    rememberLogin: 'true'
  }
  console.dir("md5password: ")
  console.dir(md5password)
  console.dir("data: ")
  console.dir(data)
  console.dir("cookie: ")
  console.dir(cookie)
  createWebAPIRequest(
    'music.163.com',
    '/weapi/login/cellphone',
    'POST',
    data,
    cookie,
    (music_req, cookie) => {
      // console.log(music_req)
      res.set({
        'Set-Cookie': cookie
      })
      res.send(music_req)
    },
    err => res.status(502).send('fetch error')
  )
  console.dir("data: ")
  console.dir(data)
})

module.exports = router
