import React, {useEffect, useState } from 'react'
import Admin from './index'
import PasswordInput from './passwordInput';

function ChangePassword(){

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [oldPasswordType, setOldPasswordType] = useState('password');
    const [newPasswordType, setNewPasswordType] = useState('password');
    const [confirmNewPasswordType, setConfirmNewPasswordType] = useState('password');
 
    function handleChange(e){
        if (e.target.name == 'old-password'){
            setOldPassword((...prev) => e.target.value);
        }
        if (e.target.name == 'new-password'){
            setNewPassword((...prev) => e.target.value);
        }
        if (e.target.name == 'confirm-new-password'){
            setConfirmNewPassword((...prev) => e.target.value);
        }
    }

    function handleClick(e){
        if (e.target.previousSibling.type === 'password'){
            setOldPasswordType('text');
        }
        else{
            setOldPasswordType('password');
        }
    }

    return (
        <div>
            <h1>Change Password</h1>
            <form >
                <label>Old Password</label>
                <input 
                    type={oldPasswordType}
                    name="old-password"
                    value={oldPassword}
                    onChange={e => handleChange(e)}
                />
                <input 
                    type="checkbox"
                    onClick={(e) => handleClick(e)}
                />Show Password
                <br></br>
                <label>New Password</label>
                <input 
                    type={newPasswordType}
                    name="new-password"
                    value={newPassword}
                    onChange={e => handleChange(e)}    
                />
                <br></br>            
                <label>Confirm New Password</label>
                <PasswordInput 
                    inputType={confirmNewPasswordType}
                    name={'confirm-new-password'}
                    value={confirmNewPassword}
                    changeFunc={e => handleChange(e)}
                    clickFunc={e => handleClick(e)}
                />
                <br></br>
                <input type="Submit" value="Save New Password" />
            </form>
        </div>
    )
}

export default ChangePassword