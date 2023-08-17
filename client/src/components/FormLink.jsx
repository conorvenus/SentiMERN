import { Link } from "react-router-dom"

export default function FormLink({ text, link, linkText }) {
    return (
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            {text}
            <Link to={link} className="font-medium text-primary-600 hover:underline dark:text-primary-500"> {linkText}</Link>
         </p>
    )
}