import { ProductCard, Transition, Filters } from '../components';
import { useProductContext } from '../context';

const Products = () => {
  const { products } = useProductContext();

  return (
    <>
      <main className='product'>
        <Filters />
        <div className='product__container'>
          {products &&
            products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </main>
      <Transition />
    </>
  );
};

export default Products;
