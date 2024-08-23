const express = require('express')
const router = express.Router()

const dao = require('../../daos/api/artistDao')

// find all
router.get('/', (req, res)=> {
    dao.findAll(res, 'artist')
})

// sort
router.get('/sort', (req, res)=> {
    dao.sort(req, res)
})

// find by id
router.get('/:id', (req, res)=> {
    dao.findById(res, 'artist', req.params.id)
})

// post
router.post('/create', (req, res)=> {
        dao.create(req, res)
})

// update
router.patch('/update', (req, res)=> {
    dao.update(req, res)
})

module.exports = router