import { Link } from 'react-router-dom';
import rentACarImg from './../../assets/jpg/rentACar.jpg';
import buyACarImg from './../../assets/jpg/buyACar.jpg';
import styles from './Explore.module.scss';
import { useContext } from 'react';
import ClientsContext from '../../context/ClientsContext';
import ClientsTestimonial from '../../components/ClientsTestimonial/ClientsTestimonial';


function Explore() {

  const { clients } = useContext(ClientsContext);

  return (
    <section className={styles.explore}>

      <div className={styles.explore__text}>
        <h1 className={styles.explore__title}>Find your next car</h1>
        <p className={styles.explore__subtext}>The official #1 site to buy, sell or rent new and used cars. <span className='divider'>Simple, easy, quick!</span> </p>
      </div>


      <div className={styles.categories}>

        <div className={styles.category}>
          <Link to='/category/rent'>
            <img className={styles.category__image} src={rentACarImg} alt="Rent a car" />
            <h2 className={styles.category__title}>Rent a car</h2>
          </Link>
        </div>

        <div className={styles.category}>
          <Link to='/category/sale'>
            <img className={styles.category__image} src={buyACarImg} alt="Buy a car" />
            <h2 className={styles.category__title}>Buy a car</h2>
          </Link>
        </div>

      </div>

      <div className={styles.clients}>

        <h2 className={styles.clients__title}>What Our Clients Say</h2>
        <h4 className={styles.clients__subtitle}>Testimonials</h4>
        <div className={styles.clients__cards}>
          {clients && clients.map((client) => (
            <ClientsTestimonial key={client.id} client={client} />
          ))}

        </div>
      </div>

    </section>
  )
}

export default Explore