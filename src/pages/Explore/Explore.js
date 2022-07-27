import { Link } from 'react-router-dom';
import rentACarImg from './../../assets/jpg/rentACar.jpg';
import buyACarImg from './../../assets/jpg/buyACar.jpg';


function Explore() {
  return (
    <div className='container'>
      <h1>Explore</h1>
      <h2>Categories</h2>
      <div>

        <div>
          <Link to='/category/rent'>
            <img src={rentACarImg} alt="Rent a car" />
          </Link>
          <h2>Rent a car</h2>
        </div>

        <div>
          <Link to='/category/buy'>
            <img src={buyACarImg} alt="Buy a car" />
          </Link>
          <h2>Buy a car</h2>
        </div>

      </div>

    </div>
  )
}

export default Explore