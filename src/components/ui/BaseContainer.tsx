import React from "react"
import "../../styles/ui/BaseContainer.scss"
import PropTypes from "prop-types"

const BaseContainer = (props) => (
  <div {...props} className={`base-container ${props.className ?? ""}`}>
    <div className={"content"}>{props.children}</div>
  </div>
)

BaseContainer.propTypes = {
  children: PropTypes.node,
}

export default BaseContainer
