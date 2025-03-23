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
            <NavElement title = "Sign-Up" target = "_blank" link = "https://forms.office.com/r/sUpuPjFvrS" />
            <NavElement title = "About" link = "#about" target = "_self" />
            <NavElement title = "Tracks" link = "#tracks" target = "_self" />
            <NavElement title = "FAQ" link = "#faq" target = "_self" />
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

    const launchTime: number = new Date(2025, 3, 5, 10).getTime();

    return (
        
        <section id = 'topsection'>
        <div className = 'front'>
            <div className = "title">
                <img src = {BGLogo} alt = "hackathon logo" className = 'logo'/>
                <h2>April 5-6, 2025</h2>
            </div>
            <CountdownTimer targetTime = {launchTime}  />
        </div>
        </section>

    );

}


interface CountdownTimerProps {
    targetTime: number; // The target time in milliseconds
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
    // State to hold the remaining time (in milliseconds)
    const [timeLeft, setTimeLeft] = useState<number>(targetTime - Date.now());

    useEffect(() => {
        // Update the countdown every second
        const interval = setInterval(() => {
            const remainingTime = targetTime - Date.now();
            setTimeLeft(remainingTime);

            // Stop the countdown when the time reaches 0
            if (remainingTime <= 0) {
                clearInterval(interval);
                setTimeLeft(0); // Ensure we set it exactly to 0 when the time is up
            }
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [targetTime]);

    // Calculate days, hours, minutes, seconds from timeLeft
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Format the countdown
    return (
        <div className = 'countdown'>
        <span>{days}:</span>
        <span>{hours.toString().padStart(2, '0')}:</span>
        <span>{minutes.toString().padStart(2, '0')}:</span>
        <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
    );
};




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
            <p>Come join us April 5th for BGSU Biggeset Hackathon yet. </p>
        </div>
    );
}

function AboutNumbers() {
    return (
        <div className = "about-numbers">
            <AboutNumber value = "24" name = "Hours" />
            <AboutNumber value = "30" name = "Hackers" />
            <AboutNumber value = "1" name = "Universities" />
            <AboutNumber value = "10" name = "Projects" />
            <AboutNumber value = "$300" name = "Prizes" /> 
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
            <Track name = "health" img = {HealthLogo}/>
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
            <div className = "faqs-item">
            <div className = "question">Who can sign up?</div>
                <div className = "answer">
                    We are currently accepting university students 
                    from the Northwest region of Ohio. If you fit the 
                    criteria feel free to sign up!
                </div>
            </div>
            <div className = "faqs-item"> 
            <div className = "question">How do I sign up?</div>
                <div className = "answer">
                    If you are interested in participating
                    in this year's hackathon please fill out 
                    this <a href = "link" target = "_blank">interest form</a>.
                </div>
            </div>
            <div className = "faqs-item"> 
            <div className = "question">What is a Hackathon?</div>
                <div className = "answer">
                    This hackathon is a 24 hour event in which
                    you get the oppurtunity to work as a team to bring your ideas to life.
                    At the 2025 BGSU Hackathon you can choose either one or a combination 
                    of tracks to follow that will empower you to create the best application
                    you can.
                </div>
            </div>
            <div className = "faqs-item"> 
            <div className = "question">Where is the event being held?</div>
                <div className = "answer">
                The event is being held on BGSUs campus, with side events taking place 
                in <a href = "https://events.bgsu.edu/hayes_hall" target = "_blank">Hayes Hall</a> throughout 
                the day.</div>
            </div>
            <div className = "faqs-item"> 
            <div className = "question">Are beginners allowed?</div>
                <div className = "answer">We encourage beginners to join, and even have rewards
                    for beginners. If you are a hackathon veteran or this is your first one,
                    this event will have something for you.
                </div>
            </div>
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
