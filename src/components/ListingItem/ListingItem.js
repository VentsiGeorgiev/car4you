import { Link } from 'react-router-dom';
import { FaEuroSign } from 'react-icons/fa';
import styles from './ListingItem.module.scss'

function ListingItem({ listing, id, onDelete, onEdit }) {

  return (
    <>

      <div className={styles.car}>
        {listing && <Link to={`/category/${listing.type}/${id}`}>
          <img className={styles.car__image} src={listing.imgUrls[0]} alt={listing.make} />

          <div className={styles.car__info}>
            <h3 className={styles.car__make}>{listing.make} {listing.model}</h3>
            <p className={styles.car__price}>{listing.offer ? listing.discountedPrice : listing.regularPrice} <FaEuroSign className={styles.car__priceIcon} /></p>
          </div>
        </Link>}
      </div>

      {onDelete && (
        <button
          type='button'
          onClick={() => onDelete(listing.id, listing.name)}
        >
          Delete
        </button>
      )}

      {onEdit && (
        <button
          type='button'
          onClick={() => onEdit(listing.id)}
        >
          Edit
        </button>
      )}

    </>
  )
}

export default ListingItem