import './AuthorizationPage.scss';



export function AuthorizationPage () {
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
      />

      <input
        type='submit'
        value='Sign in'
      />

    </form>
  )
}