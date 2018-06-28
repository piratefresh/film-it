import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default connect()(AppRoute);
