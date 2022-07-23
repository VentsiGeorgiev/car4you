import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss'

import { FaUser, FaLock, FaEye } from 'react-icons/fa'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }


  return (
    <div className={styles.container}>

      <main>
        <h1 className={styles.title}>Sing In</h1>
        <form className={styles.form}>
          <div className={styles.field}>
            <FaUser />
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            /></div>
          <div className={styles.field}>

            <FaLock />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <FaEye className={styles.link} onClick={() => setShowPassword((prev) => !prev)} />
          </div>


          <div className={styles['forgot-password']}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <div>
            <button>Sign In</button>
          </div>

          <div>
            <p>Don't have an account yet?</p>
            <Link to='/sign-up'>Create one.</Link>
          </div>
        </form>
      </main>

    </div>
  )
}

export default SignIn