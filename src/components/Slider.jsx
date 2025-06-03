import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchSliders } from '../api/apicalls';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    //   const slides = [
    //     {
    //       title: "Premium Headphones",
    //       description: "Experience crystal clear sound with our noise-cancelling headphones. Limited time offer!",
    //       imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    //     },
    //     {
    //       title: "Smart Watches",
    //       description: "Track your fitness and stay connected with our latest smartwatch collection.",
    //       imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80"
    //     },
    //     {
    //       title: "Home Appliances",
    //       description: "Upgrade your home with energy-efficient and smart appliances.",
    //       imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    //     }
    //   ];

    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchSlides = async () => {
            const res = await fetchSliders();
            setSlides(res)
        }
        fetchSlides();
    }, [])
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Auto slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [slides]);

    return (
        <div className="slider-container">
            <div
                className="slider"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="slide"
                        style={{ backgroundImage: `url(${slide.imageUrl})`, cursor: 'pointer' }}
                        onClick={() => window.open(slide.link, '_blank')}
                    >
                        <div className="slide-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                            {/* <a href={slide.link} className="btn" target="_blank">Shop Now</a> */}
                        </div>
                    </div>
                ))}
            </div>
            <button className="slider-btn prev-btn" onClick={prevSlide}>
                <FontAwesomeIcon icon="chevron-left" />
            </button>
            <button className="slider-btn next-btn" onClick={nextSlide}>
                <FontAwesomeIcon icon="chevron-right" />
            </button>
            <div className="slider-nav">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Slider;