import React from 'react';

const RadioInput = ({ children, heading, clickEvent, price }) => {
    return (
        <div className='formradio'>
            <input type="radio" value={heading} name="InsurancePkg" onClick={e => clickEvent(e)}/>
            <label>
                <strong>{heading}</strong>
                {children}
                <span>{ price }</span>
            </label>
        </div>
    )
};

export default RadioInput;