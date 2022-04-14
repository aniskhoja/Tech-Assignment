import React from 'react';

const EmailInput = ({ label, placeholder, setValue, type, status, changeEvent }) => {
  
  return (
    <div className='forminput'>
      <label>{label}:</label>
      <input type={type} name={label} value={setValue} required placeholder={placeholder} disabled={status} onChange={e => changeEvent(e)} />
    </div>
  )
}

export default EmailInput