import { Link } from 'react-router-dom';
import './Navigation.scss';



export function Navigation () {
  return(
    <nav>
      <Link to={'/authorization'}>AUTHORIZATION</Link>
      <Link to={'/registration'}>REGISTRATION</Link>
      <Link to={'/upload-image'}>UPLOAD IMAGE</Link>
      <Link to={'#'}>SERVER</Link>
      <Link to={'#'}>BAM BA M BA</Link>
      <Link to={'#'}>LAST ELEMENT</Link>
      <Link to={'#'}>WHAT IS LOVE?</Link>
    </nav>
  )
}