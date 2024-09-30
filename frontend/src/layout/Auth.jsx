import React from "react";

import { Switch, Route } from "react-router-dom";
import Login from "../components/login";v

const Auth = () => {
  return (
    <main>
      <section className="relative w-full h-full py-40 min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{
            backgroundImage:
              "url(" + bg + ")",
          }}
        ></div>
        <Switch>
          <Route path="/auth/login" component={Login} />
        </Switch>
        <FooterSmall absolute />
      </section>
    </main>
  );
};

export default Auth;
