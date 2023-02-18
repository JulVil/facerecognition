import React, { useEffect, useState } from 'react';
import './Message.css';

const Message = ({ type, showMessage, responseMessage }) => {
    const [isVisible, setIsVisible] = useState(showMessage);

    useEffect(() => {
        setIsVisible(showMessage)
    }, [showMessage])

    const getTypeClass = () => {
      switch (type) {
        case "error":
          return "message-error";
        case "success":
          return "message-success";
        case "info":
          return "message-info";
        default:
          return "error";
      }
    }

  return (
    isVisible ?
    <div className='message-wrapper'>
      <div className={`${getTypeClass()}`}>
        {responseMessage}
      </div>
    </div>
    :
    null
  )
}

export default Message;