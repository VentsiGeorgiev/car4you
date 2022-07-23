import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaIdCardAlt } from 'react-icons/fa'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import styles from './SignUp.module.scss';


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div className={styles.container}>

      <main>
        <h1 className={styles.title}>Sing Up</h1>
        <form onSubmit={onSubmit} className={styles.form}>

          <div className={styles.field}>
            <FaIdCardAlt />
            <input
              type="text"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div className={styles.field}>
            <FaUser />
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
          </div>

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


          {/* <div className={styles.forgotPassword}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div> */}

          <div>
            <button className={styles['sign-in']}>Sign In</button>
          </div>

          <div>
            <p>Already have an account ?</p>
            <Link to='/sign-in'>Sign in.</Link>
          </div>
        </form>
      </main>

    </div>
  )
}

export default SignUp