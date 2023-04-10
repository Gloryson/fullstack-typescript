import { useState } from 'react';
import { checkEmail, checkPassword } from '../../features';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setUser } from '../../store/userSlice';
import './AuthorizationPage.scss';


interface authInputValues {
  email: string;
  password: string;
}


export function AuthorizationPage () {

  const [values, setValues] = useState<authInputValues>({email: '', password: ''});
  const { isAuth } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();


  function submitAuth(event: React.FormEvent<HTMLFormElement>) {
    if (!checkEmail(values.email) || !checkPassword(values.password)) return;
    event.preventDefault();
    fetch(`http://${window.location.hostname}:3001/auth/login?email=${values.email}&password=${values.password}`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.alert) {
          setValues({email: data.alert, password: data.alert});
          setTimeout(() => {
            setValues({email: '', password: ''});
          }, 1000)
        } else {
          dispatch(setUser({email: data.email, token: data.token, isAuth: true}));
        }
      })
      .catch((error) => console.error(error));
  }


  return !isAuth ? (
    <form onSubmit={submitAuth}>

      <input 
        type='email'
        placeholder='Email'
        pattern='^[a-z0-9_-]{2,50}@[a-z0-9_-]{1,50}\.[a-z0-9_-]{1,50}$'
        value={values.email}
        onChange={(e) => setValues(state => ({...state, email: e.target.value}))}
      />

      <input 
        type='password'
        placeholder='Password'
        pattern='^[a-zA-Z0-9_-]{8,50}$'
        value={values.password}
        onChange={(e) => setValues(state => ({...state, password: e.target.value}))}
      />

      <input
        type='submit'
        value='Sign in'
      />

    </form>
  ) : <h1 className='is__auth__message'>You are already authorized!</h1>
}