import React, { useRef, useState } from 'react'

export default function PasswordField({name}) {
    const [showPassword, setShowPassword] = useState(false);
    const passwordField = useRef();
    const showHide = useRef();

    const togglePassword = () => {
        if(showPassword) {
            passwordField.current.type = 'password';
            showHide.current.textContent = 'show';
        }
        else {
            passwordField.current.type = 'text';
            showHide.current.textContent = 'hide';
        }

        setShowPassword(!showPassword);
    }

    return (
        <div className='password-field'>
            <input className='password-text-field' type='password' name={name} placeholder='password' id={name} ref={(el) => {passwordField.current = el}}/>
            <p className='show-password' onClick={togglePassword} ref={(el) => {showHide.current = el}}>show</p>
        </div>
    )
}
