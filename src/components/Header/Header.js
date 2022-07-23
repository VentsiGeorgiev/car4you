import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import classes from './Header.module.scss';
import { useEffect, useState } from 'react';

import { NavLink } from "react-router-dom";


function Header() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    };
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)

  }, [])

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((x) => !x);
  }



  return (
    <header className={classes.header}>

      <div className={classes.header__content}>

        {/* logo */}
        <NavLink to="/" h2 className={classes.header__content__logo}>car4you</NavLink>


        {/* nav */}
        <nav className={`${classes.header__content__nav} ${menuOpen ? classes.isMenu : ''}`}>
          <ul role="list">
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : undefined
                })}
                onClick={menuToggleHandler}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/offers"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : undefined
                })}
                onClick={menuToggleHandler}
              >
                Offers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : undefined
                })}
                onClick={menuToggleHandler}
              >
                Profile
              </NavLink>
            </li>
          </ul>

          {/* login/register */}
          {/* <button className={classes.header__content__profile}>
            Link 3
          </button> */}

        </nav>

        {/* hamburger icon */}
        <div className={classes.header__content__toggle}>
          {!menuOpen ? <BiMenuAltRight onClick={menuToggleHandler} /> : <AiOutlineClose onClick={menuToggleHandler} />}
        </div>

      </div>

    </header>
  )
}

export default Header