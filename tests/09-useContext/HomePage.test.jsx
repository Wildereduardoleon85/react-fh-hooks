import { render, screen } from '@testing-library/react'
import { UserContext } from '../../src/09-useContext/context/UserContext'
import { HomePage } from '../../src/09-useContext/HomePage'

describe('pruebas en <HomePage />', () => {
  const user = {
    id: 1,
    user: 'Wilder',
  }

  test('debe de mostrar el componente sin el usuario', () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <HomePage />
      </UserContext.Provider>
    )

    const preElement = document.getElementsByTagName('pre')[0]

    expect(preElement.textContent).toBe('null')
  })

  test('debe de mostrar el componente con el usuario', () => {
    render(
      <UserContext.Provider value={{ user }}>
        <HomePage />
      </UserContext.Provider>
    )

    const preElement = document.getElementsByTagName('pre')[0]

    expect(preElement.innerHTML).toBe(JSON.stringify(user, null, 3))
  })
})
