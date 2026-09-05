import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
          setLoading(true);
          const res = await fetch('/data/prices.json');
          if (!res.ok) {
              throw new Error(`Failed to fetch products, ${res.status}`);
          }
          const data = await res.json();
          if (!cancelled) {
              setProducts(data);
              setLoading(false);
          }
      } catch (err){
          if (!cancelled) setError(err.message);
      } finally {
          if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}