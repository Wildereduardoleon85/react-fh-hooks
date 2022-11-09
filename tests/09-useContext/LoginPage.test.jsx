import { fireEvent, render, screen } from '@testing-library/react'
import { UserContext } from '../../src/09-useContext/context/UserContext'
import { LoginPage } from '../../src/09-useContext/LoginPage'

describe('pruebas en <LoginPage />', () => {
  test('debe de mostrar el componente sin el usuario', () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <LoginPage />
      </UserContext.Provider>
    )

    const preElement = document.querySelector('pre')

    expect(preElement.innerHTML).toBe('null')
  })

  test('debe de llamar el setUser cuandos e hace click en el botón', () => {
    const setUser = jest.fn()

    render(
      <UserContext.Provider value={{ user: null, setUser }}>
        <LoginPage />
      </UserContext.Provider>
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(setUser).toHaveBeenCalledWith({
      email: 'juan@google.com',
      id: 123,
      name: 'Juan',
    })
  })
})
