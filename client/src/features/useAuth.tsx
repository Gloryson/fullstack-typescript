import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setUser } from "../store/userSlice";




export function useAuth () {

  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(state => state.user);

  useEffect(() => {
    if (!isAuth) {
      fetch(`http://${window.location.hostname}:3001/auth/check`, { credentials: 'include' })
        .then(response => response.json())
        .then((data) => {
          if (!data.alert) {
            dispatch(setUser({email: data.email, token: data.token, isAuth: true}));
          }
        })
        .catch((error) => console.error(error));
    }
  }, [])
}