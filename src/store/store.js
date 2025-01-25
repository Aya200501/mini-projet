import { createStore } from "redux"

const initialState = {
  nom: "",
  age: "",
  admin: false,
  MotDePasse: "",
  pseudo: "",
  prenom: "",
  couleur: "",
  Devise: "",
  Pays: "",
  avatar: "",
  email: "",
  photo: "",
  id: "",
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log("SET_USER action reçue:", action.payload)
      return { ...state, ...action.payload }
    case "LOGOUT":
      return initialState
    case "CHANGE_COLOR":
      console.log("CHANGE_COLOR action reçue:", action.payload)
      return { ...state, couleur: action.payload }
    default:
      return state
  }
}

const store = createStore(rootReducer)

store.subscribe(() => {
  console.log("État Redux mis à jour:", store.getState())
})
export default store