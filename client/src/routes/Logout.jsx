import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const signOut = useSignOut()
    const navigate = useNavigate()

    signOut()
    navigate('/')
}