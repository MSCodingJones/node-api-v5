const con = require('../../config/dbconfig')

const daoCommon = require('../daoCommon')

const labelDao = {
    ...daoCommon,
    
    sort: (req, res)=> {
        con.query(
            `SELECT * FROM label ORDER BY label;`,
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

    //create record
    create: (req, res)=> {
        if(Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to create."
            })
        } else if (!req.body.band) {
        res.json({
            "error": true,
            "message": "Must include a label"
        })
    } else {
        const fields = Object.keys(req.body)
        const values = Object.values(req.body)
    
//Query => (sql, array, ()=>)
            con.query(
                `INSERT INTO label SET ${fields.join(' = ?, ')} = ?;`,
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
    },  

    update: (req, res)=> {
        const id = req.params.id
        if(Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.query(
            `UPDATE label SET ${fields.join(' = ?, ')} = ? WHERE label_id = ${id}`,
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
    }
}

module.exports = labelDao