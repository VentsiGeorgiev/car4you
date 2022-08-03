import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { FaFacebook, FaInstagram, FaLinkedin, FaCopyright } from 'react-icons/fa'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.wrapper}>
          <section className="footer__section">
            <h3>Get In Touch</h3>
            <ul>
              <li>123 Street, Sofia Bulgaria</li>
              <li>+359 123 456 789</li>
              <li>info@car4you.com</li>
            </ul>
          </section>

          <section className="footer__section">
            <h3>Social</h3>
            <ul className={styles.social}>
              <li><FaFacebook /></li>
              <li><FaInstagram /></li>
              <li><FaLinkedin /></li>
            </ul>
          </section>

          <section className="footer__section">
            <h3>Popular Links</h3>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/offers'>Offers</Link></li>
              <li><Link to='/profile'>Profile</Link></li>
            </ul>

          </section>
        </div>
        <p className={styles.credentials}><FaCopyright /> Car4You. All Rights Reserver. Designed By VentsiGeorgiev</p>
      </div>
    </footer>
  )
}

export default Footer