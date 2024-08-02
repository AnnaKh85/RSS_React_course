import img404 from '@assets/404-2.jpeg';
import './notFoundPage.css';
import Link from "next/link";

function NotFoundPage() {

  return (
    <div className="layout404" data-testid="pageNotFound-element">
      <img className="pic404" src={img404} alt="not found" />
      <h2>404 - PAGE NOT FOUND</h2>
      <p>
        The page you are looking for might have been removed, <br /> had its name changed, or is temporarily
        unavailable.
      </p>
        <Link href={"/"}>
            <button onClick={() => false}>GO TO HOME PAGE</button>
        </Link>
    </div>
  );
}

export default NotFoundPage;
