import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';

function Contact() {
  const [message, setMessage] = useState('');
  const [owner, setOwner] = useState('');
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams({});

  const params = useParams()

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, 'users', params.ownerId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setOwner(docSnap.data())
      } else {
        toast.error('Could not get landlord data')
      }
    }

    getOwner()
  }, [params.ownerId])

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div className='container'>
      <h2>Contact Owner</h2>
      {owner !== null && (
        <>
          <div>
            <h3>{owner?.name}</h3>
          </div>
          <form>
            <label htmlFor='message' className='formLabel'>
              Message
            </label>
            <textarea
              name='message'
              id='message'
              value={message}
              onChange={onChange}
            >
            </textarea>
            <button type='button'>
              <a href={`mailto:${owner.email}?Subject=${searchParams.get('listingName')}&body=${message}`} >Send Message</a>
            </button>

          </form>
        </>

      )}
    </div>
  )
}

export default Contact