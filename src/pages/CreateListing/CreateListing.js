import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function CreateListing() {
  // const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'rent',
    make: '',
    model: '',
    km: 0,
    year: 0,
    insurance: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
  })

  const { type, make, model, km, year, insurance, address, offer, regularPrice, discountedPrice, images } = formData

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate('/sign-in')
        }
      })
    }

    return () => {
      isMounted.current = false;
    }
  }, [isMounted])

  const onSubmit = (e) => {
    e.preventDefault()

    console.log(formData);
  }

  const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <div className='container'>
      <h2>Create a listing</h2>

      <form onSubmit={onSubmit}>

        <label className='formLabel'>Sell / Rent</label>
        <div>
          <button
            type='button'
            className={type === 'sale' ? 'btnActive' : ''}
            id='type'
            value='sale'
            onClick={onMutate}
          >
            Sell
          </button>
          <button
            type='button'
            className={type === 'rent' ? 'btnActive' : ''}
            id='type'
            value='rent'
            onClick={onMutate}
          >
            Rent
          </button>
        </div>


        <label className='formLabel'>Make</label>
        <input
          type='text'
          id='make'
          value={make}
          onChange={onMutate}
        />


        <label className='formLabel'>Model</label>
        <input
          type='text'
          id='model'
          value={model}
          onChange={onMutate}
        />

        <label className='formLabel'>km</label>
        <input
          type='number'
          id='km'
          value={km}
          onChange={onMutate}
        />

        <label className='formLabel'>Year</label>
        <input
          type='number'
          id='year'
          value={year}
          onChange={onMutate}
        />

        <div>
          <label className='formLabel'>Insurance</label>
          <button
            type='button'
            className={insurance ? 'btnActive' : ''}
            id='insurance'
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>
          <button
            type='button'
            className={!insurance && insurance !== null ? 'btnActive' : ''}
            id='insurance'
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div>

        <label className='formLabel'>Address</label>
        <textarea
          type='text'
          id='address'
          value={address}
          onChange={onMutate}
        />

        <label className='formLabel'>Offer</label>
        <div>
          <button
            type='button'
            className={offer ? 'btnActive' : ''}
            id='offer'
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>

          <button
            type='button'
            className={!offer && offer !== null ? 'btnActive' : ''}
            id='offer'
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div>

        <label className='formLabel'>Regular Price</label>
        <input
          type='number'
          id='regularPrice'
          value={regularPrice}
          onChange={onMutate}
        />

        {offer && (
          <>
            <label className='formLabel'>Discounted Price</label>
            <input
              type='number'
              id='discountedPrice'
              value={discountedPrice}
              onChange={onMutate}
            />
          </>
        )}

        <label className='formLabel'>Images (max 6)</label>
        <input
          type='file'
          id='images'
          onChange={onMutate}
          max='6'
          accept='.jpg,.png,.jpeg'
          multiple
        />

        <button type='submit'>Create Listing</button>
      </form>
    </div>
  )
}

export default CreateListing