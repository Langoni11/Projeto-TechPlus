const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware para processar dados de formulários
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});


// Rota para cadastro de usuários
app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send('Dados incompletos');
    }

    const sql = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
    db.run(sql, [nome, email, senha], function(err) {
        if (err) {
            console.error('Erro ao cadastrar no banco de dados:', err.message); // Detalhando o erro
            return res.status(500).send('Erro ao cadastrar');
        } else {
            console.log('Usuário cadastrado com sucesso:', { nome, email, senha });
            res.send('Cadastro realizado com sucesso!');
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
