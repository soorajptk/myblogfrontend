
import React from 'react';
import {Link} from 'react-router-dom'
import { useGlobalContext } from '../../context/context';
import './Navbar.css'
const Navbar = () => {
const {logoutUser,state}=useGlobalContext()
console.log()
return <nav>
      <section className='nav-section'>
      <div>
      </div>

      <div>
        <Link className='linkNavbar' to={'/'}>Home</Link>
        <Link className='linkNavbar' to={'/about'}>About</Link>
        {
          state.user !== 'null' && <>
        <Link className='linkNavbar' to={'/write'}>Write</Link>
          <Link className='linkNavbar'onClick={logoutUser}  to={'/'}>Logout</Link>
          </>

        }
      </div>
      </section>
  </nav>
};

export default Navbar;
