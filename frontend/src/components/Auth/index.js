import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import './index.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Index() {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createUser = async (user) => {
    try {
      await axios.post('/api/users/create', {
        uid: user.uid,
        bio: "No current bio",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleSignInGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider).then((res) => {
      const user = res.user;
      createUser(user);
      setLoading(false);
      navigate("/");
    }).catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email === "" || password === "" || username === "") {
      setError('Required field/s are missing');
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password).then((res) => {
        setLoading(false);
        navigate("/");
      }).catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email === "" || password === "") {
      setError('Required field/s are missing');
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password).then((res) => {
        setLoading(false);
        navigate("/");
      }).catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    }
  };

  return (
    <div className="auth">
      <div className="glassmorphic-container">
        <img src="/uploads/Zcoder-logo.png" alt="Project Logo" className="logo" />
        <p className="tagline">Code Smart. Build Fast. Deploy Big.</p>

        <div className="sign-options">
          <div className="single-option" onClick={handleSignInGoogle} disabled={loading}>
            <GoogleIcon className="google-icon" />
            <p>{loading ? "Loading..." : "Login with Google"}</p>
          </div>

          <form className="auth-form" onSubmit={register ? handleRegister : handleSignIn}>
            {register && (
              <div className="input-field">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
            )}
            <div className="input-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (register ? "Saving Info..." : "Signing In...") : register ? "Register" : "Login"}
            </button>
          </form>

          <p className="toggle-register" onClick={() => setRegister(!register)}>
            {register ? "Already have an account? Login" : "Don't have an account? Register"}
          </p>

          {error && <p className="error-msg">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Index;