import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (code) {
      window.location.href = `https://amzn.to/${code}`;
    }
  }, [location.search]);

  return (
    <div className="product-page">
      <h1>Redirecting to Amazon...</h1>
      <p>If you are not redirected automatically, please click the link below:</p>
      <a href={`https://amazon.to/${new URLSearchParams(location.search).get("code")}`}>
        Go to Amazon
      </a>
    </div>
  )
};

export default ProductPage;
