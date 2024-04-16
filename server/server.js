import express from 'express';
import {envs, Client} from 'stytch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const client = new Client({
  project_id: process.env.PROJECT_ID,
  secret: process.env.SECRET_KEY,
  env: envs.test
});

const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const resp = await client.passwords.create({
      name,
      email,
      password,
      session_duration_minutes: 60
    })

    res.json({
      success: true,
      message: 'User created successfully',
      token: resp.session_token
    })
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.error_message,
      err: error
    })
  }
});

app.post('/login', async (req, res) => {
  const { id, email, password } = req.body;

  try {
    const resp = await client.passwords.authenticate({
      id,
      email,
      password,
      session_duration_minutes: 60
    })

    res.json({
      success: true,
      message: 'User logged in successfully',
      user: {
        id: resp.user_id,
        name: resp.user.name,
        email: email,
        password: password
      }
    })
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.error_message,
      err: error
    })
  }
});

app.post('/authenticate', async (req, res) => {
  const { session_token } = req.body;

  try {
    await client.sessions.authenticate({ session_token })

    res.json({
      success: true,
      message: 'Token is valid'
    })
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.error_message,
      err: error
    })
  }
});

app.post('/logout', async (req, res) => {
  const { session_token } = req.body;

  try {
    await client.sessions.revoke({ session_token })

    res.json({
      success: true,
      message: 'Successfully logged out'
    })
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.error_message,
      err: error
    })
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));