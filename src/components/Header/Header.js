import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import classes from './Header.module.scss';


function Header() {
  return (
    <header className={classes.header}>

      <div className={classes.header__content}>

        {/* logo */}
        <h2 className={classes.header__content__logo}>car2you</h2>


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

          {/* login/register */}
          <button className={classes.header__content__profile}>
            Link 3
          </button>

        </nav>

        {/* hamburger icon */}
        <div className={classes.header__content__toggle}>
          <BiMenuAltRight />
        </div>

      </div>

    </header>
  )
}

export default Header