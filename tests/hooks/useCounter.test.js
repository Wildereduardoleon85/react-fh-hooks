import { renderHook, act } from '@testing-library/react'
import { useCounter } from '../../src/hooks/useCounter'

describe('pruebas en el useCounter', () => {
  test('debe de retornar los valores por defecto', () => {
    const { result } = renderHook(() => useCounter())
    const { counter, increment, decrement, reset } = result.current

    expect(counter).toBe(10)
    expect(increment).toEqual(expect.any(Function))
    expect(decrement).toEqual(expect.any(Function))
    expect(reset).toEqual(expect.any(Function))
  })

  test('debe retornar el counter con el valor de 100', () => {
    const { result } = renderHook(() => useCounter(100))
    const { counter } = result.current

    expect(counter).toBe(100)
  })

  test('debe incrementar el contador', () => {
    const { result } = renderHook(() => useCounter())
    const { increment } = result.current

    act(() => {
      increment()
      increment(10)
    })

    expect(result.current.counter).toBe(21)
  })

  test('debe decrementar el contador', () => {
    const { result } = renderHook(() => useCounter(50))
    const { decrement } = result.current

    act(() => {
      decrement()
      decrement(10)
    })

    expect(result.current.counter).toBe(39)
  })

  test('debe resetear el contador', () => {
    const { result } = renderHook(() => useCounter(50))
    const { reset, increment } = result.current

    act(() => {
      increment(30)
      reset()
    })

    expect(result.current.counter).toBe(50)
  })
})
