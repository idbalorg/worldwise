import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthenticated: false
}

function reducer(state, action){
    switch (action.type) {
        case "login":
            return{
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case "logout":
            return{
                ...state,
                user: null,
                isAuthenticated: false
            }    
            
            
    
        default: throw new Error("unknown action")
    }
}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
function AuthProvider({children}) {
    const[{user, isAuthenticated}, dispath] = useReducer(reducer, initialState)


    function login(userName, password) {
        if(userName === FAKE_USER.email && password === FAKE_USER.password){
            dispath({type : "login", payload: FAKE_USER})
        } else{
            alert("😔you enter a wrong detail check and try again")
        }
    }

    function logout() {
        dispath({type: "logout"})
    }


    return <AuthContext.Provider value={{login, logout, user, isAuthenticated}}>
        {children}
        </AuthContext.Provider>
    
}

function useAuth() {
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error("authContext is declared outside the authProvider")

    return context
}

export {AuthProvider, useAuth}