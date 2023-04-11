import { useState } from 'react';
import { checkEmail, checkPassword } from '../../features';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setUser } from '../../store/userSlice';
import { SignOut } from '../../components';
import './RegistrationPage.scss';


interface regInputValues {
  email: string;
  password: string;
  confirm: string;
  pattern: string;
  title: string;
}


export function RegistrationPage () {

  const initialValues = {email: '', password: '', confirm: '', pattern: '', title: 'Fill in all the fields.'};

  const [values, setValues] = useState<regInputValues>(initialValues);
  const { isAuth } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();


  function submitReg(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!checkEmail(values.email) || !checkPassword(values.password)) return;
    fetch(`http://${window.location.hostname}:3001/auth/register?email=${values.email}&password=${values.password}&confirm=${values.confirm}`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.alert) {
          setValues(state => ({...state, title: data.alert}));
          setTimeout(() => {
            setValues(initialValues);
          }, 3000)
        } else {
          dispatch(setUser({email: data.email, token: data.token, isAuth: true}));
          setValues(initialValues);
        }
      })
      .catch((error) => console.error(error));
  }


  return !isAuth ? (
    <form onSubmit={submitReg}>

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
        onChange={(e) => {
          setValues(state => ({...state, password: e.target.value, pattern: e.target.value}));
        }}
      />

      <input 
        type='password'
        placeholder='Confirm password'
        pattern={values.pattern}
        value={values.confirm}
        onChange={(e) => setValues(state => ({...state, confirm: e.target.value}))}
      />

      <input
        type='submit'
        value='Register'
      />

    </form>
  ) : <SignOut />
}