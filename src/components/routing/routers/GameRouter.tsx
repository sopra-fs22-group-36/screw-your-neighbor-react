import React from "react"
import {Navigate, Route} from "react-router-dom"
import Lobby from "../../views/Lobby"
import PropTypes from 'prop-types'

const GameRouter = (props) => {
  /**
   * We may don't need that forward push to dashboard
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route path={`${props.base}/dashboard`}>
        <Lobby/>
      </Route>
      <Route path={`${props.base}`}>
        <Navigate to={`${props.base}/dashboard`} />
      </Route>
    </div>
  );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string
}

export default GameRouter
