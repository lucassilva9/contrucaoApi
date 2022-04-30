import express from 'express'
import accountsRouter from './routes/accounts.js'
import { promises as fs } from 'fs'

global.fileName = 'accounts.json';

const { readFile, writeFile } = fs

const app = express();
app.use(express.json());

app.use('/account', accountsRouter)

app.listen(8000, async () => {
    try {
        await readFile(global.fileName)
        console.log('Conectado...')
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }
        writeFile(global.fileName, JSON.stringify(initialJson))
            .then(() => {
                console.log('Conectado AND File  Created')
            })
            .catch(err => {
                console.log(err)
            })
    }
})
