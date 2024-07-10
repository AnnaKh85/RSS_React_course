import { useNavigate } from 'react-router-dom';
import img404 from '@assets/404-2.jpeg';
import './notFoundPage.css';

function NotFoundPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="layout404">
            <img className="pic404" src={img404} alt="not found" />
            <h2>404 - PAGE NOT FOUND</h2>
            <p>
                The page you are looking for might have been removed, <br /> had its name changed, or is temporarily
                unavailable.
            </p>
            <button onClick={handleGoHome}>
                GO TO HOME PAGE
            </button>
        </div>
    );
}

export default NotFoundPage;
