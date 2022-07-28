import { Link } from 'react-router-dom';
import { FaEuroSign } from 'react-icons/fa';

function ListingItem({ listing, id }) {
  return (
    <div>
      <Link to={`/category/${listing.type}/${id}`}>
        <img className="category-image" src={listing.imageUrls[0]} alt={listing.make} />

        <div>
          <h3>{listing.make} {listing.model}</h3>
          <h4>{listing.offer ? listing.discountedPrice : listing.regularPrice} <FaEuroSign /></h4>
        </div>
      </Link>

      { }

    </div>
  )
}

export default ListingItem