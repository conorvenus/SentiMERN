import { Link } from "react-router-dom"

export default function Register() {
    return (
        <form className="py-16 max-w-2xl mx-auto flex-col flex gap-8" action="#">
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-slate-200">Username</label>
                <input type="username" name="username" id="username" className="bg-slate-800 border-slate-700 border text-slate-400 placeholder:text-slate-400 sm:text-sm rounded-lg block w-full p-2.5" required />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-200">Password</label>
                <input type="password" name="password" id="password" className="bg-slate-800 border-slate-700 border text-slate-400 placeholder:text-slate-400 sm:text-sm rounded-lg block w-full p-2.5" required/>
            </div>
            <div>
                <label htmlFor="cPassword" className="block mb-2 text-sm font-medium text-slate-200">Confirm Password</label>
                <input type="password" name="cPassword" id="cPassword" className="bg-slate-800 border-slate-700 border text-slate-400 placeholder:text-slate-400 sm:text-sm rounded-lg block w-full p-2.5" required/>
            </div>
            <button type="submit" className="bg-slate-900 rounded-lg py-2 border-slate-800 border">Register</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an existing account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
            </p>
        </form>
    )
}