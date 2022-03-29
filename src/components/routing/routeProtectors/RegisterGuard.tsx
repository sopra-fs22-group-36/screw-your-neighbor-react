import PropTypes from "prop-types"

/**
 * Another way to export directly your functional component.
 */
export const RegisterGuard = (props) => {
  return props.children
}

RegisterGuard.propTypes = {
  children: PropTypes.node,
}
