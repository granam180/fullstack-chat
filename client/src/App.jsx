import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "@/components/chat";
import Login from "@/components/login";

function App() {
  const [user, setUser] = useState(null);
  const [secret, setSecret] = useState(null);
  const isAuth = Boolean(user) && Boolean(secret);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/*  could also use <ProtectedRoute> here as well? */}
          <Route
            path="/"
            element={
              isAuth ? (
                // logged in? Show <Chat>, chat away...
                <Navigate to="/chat" />
              ) : (
                // trying to get sneaky? nope sry, no pass...
                // redirect the user to the login page if 
                // they are not logged and set boolean defaults for user/secret
                <Login setUser={setUser} setSecret={setSecret} />
              )
            }
          />
          <Route
            path="/chat"
            element={
              // logged in? Show <Chat>, chat away...
              isAuth ? (
                <Chat user={user} secret={secret} />
              ) : (
                // trying to get sneaky? nope sry, no pass...
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
