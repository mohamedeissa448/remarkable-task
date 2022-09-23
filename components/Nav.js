import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';
import isUserLoggedIn from './helpers/isUserLogged';
import React, { useEffect, useState  } from 'react';

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
}, [])

  return (
    <nav className={navStyles.nav}>
      <ul>
      <li>
          <Link href='/'>Log In</Link>
        </li>
        {isLoggedIn ? <>
            <li>
              <Link href='/users'>Users</Link>
            </li>
            <li>
              <Link href='/articles'>My Articles</Link>
            </li>
            </>:
        ''
        }
        
      </ul>
    </nav>
  )
}

export default Nav
