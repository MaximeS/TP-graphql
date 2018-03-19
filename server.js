const express = require('express');
const expressGrashQL= require('express-graphql');
const schema= require('./schema.js')

const app = express();

app.use('/graphql',expressGrashQL({
    schema:schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('Server is running on port 4000...')
});