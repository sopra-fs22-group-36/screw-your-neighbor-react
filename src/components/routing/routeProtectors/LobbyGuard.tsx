import React from 'react';
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

export const LobbyGuard = props => {
    return props.children;
};

LobbyGuard.propTypes = {
  children: PropTypes.node
};