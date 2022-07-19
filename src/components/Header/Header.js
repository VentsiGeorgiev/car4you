import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import classes from './Header.module.scss';


function Header() {
  return (
    <header className={classes.header}>

      {/* logo */}
      <div className={classes.header__content}>
        <h2 className={classes.header__content__logo}>car2you</h2>
      </div>

      {/* nav */}
      <nav className={classes.header__content__nav}>
        <ul role="list">
          <li>
            <a href="/">Link 1</a>
          </li>
          <li>
            <a href="/">Link 2</a>
          </li>
        </ul>
      </nav>

      {/* login/register */}
      <button className={classes.header__content__profile}>
        Link 3
      </button>

      {/* hamburger icon */}
      <div className={classes.header__content__toggle}>
        <BiMenuAltRight />
      </div>



    </header>
  )
}

export default Header