import React from "react";
import { Auth } from "../auth/components";
import Layout from "../layout/Layout";

const AuthLayout: React.FC = () => {
  return (
    <Auth>
      <Layout />
    </Auth>
  );
};

export default AuthLayout;
