import logo from '../assets/logo.svg'
import { RegisterFooter } from '../components/SingIn/RegisterFooter';
import { RegisterInput } from '../components/SingIn/RegisterInput';
import { RegisterLabel } from '../components/SingIn/RegisterLabel';
import { RegisterSubmitBtn } from '../components/SingIn/RegisterSubmitBtn';
import { useState } from 'react';


import '../styles/main.css';

export function SignIn() {

  const [hasUserClickerOnSubmit, setHasUserClickerOnSubmit] = useState(false);

  function handleSubmitClick() {
    setHasUserClickerOnSubmit(true);
  }

  return (

    <div className="container max-w-[100vw] max-h[100vh] mx-auto flex flex-col items-center my-20 justify-center">

      <header className="header flex flex-col items-center mb-10 ">
        <img src={logo} alt="Yohanna" />
        <span className='mt-4 text-base font-medium leading-6'>Sign In</span>
      </header>

      <form className='flex items-center flex-col'>

        <div className="inputContainer flex items-start flex-col">

          <RegisterLabel title='Username' />
          <RegisterInput type='text' name='loginUsu' id='loginUsu' placeholder='nickname' />

          <RegisterLabel title='E-mail' />
          <RegisterInput type='text' name='emailUsu' id='emailUsu' placeholder='youremail@mail.com' />

          <RegisterLabel title='Full name' />
          <RegisterInput type='text' name='nameUsu' id='nameUsu' placeholder='Your real name here' />

          <RegisterLabel title='Cell number' />
          <RegisterInput type='text' name='celnumUsu' id='celnumUsu' placeholder='47 99999-9999' />

          <RegisterLabel title='Password' />
          <RegisterInput type='password' name='paswrdUsu' id='paswrdUsu' placeholder='**************' />

          <RegisterLabel title='Confirm you password' />
          <RegisterInput type='password' name='cfmPaswrdUsu' id='cfmPaswrdUsu' placeholder='**************' />

          <RegisterSubmitBtn onClick={handleSubmitClick} />

          {hasUserClickerOnSubmit ? 'Usuário clicou' : null}

          <RegisterFooter title='Already have an account?' href='' titlehref='Sign up' />

        </div>

      </form>

    </div>
  )
}



