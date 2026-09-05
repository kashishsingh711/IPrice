function PriceRow({ site, price, link }) {
    return (
        <div className="apple-col">
            <h5>₹{price}</h5>
            <p><a href={link} target="_blank" rel="noopener noreferrer">{site}</a></p>
        </div>
    )
}

export default PriceRow;