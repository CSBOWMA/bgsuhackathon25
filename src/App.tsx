import React, { useState, useEffect } from 'react';
import BGLogo from './assets/BGSUHackathonLogo.png';
import AILogo from './assets/AILogo.png';
import HealthLogo from './assets/HealthLogo.png';
import SustainLogo from './assets/SustainLogo.png';
import './App.css';

function NavBar() {
    return (
      <nav className = "navbar">
            <ul className  = "navbar-menu">
            <NavElement title = "BGSU" target = "_blank" link = "https://www.bgsu.edu/" />
            <NavElement title = "About" link = "#about" target = "_self" />
            <NavElement title = "Tracks" link = "#tracks" target = "_self" />
            <NavElement title = "FAQ" link = "#faq" target = "_self" />
            <NavElement title = "Resources" target = "_blank" link = "/resources" />
            </ul>
      </nav>
    );
}

interface NavElementProps {
    title: string;
    target: string;
    link: string;
}

const NavElement: React.FC<NavElementProps> = ({title, target = "_blank", link}) => {
    return (
       
        <li className = "navelement">
            <a href = {link} target = {target}>{title}</a>
        </li>
    );
}


function TopSection() {

    return (
        
        <section id = 'topsection'>
        <div className = 'front'>
            <div className = "title">
                <img src = {BGLogo} alt = "hackathon logo" className = 'logo'/>
                <h2>April 5-6, 2025</h2>
            </div>
            <a href = "https://forms.office.com/r/A5c6H9YShw" target = "_blank" className = "register">Register</a>
        </div>
        </section>

    );

}

function AboutSection() {
    
    return (
    <section id = "about">
        <div className = "about-section">
            <About /> 
            <AboutNumbers />
        </div>
    </section>
    );
}

function About() {    
    return (
        <div className = "about-details">
            <h2>About</h2>
            <p>Join us on April 5th for BGSU's first Hackathon. </p>
        </div>
    );
}

function AboutNumbers() {
    return (
        <div className = "about-numbers">
            <AboutNumber value = "24" name = "Hours" />
            <AboutNumber value = "50" name = "Hackers" />
            <AboutNumber value = "3" name = "Universities" />
            <AboutNumber value = "15" name = "Projects" />
            <AboutNumber value = "$1600" name = "Prizes" /> 
        </div>
    );
}

interface AboutNumbersProps {
    value: string;
    name: string;
}

const AboutNumber: React.FC<AboutNumbersProps> = ({value, name}) => {
    return (
       <div className = "about-number">
            <div className = "about-value">{value}</div>
            <div className = "about-name">{name}</div>
       </div>
    );
}

function TracksSection() {

   const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        // Initialize IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // When <Tracks /> is in the viewport
                    if (entry.isIntersecting) {
                        setIsInView(true);  // Trigger animation
                    } else {
                        setIsInView(false); // Reset when out of view
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% of <Tracks /> is visible
            }
        );

        const target = document.querySelector('#tracks');
        if (target) {
            observer.observe(target); // Observe the <Tracks /> section
        }

        // Clean up the observer when component unmounts
        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, []);

    return (
        <section id = "tracks">
            <div className = "tracks-section">
                <div>
                    <h2 className={`tracks-title ${isInView ? 'in-view' : ''}`}>Tracks</h2> 
                </div>
                <Tracks/>
            </div>
        </section>
    );
}

function Tracks() {
    return (
        <div className = "tracks">
            <Track name = "AI/ML" img = {AILogo}/>
            <Track name = "Sustainability" img = {SustainLogo}/>
            <Track name = "Health" img = {HealthLogo}/>
        </div>
    );
}

interface TrackProps {
    name: string;
    img: string;
}

const Track: React.FC<TrackProps> = ({name, img}) => {
    return (
        <div className = "track">
        <img src = {img} alt = {name + " logo"}/> 
        <div>{name}</div>
        </div>
    );
}

function FAQSection() {


   const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        // Initialize IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // When <Tracks /> is in the viewport
                    if (entry.isIntersecting) {
                        setIsInView(true);  // Trigger animation
                    } else {
                        setIsInView(false); // Reset when out of view
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% of <Tracks /> is visible
            }
        );

        const target = document.querySelector('#faq');
        if (target) {
            observer.observe(target); // Observe the <Tracks /> section
        }

        // Clean up the observer when component unmounts
        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, []);

    return (
        <section id = "faq">
        <div className = "faq-section"/>
        <h2 className={`faq-title ${isInView ? 'in-view' : ''}`}>FAQ</h2> 
        <FAQs />
        </section>
    );
}

function FAQs() {
    return (
        <div className = "faqs">
            <FAQ question = "Who can sign up?" 
                answer = "We are currently accepting university students from Northwest Ohio. If you fit the criteria feel free to sign up!" />
            <FAQ question = "What is a hackathon?" answer = "A hackathon is an event in which you get the opportunity to bring your ideas to life. At the BGSU Hackathon you have 24 hours to design and create your idea utilizing either one or a combination of tracks that are designed to empower you." />
            <FAQ question = "Where is the event being held?" answer = "Starting at 10 am April 5th, The event is being held on BGSU's campus in Hayes Hall." />
            <FAQ question = "Are beginners allowed?" answer = "We encourage beginners to join, and even have rewards for beginners. If you are a hackathon veteran or this is your first one, this event will have something for you." />
            <FAQ question = "Are sleeping arrangements provided?" answer = "Sleeping arrangements will not be provided for the participants, individuals will be expected to leave the venue if they want to sleep." />
            <FAQ question = "Will food be provided?" answer = "Food will be provided at the event, but you are welcome to bring your own." />
        </div>
    );
}

interface FAQProps {
    question: string;
    answer: string;
}

const FAQ: React.FC<FAQProps> = ({question, answer}) => {
    
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className = "faqs-item" onClick = {handleClick}>
            <div className = "question">{question}</div>
            {isVisible ? 
            <div className = "answer">{answer}</div> : null }
        </div>
    );
}

function App() {
    return (
        <div className = "homepage">
            <div className = "initial-page">
                <NavBar />
                <TopSection />
            </div>
            <main>
                <div className = "details">
                    <AboutSection />
                    <TracksSection />
                    <FAQSection />
                </div>
            </main>
        </div>
    );
}

export default App;
