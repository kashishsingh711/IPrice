import PriceRow from './PriceRow.jsx'

function ProductCard({ title, subItem }) {
    // color/size are sometimes blank strings in the scraped data (see
    // hmtTrack/prices.json) — join only the non-empty ones so we never
    // render an empty line.
    const meta = [subItem.color, subItem.size].filter(Boolean).join(' · ');

    return (
        <div className="apple">
            <div className="apple-top">
                <img src={subItem.image} alt={title} />
                <div>
                    <h3 className="apple-title">{title}</h3>
                    {meta && <p className="apple-meta">{meta}</p>}
                </div>
            </div>
            <div className="apple-prices">
                {subItem.info.map((priceInfo) => (
                    <PriceRow key={priceInfo.site + priceInfo.link} {...priceInfo} />
                ))}
            </div>
        </div>
    )
}

export default ProductCard