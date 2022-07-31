import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './../../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../../components/ListingItem/ListingItem';

function Offers() {
  const [listings, setListings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const params = useParams()

  useEffect(() => {

    const fetchListings = async () => {
      try {
        const listingRef = collection(db, 'listings')

        const q = query(
          listingRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        const querySnap = await getDocs(q)

        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings)
        setIsLoading(false)

      } catch (error) {
        toast.error("Error: Could Not Load Data");
      }
    }

    fetchListings()

  }, [params.categoryName])



  return (
    <div className='container'>
      <h2>
        Offers
      </h2>
      {isLoading
        ? <h3>Loading...</h3>
        : listings && listings.length > 0
          ? <>

            <ul>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </>
          : <p>No Current Offers</p>
      }
    </div>
  )
}

export default Offers