import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CircularLoading from "./components/CircularLoading";
import { useAuth } from "./hooks/Auth";

function matchUser(permit, usertype) {
  let permitions = permit ? permit.split(",") : [];
  let permitted = false;
  for (let i = 0; i < permitions.length; i++) {
    permitted = usertype === permitions[i] ? true : false;
    if (permitted) break;
  }
  return permitted;
}

function ProtectedRoute({ permit, children }) {
  const { user } = useAuth();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [usertype, setUserType] = useState(null);
  useEffect(() => {
    if (user) {
      if (user.is_farmer) {
        setUserType("farmer");
      } else {
        setUserType("customer");
      }
      setCheckedAuth(true);
    }
  }, [user]);

  return checkedAuth ? (
    user ? (
      matchUser(permit, usertype) ? (
        <>{children}</>
      ) : (
        <Navigate to="/login" />
      )
    ) : (
      <Navigate to="/login" />
    )
  ) : (
    <CircularLoading />
  );
}

export default ProtectedRoute;
