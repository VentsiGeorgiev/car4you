import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FaUser, FaLock, FaEye } from 'react-icons/fa';
import styles from './SignIn.module.scss';
import OAuth from '../../components/OAuth/OAuth';


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

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Error: Incorrect Username Or Password.')
    }


  }


  return (
    <section className='sing-in'>
      <h1 className={styles.title}>Sing In</h1>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.field}>
          <FaUser />
          <input
            type="email"
            placeholder="Email"
            className='form-input'
            id="email"
            value={email}
            onChange={onChange}
            required
          /></div>
        <div className={styles.field}>

          <FaLock />
          <input
            type={showPassword ? 'text' : 'password'}
            className='form-input'
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
            required
          />
          <FaEye className={styles.link} onClick={() => setShowPassword((prev) => !prev)} />
        </div>


        <div className='forgot-password'>
          <Link className='form-link' to="/forgot-password">Forgot Password?</Link>
        </div>

        <div>
          <button className='btn btn-primary'>Sign In</button>
        </div>

        <OAuth />

        <div>
          <p>Don't have an account yet?</p>
          <Link className='form-link' to='/sign-up'>Create one.</Link>
        </div>
      </form>
    </section>
  )
}

export default SignIn