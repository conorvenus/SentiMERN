import { useSignIn } from "react-auth-kit"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Form from "../components/Form"
import FormInput from "../components/FormInput"
import FormButton from "../components/FormButton"
import FormError from "../components/FormError"
import FormLink from "../components/FormLink"

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
        <Form handleSubmit={handleRegister}>
            <FormInput name="username" type="text" value={username} setValue={setUsername} />
            <FormInput name="password" type="password" value={password} setValue={setPassword} />
            <FormInput name="confirmedPassword" type="password" value={confirmedPassword} setValue={setConfirmedPassword} />
            <FormButton text="Register" />
            <FormError error={error} />
            <FormLink text="Already have an account?" link="/login" linkText="Login" />
        </Form>
    )
}