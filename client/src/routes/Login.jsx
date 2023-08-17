import { useState } from "react"
import { useSignIn } from "react-auth-kit"
import { useNavigate } from "react-router-dom"
import FormInput from "../components/FormInput"
import FormButton from "../components/FormButton"
import FormLink from "../components/FormLink"
import FormError from "../components/FormError"
import Form from "../components/Form"

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
        <Form handleSubmit={handleLogin}>
            <FormInput name="username" type="text" value={username} setValue={setUsername} />
            <FormInput name="password" type="password" value={password} setValue={setPassword} />
            <FormButton text="Login" />
            <FormError error={error} />
            <FormLink text="Don't have an account yet?" link="/register" linkText="Register" />
        </Form>
    )
}