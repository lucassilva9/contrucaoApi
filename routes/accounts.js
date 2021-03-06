import express from 'express'
import { promises as fs } from 'fs'

const { readFile, writeFile } = fs
const router = express()

router.post('/', async (req, res) => {
    try {
        let account = req.body
        const data = JSON.parse(await readFile(global.fileName))

        account = { id: data.nextId++, ...account }

        data.accounts.push(account)

        await writeFile(global.fileName, JSON.stringify(data));

        res.send(account)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;
        res.send(data);
    } catch (error) {
        res.status(400).send({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const account = data.accounts
            .find(account => account.id === parseInt(req.params.id))
        res.send(account);
        req.params.id;
    } catch (error) {
        res.status(400).send({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.accounts = data.account.filter(account => account.id !== parseInt(req.params.id));

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.end();
    } catch (error) {
        res.status(400).send({ error: err.message });
    }

});

router.put('/', async (req, res) => {
    try {
        const account = req.body;
        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(a => a.id === account.id);

        data.accounts[index] = account;

        await writeFile(global.fileName, JSON.stringify(data));

        res.send(account);
    } catch (error) {
        res.status(400).send({ error: err.message });
    }
})

export default router;
