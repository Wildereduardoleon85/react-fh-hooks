import { renderHook, act } from '@testing-library/react'
import { useForm } from '../../src/hooks'

describe('pruebas en el useForm', () => {
  const initialFormValues = {
    name: 'Wilder',
    email: 'wilder@email.com',
  }

  test('debe de regresar los valores por defecto', () => {
    const { result } = renderHook(() => useForm(initialFormValues))

    expect(result.current).toEqual({
      name: initialFormValues.name,
      email: initialFormValues.email,
      formState: initialFormValues,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function),
    })
  })

  test('debe de cambiar a un nuevo valor', () => {
    const { result } = renderHook(() => useForm(initialFormValues))

    const { onInputChange } = result.current

    act(() => {
      onInputChange({ target: { name: 'name', value: 'José' } })
    })

    expect(result.current.name).toBe('José')
    expect(result.current.formState.name).toBe('José')
  })

  test('debe de resetear el formulario', () => {
    const { result } = renderHook(() => useForm(initialFormValues))

    const { onInputChange, onResetForm } = result.current

    act(() => {
      onInputChange({ target: { name: 'name', value: 'José' } })
      onResetForm()
    })

    expect(result.current.name).toBe('Wilder')
    expect(result.current.formState.name).toBe('Wilder')
  })
})
