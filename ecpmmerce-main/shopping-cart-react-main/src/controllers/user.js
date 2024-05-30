const express = require('express');
const jwt = require('jsonwebtoken'); 
const PORT=3000;
const app = express();
const secretKey = 'CoJIlFEYbcgYxYbT';


app.post('/navbar', (req, res) => {
 
  if (true) {
    const payload = { username: 'user1' }; 
    const token = jwt.await(payload, secretKey); 
    res.json({ token: token, tokenType: 'Bearer' }); 
  } else {
    res.status(401).send('not found');
  }
});


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('not found');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secretKey); 
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).send('Invalid token');
  }
};

app.get('/protected-data', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to Gomart' });
});

app.listen(3000, () => console.log('Server listening on port 3000'));