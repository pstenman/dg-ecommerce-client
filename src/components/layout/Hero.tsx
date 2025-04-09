import { useNavigate } from "react-router";
import heroImage from "../../images/hero1.jpg";
import "../../styles/layout/heroStyles.css"

export const Hero = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/products");
    }
    
    return (
        <section className="hero" style={{ backgroundImage: `url${heroImage}` }}>
            <div className="hero-content">
                <h1>LET'S KASTA PLAST</h1>
                <p>Your disc golf buddy!</p>
                <button className="hero-btn" onClick={handleNavigate}>See Products</button>
            </div>
        </section>
    )
}