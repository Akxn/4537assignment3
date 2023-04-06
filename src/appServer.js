const mongoose = require("mongoose")
const express = require("express")
const { connectDB } = require("./connectDB.js")
const { populatePokemons } = require("./populatePokemons.js")
const { getTypes } = require("./getTypes.js")
const { handleErr } = require("./errorHandler.js")
const morgan = require("morgan")
const cors = require("cors")


const {
  PokemonBadRequest,
  PokemonBadRequestMissingID,
  PokemonBadRequestMissingAfter,
  PokemonDbError,
  PokemonNotFoundError,
  PokemonDuplicateError,
  PokemonNoSuchRouteError,
  PokemonAuthError
} = require("./errors.js")

const { asyncWrapper } = require("./asyncWrapper.js")

const dotenv = require("dotenv")
dotenv.config();



const app2 = express()
// const port = 5000
var pokeModel = null;

const start = asyncWrapper(async () => {
  // await connectDB({ "drop": false });
  // const pokeSchema = await getTypes();
  // pokeModel = await populatePokemons(pokeSchema);
  await mongoose.connect("mongodb+srv://akamizuna:Mizuna1992@cluster0.bfw2e.mongodb.net/?retryWrites=true&w=majority")
  pokeSchema = new mongoose.Schema({
    "id": {
      type: Number,
      unique: [true, "You cannot have two pokemons with the same id"]
    },
    "name": {
      "english": {
        type: String,
        required: true,
        maxLength: [20, "Name should be less than 20 characters long"]
      },
      "japanese": String,
      "chinese": String,
      "french": String
    },
    "type": [{type: String}],
    "base": {
      "HP": Number,
      "Attack": Number,
      "Defense": Number,
      'Speed Attack': Number,
      'Speed Defense': Number,
      "Speed": Number
    }
  })
  pokeModel = mongoose.model('pokemons', pokeSchema);

  app2.listen(process.env.pokeServerPORT, (err) => {
    if (err)
      throw new PokemonDbError(err)
    else
      console.log(`Phew! Server is running on port: ${process.env.pokeServerPORT}`);
  })
})
start()
app2.use(express.json())
const jwt = require("jsonwebtoken")
// const { findOne } = require("./userModel.js")
const userModel = require("./userModel.js")

// app2.use(morgan("tiny"))
app2.use(morgan(":method"))
app2.use(cors())

const authUser = asyncWrapper(async (req, res, next) => {
  // const token = req.body.appid
  const token1 = req.header('authorization')
  if (!token1) { throw new PokemonAuthError("No Authorization Header: Please provide the access token using the headers.");}
  let token=token1.replace(/Bearer /,"");
  token=token.replace(/Refresh /,"");
  if (!token) {
    // throw new PokemonAuthError("No Token: Please provide an appid query parameter.")
    throw new PokemonAuthError("No Token: Please provide the access token using the headers.")
  }
    const userWithToken = await userModel.findOne({ "username":"test1" })
    const userWithToken1 = await userModel.findOne({ "username":"admin" })
   if ( userWithToken.token_invalid && userWithToken1.token_invalid) {
     throw new PokemonAuthError("Please Login.")
   }
   
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    next()
  } catch (err) {
    throw new PokemonAuthError("Invalid Token Verification. Log in again.")
  }
})

const authAdmin = asyncWrapper(async (req, res, next) => {
  let token3 = req.header('authorization')
  let token4=token3.replace(/Bearer /,"");
  token4=token4.replace(/Refresh /,"");
  
  const payload = jwt.verify(token4, process.env.ACCESS_TOKEN_SECRET)
  if (payload?.user?.role == "admin") {
    return next()
  }
  throw new PokemonAuthError("Access denied")
})

app2.use(authUser) // Boom! All routes below this line are protected
app2.get('/api/v1/pokemons', asyncWrapper(async (req, res) => {
  if (!req.query["count"])
    req.query["count"] = 10
  if (!req.query["after"])
    req.query["after"] = 0
  // try {
  try{
    const docs = await pokeModel.find({})
    .sort({ "id": 1 })
    .skip(req.query["after"])
    .limit(req.query["count"])
  res.status(200).json(docs);
  } catch (err) {
    res.status(400).json({errMsg:errMsg});
  }
  // } catch (err) { res.json(handleErr(err)) }
}))

app2.get('/api/v1/pokemon/:id', asyncWrapper(async (req, res) => {
  // try {
    // console.log(req.query);
  const { id } = req.query
  const docs = await pokeModel.find({ "id": id })
  if (docs.length != 0) res.json(docs)
  else throw new PokemonNotFoundError()
  // } catch (err) { res.json(handleErr(err)) }
}))

app2.get('/report', (req, res) => {
  console.log("Report requested");
  res.send(`Table ${req.query.id}`)
})

app2.use(authAdmin)
app2.post('/api/v1/pokemon/', asyncWrapper(async (req, res) => {
  // try {
  // console.log(req.body);
  if (!req.body.id) throw new PokemonBadRequestMissingID()
  const poke = await pokeModel.find({ "id": req.body.id })
  if (poke.length != 0) throw new PokemonDuplicateError()
  const pokeDoc = await pokeModel.create(req.body)
  res.json({
    msg: "Added Successfully"
  })
  // } catch (err) { res.json(handleErr(err)) }
}))

app2.delete('/api/v1/pokemon', asyncWrapper(async (req, res) => {
  // try {
  const docs = await pokeModel.findOneAndRemove({ id: req.query.id })
  if (docs)
    res.json({
      msg: "Deleted Successfully"
    })
  else
    // res.json({ errMsg: "Pokemon not found" })
    throw new PokemonNotFoundError("");
  // } catch (err) { res.json(handleErr(err)) }
}))

app2.put('/api/v1/pokemon/:id', asyncWrapper(async (req, res) => {
  // try {
  const selection = { id: req.params.id }
  const update = req.body
  const options = {
    new: true,
    runValidators: true,
    overwrite: true
  }
  const doc = await pokeModel.findOneAndUpdate(selection, update, options)
  // console.log(docs);
  if (doc) {
    res.json({
      msg: "Updated Successfully",
      pokeInfo: doc
    })
  } else {
    // res.json({ msg: "Not found", })
    throw new PokemonNotFoundError("");
  }
  // } catch (err) { res.json(handleErr(err)) }
}))

app2.patch('/api/v1/pokemon/:id', asyncWrapper(async (req, res) => {
  // try {
  const selection = { id: req.params.id }
  const update = req.body
  const options = {
    new: true,
    runValidators: true
  }
  const doc = await pokeModel.findOneAndUpdate(selection, update, options)
  if (doc) {
    res.json({
      msg: "Updated Successfully",
      pokeInfo: doc
    })
  } else {
    // res.json({  msg: "Not found" })
    throw new PokemonNotFoundError("");
  }
  // } catch (err) { res.json(handleErr(err)) }
}))

app2.get("*", (req, res) => {
  res.status(404).json({errMsg: "Improper route. Check API docs plz."} )
})

app2.use(handleErr);
module.exports = app2;