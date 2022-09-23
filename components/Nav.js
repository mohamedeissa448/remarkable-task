import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';
import React from 'react';

const Nav = () => {

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>Log In</Link>
        </li>
        
        <li>
            <Link href='/users'>Users</Link>
        </li>
        <li>
            <Link href='/articles'>My Articles</Link>
        </li>
            
        
      </ul>
    </nav>
  )
}

export default Nav
