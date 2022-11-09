import { fireEvent, render, screen } from '@testing-library/react'
import { MultipleCustomHooks } from '../../src/03-examples'
import { useFetch } from '../../src/hooks/useFetch'
import { useCounter } from '../../src/hooks/useCounter'

jest.mock('../../src/hooks/useFetch')
jest.mock('../../src/hooks/useCounter')

describe('pruebas en <MultipleCustomHooks />', () => {
  const mockedIncrement = jest.fn()

  useCounter.mockReturnValue({
    counter: 1,
    increment: mockedIncrement,
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('debe de mostrar el componente por defecto', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null,
    })

    render(<MultipleCustomHooks />)

    screen.getByText('Loading...')
    screen.getByText('BreakingBad Quotes')
    const nextButton = screen.getByRole('button', { name: 'Next quote' })

    expect(nextButton.disabled).toBe(true)
  })

  test('debe de mostrar un Quote', () => {
    useFetch.mockReturnValue({
      data: [{ author: 'Wilder', quote: 'Hola mundo' }],
      isLoading: false,
      hasError: null,
    })

    render(<MultipleCustomHooks />)

    const nextButton = screen.getByRole('button', { name: 'Next quote' })

    expect(screen.getByText('Hola mundo')).toBeTruthy()
    expect(screen.getByText('Wilder')).toBeTruthy()
    expect(nextButton.disabled).toBe(false)
  })

  test('debe de llamar la función de incrementar', () => {
    useFetch.mockReturnValue({
      data: [{ author: 'Wilder', quote: 'Hola mundo' }],
      isLoading: false,
      hasError: null,
    })

    render(<MultipleCustomHooks />)

    const nextButton = screen.getByRole('button', { name: 'Next quote' })

    fireEvent.click(nextButton)

    expect(mockedIncrement).toHaveBeenCalled()
  })
})
