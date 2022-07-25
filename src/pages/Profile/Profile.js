import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import styles from './Profile.module.scss'


function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update name
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  return (

    <main className="container">
      <div className={styles.wrapper}>
        <div className={styles['wrapper__profile']}>
          <h2 className={styles['wrapper__profile__title']}>My Profile</h2>
          <button
            className={styles['btn-logout']}
            type='button'
            onClick={onLogout}
          >
            Logout
          </button>
        </div>


        <div className={styles['wrapper__details']}>
          <p >Personal Details</p>
          <p className={styles['wrapper__details__change']} onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}>
            {changeDetails ? 'Done' : 'Change'}
          </p>
        </div>
        <form>
          <input
            type='text'
            id='name'
            className={!changeDetails ? 'profileName' : 'profileNameActive'}
            disabled={!changeDetails}
            value={name}
            onChange={onChange}
          />
          <input
            type='text'
            id='email'
            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
            disabled={!changeDetails}
            value={email}
            onChange={onChange}
          />
        </form>
      </div>

    </main>
  )
}
export default Profile