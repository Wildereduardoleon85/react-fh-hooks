import { fireEvent, render, screen } from '@testing-library/react'
import { TodoItem } from '../../src/08-useReducer/TodoItem'

describe('pruebas en el componente <TodoItem />', () => {
  const todo = {
    id: 1,
    description: 'Piedra del alma',
    done: false,
  }

  const onDeleteTodo = jest.fn()
  const onToggleTodo = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar el TODO pendiente de completar', () => {
    render(
      <TodoItem
        todo={todo}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
      />
    )

    const liElement = screen.getByRole('listitem')
    const spanElement = document.getElementsByTagName('span')[0]

    expect(liElement.className).toBe(
      'list-group-item d-flex justify-content-between'
    )

    expect(spanElement.textContent).toBe('Piedra del alma')
    expect(spanElement.className.trim()).toBe('align-self-center')
    expect(spanElement.className).not.toContain('text-decoration-line-through')
  })

  test('debe de mostrar el TODO completado', () => {
    todo.done = true

    render(
      <TodoItem
        todo={todo}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
      />
    )

    const spanElement = document.getElementsByTagName('span')[0]

    expect(spanElement.className).toContain('text-decoration-line-through')
  })

  test('el span debe llamar al toggleTodo cuando se hace click', () => {
    render(
      <TodoItem
        todo={todo}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
      />
    )

    const spanElement = document.getElementsByTagName('span')[0]

    fireEvent.click(spanElement)

    expect(onToggleTodo).toHaveBeenCalledWith(1)
  })

  test('el botón debe de llamar a la función onDeleteTodo cuando se le haga click', () => {
    render(
      <TodoItem
        todo={todo}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
      />
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(onDeleteTodo).toHaveBeenCalledWith(1)
  })
})
