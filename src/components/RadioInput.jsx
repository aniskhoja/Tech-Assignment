import React from 'react';

const RadioInput = ({ children, heading, clickEvent, price }) => {
    return (
        <label>
            <div className='formradio'>
                <input type="radio" value={heading} name="InsurancePkg" onClick={e => clickEvent(e)} />
                <h3>{heading}</h3>
                <p>{children}</p>
                <span>Price: {price}</span>
            </div>
        </label>
    )
};

export default RadioInput;