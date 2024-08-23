const express = require('express')
const server = express()
const helmet = require('helmet')
const cors = require('cors')
const router = require('./app/routes/router')
const PORT = process.env.PORT || 3000

// handle security
server.use(helmet.contentSecurityPolicy({
    useDefaults:true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data:"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
}))
// server.use (helmet())
server.use(cors())

server.use(express.json())
server.use(express.urlencoded({ extended: true}))

// localhost:3000/api
server.get('/api', (req, res)=> {
    res.json({
        'All Albums': `http://localhost:${PORT}/api/album`,
        'All Artists': `http://localhost:${PORT}/api/artist`,
        'All Bands': `http://localhost:${PORT}/api/band`,
        'All Labels': `http://localhost:${PORT}/api/label`,
        'All Genres': `http://localhost:${PORT}/api/genre`
    })
})

//localhost:3000
server.use('/', router)
server.set('view engine', 'ejs')

server.listen(PORT, ()=> console.log(`PORT-O-POTTY at port ${PORT}`))