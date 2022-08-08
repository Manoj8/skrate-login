import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authentication } from "./firebase-config";
import "./App.css";

function App() {
  const [isLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("skrate_access_token");
    if (token) setLogin(true);
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((data) => {
        console.log(data);
        localStorage.setItem("skrate_access_token", JSON.stringify(data?.user?.accessToken || ""));
        setLogin(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    localStorage.clear("skrate_access_token");
    setLogin(false);
  };

  if (isLoggedIn) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard logOut={logOut} />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login signIn={signInWithGoogle} />} />
        </Routes>
      </div>
    );
  }
}

export default App;
