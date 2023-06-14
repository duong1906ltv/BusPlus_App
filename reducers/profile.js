const initialState = {
  profile: null,
  isLoading: false,
  isEditing: false,
  error: null,
  fullname: null,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_PROFILE_REQUEST':
      return {
        ...state,
        loading: false,
        isEditing: true,
      }
    case 'EDIT_PROFILE_SUCCESS':
      return {
        ...state,
        isEditing: false,
      }
    case 'EDIT_PROFILE_CLICK':
      return {
        ...state,
        isEditing: !state.isEditing,
      }
    case 'GET_PROFILE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        profile: action.payload.profile,
        isLoading: false,
        error: null,
      }
    case 'GET_PROFILE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }

    default:
      return state
  }
}

export default profileReducer
