export default function Form({ children, handleSubmit }) {
    return (
        <form className="py-16 max-w-2xl mx-auto flex-col flex gap-8" onSubmit={handleSubmit}>
            {children}
        </form>
    )
}