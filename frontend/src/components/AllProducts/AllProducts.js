import React from 'react';

import products from '../Products/Products';
import ProductsList from '../ProductsList/ProductsList';
import ProductDetails from '../Products/ProductDetails';
import SearchForm from '../SearchForm/SearchForm';
import Pagination from '../Pagination/Pagination';
import { useValidate } from '../../utils/use-validate';
import RelatedProducts from '../Products/RelatedProducts';

function AllProducts(props) {
  // States
  const [isMatch, setIsMatch] = React.useState(false);
  const [allProductsList, setAllProductsList] = React.useState([]);
  const [filtredProductsList, setFiltredProductsList] = React.useState([]);
  const [productsList, setProductsList] = React.useState([]);
  const [views, setViews] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { formValue, errorMessage, isValid, handleChange, resetForm } = useValidate();

  const [editing, setEditing] = React.useState(true);
  const [marked, setMarked] = React.useState([]);

  // Match open & close
  function handleMatch() {
    setIsMatch(true);
  }

  function handleMatchClose() {
    setIsMatch(false);
  }

  // value for Views
  function handleViewsChange(e) {
    setViews(e.target.value);
  }

  // products index
  const lastProductIndex = currentPage * views;
  const firstProductIndex = lastProductIndex - views;
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage(prev => prev - 1);
  const nextPage = () => setCurrentPage(prev => prev + 1);

  // products for table
  React.useEffect(() => {
    props.setLoading(true);
    setAllProductsList(products);
    props.setLoading(false);
  }, []);

  console.log(formValue);
  React.useEffect(() => {
    if (formValue === null) {
      console.log(formValue);
      const filtredProducts = allProductsList.filter(prod => {
        const searchProd =
          prod.product_name.toLowerCase().includes(formValue.toLowerCase()) ||
          prod.product_key.toLowerCase().includes(formValue.toLowerCase()) ||
          prod.date.toLowerCase().includes(formValue.toLowerCase()) ||
          prod.price.toLowerCase().includes(formValue.toLowerCase());
        return searchProd;
      });
      setFiltredProductsList(filtredProducts);
    } else {
      setFiltredProductsList(allProductsList);
    }

    // localStorage.setItem('filtredProducts', JSON.stringify(filtredProducts));
  }, [formValue]);

  React.useEffect(() => {
    props.setLoading(true);
    const firstProductIndex = currentPage * views - views;
    console.log(firstProductIndex);
    const lastProductIndex =
      currentPage * views > allProductsList.length ? allProductsList.length : currentPage * views;
    console.log(lastProductIndex);
    if (firstProductIndex >= allProductsList.length) {
      setCurrentPage(1);
    }
    setProductsList(() => {
      if (allProductsList !== null) {
        if (allProductsList.length >= views) {
          return allProductsList.slice(firstProductIndex, lastProductIndex);
        } else {
          return allProductsList;
        }
      } else {
        setCurrentPage(1);
      }
    });
    props.setLoading(false);
  }, [views, currentPage]);

  return (
    <section className='section products' aria-label='Таблица товаров'>
      <h1 className='section-title products__title'>Товары продавцов</h1>
      <div className='products__options'>
        <label className='text products__label' for='views'>
          Show:
          <input
            className='text products__input'
            type='number'
            id='views'
            name='views'
            min='10'
            max='500'
            step='5'
            value={views}
            onChange={handleViewsChange}
          />
        </label>
        <SearchForm formValue={formValue} handleChange={handleChange} />
      </div>
      <div className='products__main'>
        <ProductsList
          setLoading={props.setLoading}
          productsList={productsList}
          setProductsList={setProductsList}
          isMatch={isMatch}
          handleMatch={handleMatch}
          handleMatchClose={handleMatchClose}
        />
      </div>
      {editing && RelatedProducts && (
        <div>
          <ProductDetails selectedProduct={RelatedProducts} />
          <RelatedProducts clickedProduct={RelatedProducts} markedProducts={marked} />
        </div>
      )}
      <Pagination
        views={views}
        currentPage={currentPage}
        totalProducts={filtredProductsList.length}
        firstProductIndex={firstProductIndex}
        lastProductIndex={lastProductIndex}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </section>
  );
}

export default AllProducts;
