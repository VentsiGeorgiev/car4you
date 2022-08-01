import { Link } from 'react-router-dom';
import { FaEuroSign } from 'react-icons/fa';

function ListingItem({ listing, id, onDelete }) {

  return (
    <div>
      {listing && <Link to={`/category/${listing.type}/${id}`}>
        <img className="category-image" src={listing.imgUrls[0]} alt={listing.make} />

        <div>
          <h3>{listing.make} {listing.model}</h3>
          <h4>{listing.offer ? listing.discountedPrice : listing.regularPrice} <FaEuroSign /></h4>
        </div>
      </Link>}

      {onDelete && (
        <button
          type='button'
          onClick={() => onDelete(listing.id, listing.name)}
        >
          Delete
        </button>
      )}

    </div>
  )
}

export default ListingItem