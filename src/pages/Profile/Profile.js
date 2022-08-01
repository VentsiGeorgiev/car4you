import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../../firebase.config';
import { doc, updateDoc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import styles from './Profile.module.scss'
import ListingItem from '../../components/ListingItem/ListingItem';


function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });


  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings);
      setLoading(false);

    }
    fetchUserListings()

  }, [auth.currentUser.uid])

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

      <div>
        <Link to='/create-listing'>
          <h3>Sell or rent your car</h3>
        </Link>
      </div>

      {!loading && listings?.length > 0 && (
        <div>
          <h3>Your Listings</h3>
          <ul>
            {listings.map((listing) => (
              <ListingItem key={listing.id} listing={listing.data} />
            ))}
          </ul>
        </div>
      )}

    </main>
  )
}
export default Profile