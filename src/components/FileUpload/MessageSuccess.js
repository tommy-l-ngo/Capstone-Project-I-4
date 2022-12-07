import React from 'react'
import PropTypes from 'prop-types'
import './Message.css'

// Bootstrap alert message for a successful file upload
const MessageSuccess = ({ msg }) => {
  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
        {msg}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
  )
}

MessageSuccess.propTypes = {
    msg: PropTypes.string.isRequired
}

export default MessageSuccess