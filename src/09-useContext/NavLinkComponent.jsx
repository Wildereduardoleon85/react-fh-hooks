import { NavLink } from 'react-router-dom'

export const NavLinkComponent = ({ path, name }) => {
  return (
    <NavLink
      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      to={path}
    >
      {name}
    </NavLink>
  )
}
