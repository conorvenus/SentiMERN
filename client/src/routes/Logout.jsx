import { useSignOut } from 'react-auth-kit'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const signOut = useSignOut()
    const navigate = useNavigate()

    useEffect(() => {
        signOut()
        navigate("/")
    }, [])
}