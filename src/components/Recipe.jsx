import ReactMarkdown from "react-markdown"
export default function Recipe(props) {
    return (
        <section className="recipe-section"  aria-live="polite">
            <h2>Your Taste Bud Recommends: </h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}