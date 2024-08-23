const express = require('express');
const router = express.Router();
const PORT = process.env.PORT || 3000;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

router.use(express.static("public"));

// Individual routes
router.use('/api/album', require('./api/albumRoutes'));
router.use('/api/artist', require('./api/artistRoutes'));
router.use('/api/band', require('./api/bandRoutes'));
router.use('/api/genre', require('./api/genreRoutes'));
router.use('/api/label', require('./api/labelRoutes'));

// Home page
router.get('/home', (req, res) => {
    res.render('pages/home', {
        title: 'home',
        name: 'My Album Database'
    });
});

// Albums page
router.get('/album', (req, res) => {
    const url = `http://localhost:${PORT}/api/album`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/album', {
                title: 'Albums',
                name: 'My Albums',
                data
            });
        })
        .catch(err => {
            console.error('Error fetching albums:', err);
            res.status(500).send('Error fetching albums');
        });
});

// Sort page
router.get('/album/sort', (req, res) => {
    const url = `http://localhost:${PORT}/api/album/sort`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/album', {
                title: 'Albums',
                name: 'My Albums',
                data
            });
        })
        .catch(err => {
            console.error('Error fetching sorted albums:', err);
            res.status(500).send('Error fetching sorted albums');
        });
});

// Albums by label
router.get('/album/label/:id', (req, res) => {

    const id = req.params.id
    const url = `http://localhost:${PORT}/api/album/label/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const label = data[0]. label
            res.render('pages/label', {
                title: `${label}`,
                name: `Albums from ${data.label}`,
                data
            })
        })
})
    
//by id
router.get('/album/:id', (req, res)=> {
    const id = req.params.id
    const url= `http://localhost:${PORT}/api/album/$id}`

    fetch(url)
        .then(res => res,json())
        .then(data => {
        res.render('pages/album_single', {
            title: `${data.title}`,
            name: `${data.title}`,
            data
        })
    })
})

// Error Page
router.get('*', (req, res) => {
    if (req.url === '/favicon.ico/') {
        res.end();
    } else {
        res.status(404).send('<h1>404 Error. This page does not exist!</h1>');
    }
});

module.exports = router;

