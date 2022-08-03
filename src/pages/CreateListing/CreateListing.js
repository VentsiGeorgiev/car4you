import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase.config';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'


function CreateListing() {
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

  const {
    type,
    make,
    model,
    km,
    year,
    insurance,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

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
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onSubmit = async (e) => {
    e.preventDefault()
    // console.log(formData)

    setLoading(true)

    // if (discountedPrice >= regularPrice) {
    //   setLoading(false)
    //   toast.error('Discounted price needs to be less than regular price')
    //   return
    // }

    if (images.length > 6) {
      setLoading(false)
      toast.error('Max 6 images')
      return
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Images not uploaded')
      return
    })

    setLoading(false)

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    }

    formDataCopy.location = address
    delete formDataCopy.images
    delete formDataCopy.address
    !formDataCopy.offer && delete formDataCopy.discountedPrice

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
    setLoading(false)
    toast.success('Listing saved')
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
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
            className={type === 'sale' ? 'btn btnActive' : 'btn'}
            id='type'
            value='sale'
            onClick={onMutate}
          >
            Sell
          </button>
          <button
            type='button'
            className={type === 'rent' ? 'btn btnActive' : 'btn'}
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
          min='0'
          max='1000000'
        />

        <label className='formLabel'>Year</label>
        <input
          type='number'
          id='year'
          value={year}
          onChange={onMutate}
          min='1960'
          max='2022'
        />

        <div>
          <label className='formLabel'>Insurance</label>
          <button
            type='button'
            className={insurance ? 'btn btnActive' : 'btn'}
            id='insurance'
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>
          <button
            type='button'
            className={!insurance && insurance !== null ? 'btn btnActive' : 'btn'}
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
            className={offer ? 'btn btnActive' : 'btn'}
            id='offer'
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>

          <button
            type='button'
            className={!offer && offer !== null ? 'btn btnActive' : 'btn'}
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

        <button className='btn btn-primary btn-form' type='submit'>Create Listing</button>
      </form>
    </div>
  )
}

export default CreateListing