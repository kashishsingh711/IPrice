import Layout from '../components/Layout.jsx'
import AboutCard from '../components/AboutCard.jsx'

const categories = [
  { title: 'Iphones', className: 'card1' },
  { title: 'Ipads', className: 'card2' },
  { title: 'Macbooks', className: 'card3' },
  { title: 'Accesories', className: 'card4' },
];

function About() {
    return (
        <Layout>
            <section className="about">
                <div className="row">
                    <div className="col">
                        <h1>About us.</h1>
                        <p>
                        Welcome to iPrice, the ultimate site for finding the best prices on
                        the latest gadgets. Our website is designed to help you save time
                        and money when shopping for your favourite Apple products, including
                        iphones, iPad, Macbook, and more.
                        </p>
                    </div>
                </div>
                <div className="row">
                    {categories.map((cat) => (
                        <AboutCard
                            key={cat.title}
                            title={cat.title}
                            className={cat.className}
                        />
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export default About