import React, { useState } from 'react';
import SectionTitle from "../../components/SectionTitle";
import {useSelector} from "react-redux";
import { useNotification } from "../../contexts/NotificationContext";
import Button from "../../components/Button";
import { useTheme } from "../../contexts/ThemeContext";

function Contact() {
    const { portfolioData } = useSelector((state) => state.root);
    const { contacts = {} } = portfolioData || {};
    const { success, error, info } = useNotification();
    const { isDarkMode } = useTheme();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!contacts || typeof contacts !== 'object') {
        return (
            <div className="py-20" aria-busy="true" aria-live="polite">
                <SectionTitle title="Say Hello" />
                <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Loading contact information...</div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: All fields required
        if (!formData.name || !formData.email || !formData.message) {
            error("Please fill in all fields");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            error("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);
        info("Sending your message...");

        try {
            // Send message to the same backend endpoint
            const response = await fetch(`${process.env.REACT_APP_API_URL || require('../../apiBaseUrl').default}/api/contact/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    message: formData.message.trim(),
                }),
            });
            if (response.ok) {
                success("Message sent successfully!");
                setFormData({ name: '', email: '', message: '' });
            } else {
                error("Failed to send message. Please try again later.");
            }
        } catch (err) {
            error("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="py-20" aria-labelledby="contact-title" role="region">
            <SectionTitle title="Say Hello" subtitle="Let's get in touch!" icon="📬" id="contact-title" />
            <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
                <div className={`w-full md:w-1/2 p-8 rounded-3xl glass-morphism-dark shadow-xl border border-white/10 ${isDarkMode ? 'bg-surface/40' : 'bg-white/80'}`} aria-label="Contact information">
                    <h2 className="text-2xl font-bold mb-4 text-tertiary">Contact Information</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">Email:</span>
                            <span>{contacts.email || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">Phone:</span>
                            <span>{contacts.phone || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">Location:</span>
                            <span>{contacts.location || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                <form
                    className={`w-full md:w-1/2 p-8 rounded-3xl glass-morphism-dark shadow-xl border border-white/10 ${isDarkMode ? 'bg-surface/40' : 'bg-white/80'}`}
                    onSubmit={handleSubmit}
                    aria-label="Contact form"
                >
                    <h2 className="text-2xl font-bold mb-4 text-tertiary">Send a Message</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary"
                            required
                            aria-required="true"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary"
                            required
                            aria-required="true"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block font-semibold mb-2">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tertiary"
                            rows={5}
                            required
                            aria-required="true"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full mt-4"
                        disabled={isSubmitting}
                        aria-disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Contact;

// ...existing code...