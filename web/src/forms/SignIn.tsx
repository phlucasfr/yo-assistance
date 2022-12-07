import logo from '../assets/logo.svg'
import { RegisterFooter } from '../components/SingIn/RegisterFooter';
import { RegisterInput } from '../components/SingIn/RegisterInput';
import { RegisterLabel } from '../components/SingIn/RegisterLabel';
import { RegisterSubmitBtn } from '../components/SingIn/RegisterSubmitBtn';
import { useState, useEffect } from 'react';
import '../styles/main.css';

export function SignIn() {

  const [hasUserClickerOnSubmit, setHasUserClickerOnSubmit] = useState(false);

  function handleSubmitClick() {
    setHasUserClickerOnSubmit(!hasUserClickerOnSubmit);
  }

  useEffect(() => {

    fetch('http://localhost:3333/listusers/',)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }, [hasUserClickerOnSubmit])

  return (

    <div className="container max-w-[100vw] max-h[100vh] mx-auto flex flex-col items-center my-20 justify-center">

      <header className="header flex flex-col items-center mb-10 ">
        <img src={logo} alt="Yoh" />
        <span className='mt-4 text-base font-medium leading-6'>Sign In</span>
      </header>

      <form className='flex items-center flex-col'>

        <div className="inputContainer flex items-start flex-col">

          <RegisterLabel title='Username' />
          <RegisterInput type='text' name='loginUsu' id='loginUsu' placeholder='nickname' autocomplete='' />

          <RegisterLabel title='E-mail' />
          <RegisterInput type='text' name='emailUsu' id='emailUsu' placeholder='youremail@mail.com' autocomplete='' />

          <RegisterLabel title='Full name' />
          <RegisterInput type='text' name='nameUsu' id='nameUsu' placeholder='Your real name here' autocomplete='' />

          <RegisterLabel title='Cell number' />
          <RegisterInput type='text' name='celnumUsu' id='celnumUsu' placeholder='47 99999-9999' autocomplete='' />

          <RegisterLabel title='Password' />
          <RegisterInput type='password' name='paswrdUsu' id='paswrdUsu' placeholder='*************' autocomplete='new-password' />

          <RegisterLabel title='Confirm you password' />
          <RegisterInput type='password' name='cfmPaswrdUsu' id='cfmPaswrdUsu' placeholder='*************' autocomplete='new-password' />

          <RegisterSubmitBtn onClick={handleSubmitClick} />
          {hasUserClickerOnSubmit ? 'Usuário clicou' : null}

          <RegisterFooter title='Already have an account?' href='' titlehref='Sign up' />

        </div>

      </form>

    </div>
  )
}



