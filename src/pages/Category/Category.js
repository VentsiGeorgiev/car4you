import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './../../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../../components/ListingItem/ListingItem';
import styles from './Category.module.scss';

function Category() {
  const [listings, setListings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const params = useParams()

  useEffect(() => {

    const fetchListings = async () => {
      try {
        const listingRef = collection(db, 'listings')

        const q = query(
          listingRef,
          where('type', '==', params.categoryName),
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

  // console.log(listings);


  return (
    <div >
      <h2>
        {params.categoryName === 'rent'
          ? 'Rent your dream car'
          : 'Buy a top luxury car'
        }
      </h2>
      {isLoading
        ? <h3>Loading...</h3>
        : listings && listings.length > 0
          ? <>

            <section className={styles.cars}>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </section>
          </>
          : <p>No cars for {params.categoryName}</p>
      }
    </div>
  )
}

export default Category