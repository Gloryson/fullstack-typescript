import { useState } from 'react';
import { checkEmail, checkPassword } from '../../features';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setUser } from '../../store/userSlice';
import { SignOut } from '../../components';
import './AuthorizationPage.scss';


interface authInputValues {
  email: string;
  password: string;
  title: string;
}


export function AuthorizationPage () {

  const initialValues = {email: '', password: '', title: 'Enter email and password.'};

  const [values, setValues] = useState<authInputValues>(initialValues);
  const { isAuth } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();


  function submitAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!checkEmail(values.email) || !checkPassword(values.password)) return;
    fetch(`http://${window.location.hostname}:3001/auth/login?email=${values.email}&password=${values.password}`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.alert) {
          setValues(state => ({...state, title: data.alert}));
          setTimeout(() => {
            setValues(initialValues);
          }, 2000)
        } else {
          dispatch(setUser({email: data.email, token: data.token, isAuth: true}));
          setValues(initialValues);
        }
      })
      .catch((error) => console.error(error));
  }


  return !isAuth ? (
    <form onSubmit={submitAuth}>

      <h2>{values.title}</h2>

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
  ) : <SignOut />
}