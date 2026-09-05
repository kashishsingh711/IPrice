import { useState } from 'react'
import Layout from '../components/Layout.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useProducts } from '../hooks/useProducts.js'

function Home() {
    const { products, loading, error } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [appliedTerm, setAppliedTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setAppliedTerm(searchTerm);
    }

    const results = appliedTerm ? 
        products.filter(product => product.title.toLowerCase().includes(appliedTerm.toLowerCase()))
        : products;

    return (
        <Layout>
            <section className="header">
                <div className="text-box">
                    <h1>Explore how much you can save.</h1>
                    <p>
                    Confused from which site to get your favourite Apple products from?
                    Let us help.
                    </p>
                    <div className="container">
                    <form autoComplete="off" className="search-bar" onSubmit={handleSearch}>
                        <input
                        type="text"
                        placeholder="Search any Apple product"
                        name="q"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button id="search-button" type="submit">
                        <img src="/images/search1.png" />
                        </button>
                    </form>
                    </div>
                </div>  
            </section>
            <div className="product-cards">
                {loading && <p style={{ textAlign: 'center'}}> Loading products...</p>}
                {error && <p style={{textAlign: 'center', color: 'crimson'}}> Error: {error}</p>}
                {!loading && !error &&
                results.map((product) =>
                    product.itemList.map((subItem) => (
                    <ProductCard
                        key={product.title + subItem.colorSize}
                        title={product.title}
                        subItem={subItem}
                    />
                    ))
                )}
            </div>
        </Layout>
    )
}

export default Home