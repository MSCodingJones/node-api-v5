const con = require('../../config/dbconfig')

const daoCommon = require('../daoCommon')

const artistDao = {
    ...daoCommon,
    
    artistAlbums: (req, res)=> {
        const id =req.params.id
        con.query(
            `SELECT al.title, ar.fName, ar.lName, ar.alias
            FROM album AL
            JOIN artist ar USING (artist_id)
            WHERE al.artist_id = ${id};`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO ERROR:', error)
                }
            }
        )
    },

    sort: (req, res)=> {
        con.query(
            `SELECT * FROM artist ORDER BY lName;`,
            (error, rows)=> {
                if(!error) {
                    if (rows.length == 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    }   console.log('DAO ERROR: ${table}', error)
            }
        )
    },

    // create record
    create: (req, res)=> {
        if (Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to create."
            })
        } else if (!req.body.lName) {
        res.json({
            "error": true,
            "message": "Must include a last name"
        })
    } else {
        const fields = Object.keys(req.body)
        const values = Object.values(req.body)
    }
//Query => (sql, array, ()=>)
            con.query(
                `INSERT INTO artist SET ${fields.join(' = ?, ')} = ?;`,
                values,
                (error, dbres)=> {
                    if(!error) {
                        res.json({ Last_id: dbres.insertId})
                    } else {
                        console.log('DAO ERROR', error)
                        res.send('Error creating record')
                    }
                }
            )
        }
    }   

update: (req, res)=> {}

const albumDao = {
    findAll: (req, res)=> {
        con.query(
            `SELECT al.artist_id, al.title,
            CASE
                WHEN ar. fName IS NULL THEN ''
                ELSE ar.fName
                END fName,
            CASE
                WHEN ar.lName IS NULL THEN ''
                ELSE ar.lName
                END lName,
            CASE
                WHEN ar.alias IS NULL THEN ''
                ELSE ar.alias
                END alias,
            CASE
                WHEN b.band IS NULL THEN ''
                ELSE b.band
                END band,
            al.album_cover,
            al.yr_released,
            l.label
            FROM album al
            LEFT OUTER JOIN artist ar USING (artist_id)
            LEFT OUTER JOIN band b USING (band_id)
            JOIN label l USING (label_id);`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {    
                        console.log(`DAO ERROR: ALBUM`, error)
                }
             }
        )
    },

    findById: (req, res)=> {
        con.query(
            `SELECT al.album_id, al.title,
            CASE
                WHEN ar. fName IS NULL THEN ''
                ELSE ar.fName
                END fName,
            CASE
                WHEN ar.lName IS NULL THEN ''
                ELSE ar.lName
                END lName,
            CASE
                WHEN ar.alias IS NULL THEN ''
                ELSE ar.alias
                END alias,
            CASE
                WHEN b.band IS NULL THEN ''
                ELSE b.band
                END band,
            al.album_cover,
            al.yr_released,
            l.label
            FROM album al
            LEFT OUTER JOIN artist ar USING (artist_id)
            LEFT OUTER JOIN band b USING (band_id)
            JOIN label l USING (label_id)
            WHERE al.album_id = ${id};`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {    
                        console.log(`DAO ERROR: ALBUM`, error)
                }
            }
        )
    },

    update: (req, res)=> {

        const id = req.params.id
        if(Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else{
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.query(
            `UPDATE album SET ${fields.join(' = ?, ')} = ? WHERE album_id = ${id}`,
            values,
            (error, dbres)=> {
                if (!error) {
                    res.json({Last_id: dbres.insertId})
                } else {
                    console.log('DAO ERROR', error)
                        res.send('Error updating record')
                    }
                }
            )
        }
    },


    sort: (req, res)=> {
        con.query(
            `SELECT al.album_id, al.title,
            CASE
            WHEN ar. fName IS NULL THEN ''
            ELSE ar.fName
            END fName,
            CASE
            WHEN ar.lName IS NULL THEN ''
            ELSE ar.lName
            END lName,
            CASE
            WHEN ar.alias IS NULL THEN ''
            ELSE ar.alias
            END alias,
            CASE
            WHEN b.band IS NULL THEN ''
            ELSE b.band
            END band,
            al.album_cover,
            al.yr_released,
            l.label
            FROM album al
            LEFT OUTER JOIN artist ar USING (artist_id)
            LEFT OUTER JOIN band b USING (band_id)
            JOIN label l USING (label_id)
            ORDER BY al.title;`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {    
                    console.log(`DAO ERROR: ALBUM`, error)
                }
            }
        )
    }
}
        
module.exports = artistDao