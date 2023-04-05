import { Link } from 'react-router-dom';
import './Navigation.scss';



export function Navigation () {
  return(
    <nav>
      <Link to={'#'}>AUTHORIZATION</Link>
      <Link to={'#'}>LOREM IPSUM</Link>
      <Link to={'#'}>DOLOR SIT AMET</Link>
      <Link to={'#'}>SERVER</Link>
      <Link to={'#'}>BAM BA M BA</Link>
      <Link to={'#'}>LAST ELEMENT</Link>
      <Link to={'#'}>WHAT IS LOVE?</Link>
    </nav>
  )
}