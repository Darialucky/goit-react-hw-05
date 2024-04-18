import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h3>Page not found</h3>
      <Link to={"/"}>Go Home</Link>
    </div>
  );
};

export default NotFoundPage;
