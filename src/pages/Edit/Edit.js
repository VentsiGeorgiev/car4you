import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore'


function Edit() {
  const [loading, setLoading] = useState(false)
  const [listing, setListing] = useState(false)
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
  const params = useParams()
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

  // Fetching listing to edit
  useEffect(() => {
    setLoading(true)
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListing(docSnap.data())

        setFormData({
          ...docSnap.data(), address: docSnap.data().location
        })
        setLoading(false)
      } else {
        navigate('/')
        toast.error('Listing Does Not Exist')
      }
    }
    fetchListing()
  }, [params.listingId, navigate])

  // Redirect if listing is not user's
  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error('You Don\'t Have Permission To Edit')
      navigate('/')
    }
  }, [auth.currentUser.uid, listing, navigate])


  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    // if (discountedPrice >= regularPrice) {
    //   setLoading(false)
    //   toast.error('Discounted price needs to be less than regular price')
    //   return
    // }

    console.log('images --->' + images);
    console.log('images length --->' + images.length);

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

    // setLoading(false)

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    }

    formDataCopy.location = address
    delete formDataCopy.images
    delete formDataCopy.address
    !formDataCopy.offer && delete formDataCopy.discountedPrice

    // Update listing
    const docRef = doc(db, 'listings', params.listingId)
    await updateDoc(docRef, formDataCopy)
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
      <h2>Edit listing</h2>

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

        <button type='submit'>Edit Listing</button>
      </form>
    </div>
  )
}

export default Edit