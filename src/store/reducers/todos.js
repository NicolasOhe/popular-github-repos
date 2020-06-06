const initialState = [
  {
    id: 222,
    text: 'make redux rock',
    completed: false,
  },
]

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ]
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )

    // case 'ADD_REPOS':
    //   console.log('ADD_REPOS')
    //   return [...state, action.data]
    default:
      return state
  }
}

export default todos
