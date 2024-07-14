const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const cors=require('cors')
const MongoClient=require('mongodb').MongoClient

const app=express()
const port=3000

app.use(cors())
app.use(bodyParser.json())

const mongoUrl='mongodb://localhost:27017/registerDB'

app.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log('Login attempt:',{email})
        const client=await MongoClient.connect(mongoUrl)
        const db=client.db()
        const users=db.collection('users')
        const user=await users.findOne({email})
        if(!user){
            console.log('User not found:',email)
            return res.status(401).json({message:'user is not found'})
            
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            console.log('incorrect password for user',email)
            return res.status(401).json({message:'password is not found'})
        }
        console.log('Login success for user:',email)
        res.status(200).json({message:'login success'})
    } catch (error) {
        console.log('Login error:',error)
        res.status(500).json({message:'internal server error'})
    }
})
app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    const client=await MongoClient.connect(mongoUrl)
    const db=client.db()
    const users=db.collection('users')
    const existingUser=await users.findOne({email})
    if(existingUser){
        res.status(409).json({message:'Username already exist'})
        return
    }else{
        try {
            const hashedPassword=await bcrypt.hash(password,10)
            await users.insertOne({username,email,password:hashedPassword})
            res.status(200).json({message:'User created'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Internal server error'})
        }
    }
    
})
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port} `)
})