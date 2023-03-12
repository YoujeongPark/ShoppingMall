const userDatabase = require("../database");
const jwt = require("jsonwebtoken")

const login = (req, res) => {

  const { email, password } = req.body;

  const userInfo = userDatabase.filter((item) => {
    return item.email === email})[0]
  if (!userInfo) {
    res.status(403).json("Not Authorized")
  } else {
    try {

      const accessToken = jwt.sign({
        id: userInfo.id,
        username: userInfo.username,
        email: userInfo.email,
      }, process.env.ACCESS_SECRET, {
        expiresIn: '1m',
        issuer: 'About Tech',
      });

      const refreshToken = jwt.sign({
        id: userInfo.id,
        username: userInfo.username,
        email: userInfo.email,
      }, process.env.REFRECH_SECRET, {
        expiresIn: '24h',
        issuer: 'About Tech',
      })

      // token 전송
      res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
      })

      res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
      })
    
      res.status(200).json("login success");

    } catch (error) {
      res.status(500).json(error);
    }
  }
}

const accessToken = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const userData = userDatabase.filter(item => {
      return item.email === data.email;
    })[0];

    const { password, ...others } = userData;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
}

const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRECH_SECRET)
    const userData = userDatabase.filter(item => { return item.email === data.email})[0]

    const accessToken = jwt.sign({
      id: userData.id,
      username: userData.username,
      email: userData.email,
    }, process.env.ACCESS_SECRET, {
      expiresIn: '1m',
      issuer: 'About Tech',
    });

    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
    })
    res.status(200).json("Access Token Recreated");
  } catch (error) {
    res.status(500).json(error);
  }
}

const loginSuccess = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const {password, ...userData} = userDatabase.filter((item) => {return item.email === data.email})[0]
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
}

const logOut = (req, res) => {
  try {
    res.cookie('accessToken', '');
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  login,
  accessToken,
  refreshToken,
  loginSuccess,
  logOut
}