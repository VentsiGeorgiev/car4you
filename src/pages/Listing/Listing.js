import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { FaShareAlt } from 'react-icons/fa';

import ImageSlider from '../../components/ImageSlider/ImageSlider';
import styles from './Listing.module.scss';

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false)
      }
    }
    fetchListing();

  }, [navigate, params.listingId])

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      {listing &&
        <div className={styles.sliderContainer}>
          <ImageSlider listing={listing.imgUrls} />
        </div>
      }

      <section className={styles.details}>
        <div className={styles.details__shareIcon} onClick={
          () => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
              setShareLinkCopied(false)
            }, [2000])
          }}
        >
          <FaShareAlt />
          {shareLinkCopied && <p>Link copied!</p>}
        </div>



        <p>For {listing.type === 'rent' ? 'Rent' : 'Sale'}</p>
        <h3>{listing.make} {listing.model}</h3>
        <p>Price: {listing.offer ? listing.discountedPrice : listing.regularPrice}</p>
        {listing.offer && (
          <p>Discount: {listing.regularPrice - listing.discountedPrice}</p>
        )}
        <p>Location: {listing.location}</p>
        <ul>
          <li>km: {listing.km}</li>
          <li>insurance: {listing.insurance ? 'Yes' : 'No'}</li>
        </ul>
        {auth.currentUser?.uid !== listing.userRef && (
          <button type='button' className='btn btn-primary' >
            <Link className={styles.contactOwnerLink} to={`/contact/${listing.userRef}?listingName=${listing.make}`} >Contact owner</Link>
          </button>

        )}
      </section>
    </>
  )
}

export default Listing