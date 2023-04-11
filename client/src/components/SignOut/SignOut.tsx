import { useAppDispatch, useAppSelector } from '../../store/store';
import { setUser } from '../../store/userSlice';
import './SignOut.scss';



export function SignOut () {

  const { email } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();


  function handleSignOut() {
    fetch(`http://${window.location.hostname}:3001/auth/sign-out`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (data.alert) dispatch(setUser({email: '', token: '', isAuth: false}));
      })
      .catch((error) => console.error(error));
  }


  return(
    <section className='sign__out'>
      <h1>You are logged in as - {email} !</h1>
      <button onClick={handleSignOut}>Sign out</button>
    </section>
  )
}