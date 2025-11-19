import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate } from "react-router-dom";

Amplify.configure(awsExports);

function Auth() {
  const navigate = useNavigate();
  const { user, route } = useAuthenticator((ctx) => [ctx.user, ctx.route]);

  useEffect(() => {
    if (route === "authenticated") {
      const groups =
        user?.signInUserSession?.idToken?.payload["cognito:groups"] || [];

      if (groups.includes("admin") || groups.includes("Admin")) {
        navigate("/admin");
      } else {
        navigate("/home");
        console.log("USER:", user);
        console.log("ID TOKEN:", user?.signInUserSession?.idToken?.payload);
        console.log("GROUPS:", user?.signInUserSession?.idToken?.payload["cognito:groups"]);

      }
    }
  }, [route, user, navigate]);

  return (
    <Authenticator
      signUpAttributes={["email", "phone_number", "address"]}
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                <Authenticator.SignUp.FormFields />

                {/* Address field */}
                <div className="amplify-field">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter your address"
                    required
                  />
                </div>
              </>
            );
          },
        },
      }}
    />
  );
}

export default Auth;
