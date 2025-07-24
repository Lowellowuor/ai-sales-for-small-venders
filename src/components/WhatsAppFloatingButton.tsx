import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloatingButton = () => {
  const phoneNumber = '+254113661960'; 
  const message = 'Hello! I saw your website and want to chat.';
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const [bottom,setBottom]=useState(false)
  window.onscroll = () => {
    if (window.scrollY > 100) {
      setBottom(true);
    } else {
      setBottom(false);
    }
  };

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${bottom?'bottom-40':'bottom-10'} right-6 bg-green-500 hover:bg-green-600 text-white rounded-full md:p-4 p-3 shadow-lg z-50 transition duration-300 ease-in-out ${bottom ? 'animate-bounce' : ''}`}
    >
      <FaWhatsapp className="md:text-3xl text:4xl" />
    </a>
  );
};

export default WhatsAppFloatingButton;
