import PropTypes from "prop-types"

export const LobbyGuard = (props) => {
  return props.children
}

LobbyGuard.propTypes = {
  children: PropTypes.node,
}
