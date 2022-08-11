import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../../firebase.config';
import { doc, updateDoc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import ListingItem from '../../components/ListingItem/ListingItem';
import { FaUserEdit } from 'react-icons/fa'
import styles from './Profile.module.scss'

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });


  const { name } = formData;

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

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updListings = listings.filter((listing) => listing.id !== listingId)
      setListings(updListings)
      toast.success('Successfully deleted')
    }
  }

  const onEdit = (listingId) => navigate(`/edit/${listingId}`)



  return (

    <section className={styles.profile__section}>
      <div className={styles.profile}>
        <h2>My Profile</h2>
        <button
          className='btn btn-primary'
          type='button'
          onClick={onLogout}
        >
          Logout
        </button>
      </div>


      <div className={styles.profile__details}>
        <h3>Personal Details</h3>

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
        <FaUserEdit
          className={styles.userEditIcon}
          onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}>
          {changeDetails ? 'Done' : 'Change'}
        </FaUserEdit>
        {/* <input
          type='text'
          id='email'
          className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
          disabled={!changeDetails}
          value={email}
          onChange={onChange}
        /> */}
      </form>


      <div className={styles.sellOrRent}>
        <Link to='/create-listing'>
          <h4>Sell or rent your car</h4>
        </Link>
      </div>

      {!loading && listings?.length > 0 && (
        <div>
          <h3>Your Listings</h3>
          <section className='cars'>
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}

              />
            ))}
          </section>
        </div>
      )}

    </section>
  )
}
export default Profile