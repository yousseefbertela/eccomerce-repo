import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Contact = () => {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [sent, setSent] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSent(true);
	};

	if (sent) {
		return (
			<div className="min-h-screen bg-white">
				<PageHeader 
					title="Thank You!"
					subtitle="We'll get back to you soon."
					breadcrumbs={[{ label: 'Contact' }]}
					backgroundImage="/assets/images/backround 4.webp"
					fullScreen={true}
				/>
				<section className="section-padding">
					<div className="container-custom max-w-md mx-auto text-center">
						<p className="text-gray-600 mb-6">Your message has been sent successfully.</p>
					</div>
				</section>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<PageHeader 
				title="Get In Touch"
				subtitle="Have a question? We'd love to hear from you."
				breadcrumbs={[{ label: 'Contact' }]}
				backgroundImage="/assets/images/backround 4.webp"
				fullScreen={true}
			/>
			<section className="section-padding">
				<div className="container-custom max-w-md mx-auto">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
					<Input label="Email" name="email" value={form.email} onChange={handleChange} required type="email" />
					<Input label="Message" name="message" value={form.message} onChange={handleChange} required type="text" />
					<Button type="submit" className="w-full">Send Message</Button>
				</form>
			</div>
		</section>
		</div>
	);
};

export default Contact;
