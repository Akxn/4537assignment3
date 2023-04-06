const express = require("express")
const { handleErr } = require("./errorHandler.js")
const { asyncWrapper } = require("./asyncWrapper.js")
const dotenv = require("dotenv")
dotenv.config();
const userModel = require("./userModel.js")
const { connectDB } = require("./connectDB.js")
const cors = require("cors")


const {
  PokemonBadRequest,
  PokemonDbError,
  PokemonAuthError
} = require("./errors.js")

const app1 = express()

const start = asyncWrapper(async () => {
  await connectDB({ "drop": false });


  app1.listen(process.env.authServerPORT, async (err) => {
    if (err)
      throw new PokemonDbError(err)
    else
      console.log(`Phew! Server is running on port: ${process.env.authServerPORT}`);
    const doc = await userModel.findOne({ "username": "admin" })
    if (!doc)
      userModel.create({ username: "admin", password: bcrypt.hashSync("admin", 10), role: "admin", email: "admin@admin.ca"})
  })
})
start()

app1.use(express.json())
app1.use(cors({
  exposedHeaders: ['Authorization']
}))

const bcrypt = require("bcrypt")
app1.post('/register', asyncWrapper(async (req, res) => {
  try{
    const { username, password, email } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const userWithHashedPassword = { ...req.body, password: hashedPassword }
  
    const user = await userModel.create(userWithHashedPassword)
    res.send(user)
  }catch (error){
    throw new PokemonBadRequest("Bad Request: Please provide a valid username and passwor÷d.");
  }

}))

const jwt = require("jsonwebtoken")
let refreshTokens = [] // replace with a db
app1.post('/requestNewAccessToken', asyncWrapper(async (req, res) => {
  // console.log(req.headers);
  let refreshToken1 = req.header('Authorization')
 
  if (!refreshToken1) {
    throw new PokemonAuthError("No Token: Please provide a token.")
  }
 
  console.log("--------------------");
  const refreshToken=refreshToken1.replace(/Refresh /,"");

  console.log(refreshToken);

  if (!refreshTokens.includes(refreshToken)) { // replaced a db access
    // console.log("token: ", refreshToken);
    // console.log("refreshTokens", refreshTokens);
    throw new PokemonAuthError("Invalid Token: Please provide a valid token.")
  }
  try {
    const payload = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const accessToken = jwt.sign({ user: payload.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
    res.header('Authorization', accessToken)
    res.send("All good!")
  } catch (error) {
    throw new PokemonAuthError("Invalid Token: Please provide a valid token.")
  }
}))

app1.post('/login', asyncWrapper(async (req, res) => {
  const { username, password } = req.body
  const user = await userModel.findOne({ username })
  if (!user)
    throw new PokemonAuthError("User not found")

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect)
    throw new PokemonAuthError("Password is incorrect")


  const accessToken = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
  const refreshToken = jwt.sign({ user: user }, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  let accesstoken1="Bearer "+accessToken;

  res.header('Authorization', accesstoken1)
  let Refreshvar="Refresh "+refreshToken;
//  await userModel.findOneAndUpdate({"username":username },{"token": accesstoken1 });
  await userModel.findOneAndUpdate({ "username":username }, { "token_invalid": false });
  res.json({Refresh: Refreshvar});
}))


app1.get('/logout', asyncWrapper(async (req, res) => {

  
  await userModel.updateOne({ username: 'test' }, { token_invalid: true })
  await userModel.updateOne({ username: 'admin' }, { token_invalid: true })
  res.send("Logged out")
}))

app1.use(handleErr);
module.exports = app1;