import React from 'react';
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

export const LobbyGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Navigate to="/register"/>;
};

LobbyGuard.propTypes = {
  children: PropTypes.node
};