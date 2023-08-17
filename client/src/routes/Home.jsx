import { RequireAuth } from "react-auth-kit"
import { useState } from "react"

export default function Home() {
    const [text, setText] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await fetch(`/api/predict/${text}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <RequireAuth loginPath="/login">
            <form className="py-16 max-w-2xl mx-auto flex-col flex gap-8" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-slate-200">Text</label>
                    <textarea value={text} onChange={event => setText(event.target.value)} type="username" name="username" id="username" className="bg-slate-800 border-slate-700 border text-slate-400 placeholder:text-slate-400 text-lg rounded-lg block w-full p-2.5 min-h-[200px] focus:outline-slate-500 focus:outline" required />
                </div>
                <button type="submit" className="bg-slate-900 rounded-lg py-2 border-slate-800 border">🥳 Analyse Sentiment</button>
                <div className="flex gap-8">
                    <article className="bg-slate-800/50 border border-slate-700/50 flex flex-col items-center py-4 rounded-md flex-1 gap-4">
                        <h1 className="text-7xl">😀</h1>
                        <div className="text-center">
                            <h2 className="text-4xl text-slate-500">Positive</h2>
                            <p className="text-4xl text-slate-400">50%</p>
                        </div>
                    </article>
                    <article className="bg-slate-800/50 border border-slate-700/50 flex flex-col items-center py-4 rounded-md flex-1 gap-4">
                        <h1 className="text-7xl">😡</h1>
                        <div className="text-center">
                            <h2 className="text-4xl text-slate-500">Negative</h2>
                            <p className="text-4xl text-slate-400">50%</p>
                        </div>
                    </article>
                </div>
            </form>
        </RequireAuth>
    )
}