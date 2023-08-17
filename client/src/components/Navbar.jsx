import { HomeIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit'

export default function Navbar() {
    const isAuthenticated = useIsAuthenticated()

    return (
        <header className="flex justify-between items-center">
            <span className="text-4xl">😎</span>
            <nav>
                <ul className="flex gap-8 text-lg items-center">
                    <li>
                        <Link to="/" className="flex items-center gap-3">
                            <HomeIcon className="w-6 h-6" /> 
                            <span className="hidden md:block">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={isAuthenticated() ? "/logout" : "/login"} className="flex items-center gap-3 bg-slate-900 rounded-lg px-4 py-2 border-slate-800 border max-sm:rounded-full max-sm:aspect-square">
                            {isAuthenticated() ? <ArrowLeftOnRectangleIcon className="w-6 h-6" /> : <ArrowRightOnRectangleIcon className="w-6 h-6" />}
                            <span className="hidden md:block">{isAuthenticated() ? "Logout" : "Login"}</span>
                        </Link>
                    </li>
                    {!isAuthenticated() && (
                        <li>
                            <Link to="/register" className="flex items-center gap-3 bg-slate-900 rounded-lg px-4 py-2 border-slate-800 border max-sm:rounded-full max-sm:aspect-square">
                                <UserPlusIcon className="w-6 h-6" /> 
                                <span className="hidden md:block">Register</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}