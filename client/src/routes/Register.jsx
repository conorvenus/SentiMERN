import { useSignIn } from "react-auth-kit"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [error, setError] = useState("")

    const signIn = useSignIn()
    const navigate = useNavigate()

    async function handleRegister(event) {
        event.preventDefault()

        if (password !== confirmedPassword) {
            setError("Passwords do not match!")
            return
        }

        try {
            const response = await fetch(`/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)

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
        <form className="py-16 max-w-2xl mx-auto flex-col flex gap-8" onSubmit={handleRegister}>
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-slate-200">Username</label>
                <input value={username} onChange={event => setUsername(event.target.value)} type="username" name="username" id="username" className="bg-slate-800 border-slate-700 border text-slate-400 placeholder:text-slate-400 sm:text-sm rounded-lg block w-full p-2.5" required />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-200">Password</label>
                <input value={password} onChange={event => setPassword(event.target.value)} type="password" name="password" id="password" className="bg-slate-800 border-slate-700 border text-slate-400 placeholder:text-slate-400 sm:text-sm rounded-lg block w-full p-2.5" required/>
            </div>
            <div>
                <label htmlFor="cPassword" className="block mb-2 text-sm font-medium text-slate-200">Confirm Password</label>
                <input value={confirmedPassword} onChange={event => setConfirmedPassword(event.target.value)} type="password" name="cPassword" id="cPassword" className="bg-slate-800 border-slate-700 border text-slate-400 placeholder:text-slate-400 sm:text-sm rounded-lg block w-full p-2.5" required/>
            </div>
            <button type="submit" className="bg-slate-900 rounded-lg py-2 border-slate-800 border">Register</button>
            <p className="text-md text-center font-light text-red-300">{error}</p>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an existing account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
            </p>
        </form>
    )
}