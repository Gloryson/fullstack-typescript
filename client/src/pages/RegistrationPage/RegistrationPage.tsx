import { useState } from 'react';
import './RegistrationPage.scss';



export function RegistrationPage () {

  const [confirmPasswordPattern, setConfirmPasswordPattern] = useState('');

  return(
    <form>

      <input 
        type='email'
        placeholder='Email'
        pattern='^[a-z0-9_-]{2,50}@[a-z0-9_-]{1,50}\.[a-z0-9_-]{1,50}$'
      />

      <input 
        type='password'
        placeholder='Password'
        pattern='^[a-zA-Z0-9_-]{8,50}'
        onChange={(e) => setConfirmPasswordPattern(() => e.target.value)}
      />

      <input 
        type='password'
        placeholder='Confirm password'
        pattern={confirmPasswordPattern}
      />

      <input
        type='submit'
        value='Register'
      />

    </form>
  )
}