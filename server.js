const express =require('express')
const mysql = require('mysql2/promise')
const cors =require('cors')
const app=express()

app.use(cors())
app.use(express.json())

const db={
    host:'localhost',
    user:'root',
    password:'27586616',
    database:'agenda'
}

const createDbConnection = async () => {
    return mysql.createConnection(db);
};



app.get('/api/buscaragenda', async (req ,res)=>{
    let connection;
    try{
        connection = await createDbConnection();
        const [rows] = await connection.query('SELECT * FROM agenda ORDER BY usuario')
        await connection.end();
        res.json(rows);

    }catch (erro){
        res.status(500).json({erro:erro.message})
    }
})



app.post('/api/adicionarnovo', async (req, res) => {
    let connection;
    try {
      const { usuario, email, telefone } = req.body;
  
      connection =  await createDbConnection();
      const result = await connection.query('INSERT INTO agenda (usuario, email, telefone) VALUES (?, ?, ?)', [usuario, email, telefone]);
      await connection.end();
      res.status(201).json({ message: 'Usuário adicionado' });

    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    } 
  });




app.put('/api/atualizar/:id', async (req, res) => {

    const id = req.params.id; 
    const pessoa = req.body; 

  
    try{
        const connection = await createDbConnection();
        await connection.execute('UPDATE agenda SET usuario=?,email=?,telefone=? WHERE  id=?', [pessoa.usuario,pessoa.email,pessoa.telefone,id])
        await connection.end();
        res.status(200).json({message:'Atualizada com sucesso'})
    }catch(erro){
        res.status(500).json({erro:erro.message})
    }
});



app.delete('/api/deletar/:id', async (req, res) => {
    const  id  = req.params.id; 

    let connection;
    try {
        connection =  await createDbConnection();
        await connection.execute('DELETE FROM agenda WHERE id=?',[id])
        await connection.end();
        res.status(200).json({message:'Removida com sucesso'})
       
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } 
});






app.listen(5000,()=>{
    console.log('Servidor rodando na porta 5000')
})