import Layout from '../components/Layout.jsx'
import { useState } from 'react'
import {FiHome, FiPhone, FiMail} from 'react-icons/fi'
import ContactInfoRow from '../components/ContactInfoRow.jsx'

const EMPTY = { name: '', email: '', phone: '',message: '' }

const infoRows = [
  { icon: <FiHome className="fa" />, title: 'KIIT University', text: 'Bhubaneshwar, Orissa, IN' },
  { icon: <FiPhone className="fa" />, title: '+91 9189472085', text: 'Monday to Saturday, 10AM to 6PM' },
  { icon: <FiMail className="fa" />, title: 'info@kiit.ac.in', text: 'Email us your query' },
];

function Contact() {
    const [formData, setFormData] = useState(EMPTY)
    const [errors, setErrors] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        setErrors('Please fill in your name, email, phone, and message.');
        return;
        }
        setErrors('');
        setSubmitted(true);
        console.log('Contact form submitted:', formData);
        setFormData(EMPTY);
    };

    return (
        <Layout>
            <section className="contact">
                <div className="row">
                <div className="contact-col">
                    <h1>Contact us.</h1>
                    {infoRows.map((row) => (
                    <ContactInfoRow key={row.title} {...row} />
                    ))}
                </div>

                <div className="contact-col">
                    <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter your number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        rows="8"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <button type="submit">Send</button>
                    {errors && <p style={{ color: 'crimson', marginTop: 8 }}>{errors}</p>}
                    {submitted && !errors && (
                        <p style={{ color: 'green', marginTop: 8 }}>
                        Thanks, we'll be in touch.
                        </p>
                    )}
                    </form>
                </div>
                </div>
            </section>
        </Layout>
    )
}

export default Contact