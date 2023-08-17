import { Link } from "react-router-dom"
import { useState } from "react"
import { useSignIn } from "react-auth-kit"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const signIn = useSignIn()
    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault()

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!')
            }

            if (signIn({ token: data.token, expiresIn: 3600, tokenType: 'Bearer', authState: { username } })) {
                navigate('/')
            } else {
                throw new Error('Something went wrong!')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <form className="py-16 max-w-2xl mx-auto flex-col flex gap-8" onSubmit={handleLogin}>
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-slate-200">Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} type="username" name="username" id="username" className="bg-slate-800 border-slate-700 border text-slate-400 placeholder:text-slate-400 sm:text-sm rounded-lg block w-full p-2.5" required />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-200">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" className="bg-slate-800 border-slate-700 border text-slate-400 placeholder:text-slate-400 sm:text-sm rounded-lg block w-full p-2.5" required/>
            </div>
            <button type="submit" className="bg-slate-900 rounded-lg py-2 border-slate-800 border">Sign in</button>
            <p className="text-md text-center font-light text-red-300">{error}</p>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</Link>
            </p>
        </form>
    )
}