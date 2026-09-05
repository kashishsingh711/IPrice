import PriceRow from './PriceRow.jsx'

function ProductCard({ title, subItem }) {
    return (
        <div className="apple">
            <div>
                <img src={subItem.image} />
            </div>
            <div>
                <h3>{title}</h3>
                <h3>{subItem.color}</h3>
                <h3>{subItem.size}</h3>
            </div>
            <div>
                {subItem.info.map((priceInfo) => (
                    <PriceRow key={priceInfo.site + priceInfo.link} {...priceInfo} />
                ))}
            </div>
        </div>  
    )
}

export default ProductCard