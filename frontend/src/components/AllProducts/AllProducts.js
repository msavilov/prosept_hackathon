import React, { useCallback } from 'react';

import ProductsList from '../ProductsList/ProductsList';
import SearchForm from '../SearchForm/SearchForm';
import Pagination from '../Pagination/Pagination';
import { useValidate } from '../../utils/use-validate';

function AllProducts(props) {
  // States
  const [isMatch, setIsMatch] = React.useState(false);
  const [allProductsList, setAllProductsList] = React.useState([]);
  const [filtredProductsList, setFiltredProductsList] = React.useState([]);
  const [productsList, setProductsList] = React.useState([]);
  const [views, setViews] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { formValue, handleChange } = useValidate();

  const products = props.products;

  // Match open & close
  function handleMatch() {
    setIsMatch(true);
  }

  function handleMatchClose() {
    setIsMatch(false);
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage(prev => prev - 1);
  const nextPage = () => setCurrentPage(prev => prev + 1);

  // function for pagination
  const pagination = useCallback(
    prods => {
      const firstProductIndex = currentPage * views - views;
      const lastProductIndex =
        currentPage * views > prods.length ? prods.length : currentPage * views;

      if (firstProductIndex >= prods.length) {
        setCurrentPage(1);
      }

      setProductsList(() => {
        if (prods !== null) {
          if (prods.length >= views) {
            return prods.slice(firstProductIndex, lastProductIndex);
          } else {
            return prods;
          }
        } else {
          setCurrentPage(1);
        }
      });
    },
    [currentPage, views]
  );

  // Search
  const startFilter = useCallback(
    (prods, formValue) => {
      if (formValue !== undefined) {
        const filtredProducts = prods.filter(prod => {
          const searchProd =
            prod.product_name.toLowerCase().includes(formValue.toLowerCase()) ||
            prod.date.toLowerCase().includes(formValue.toLowerCase());

          return searchProd;
        });
        setFiltredProductsList(filtredProducts);
      } else {
        setFiltredProductsList(prods);
      }
      console.log(filtredProductsList);
    },
    [filtredProductsList]
  );

  // products for table
  React.useEffect(() => {
    props.setLoading(true);
    setAllProductsList(products);
    pagination(allProductsList);
    // startFilter(allProductsList, formValue.search);
    props.setLoading(false);
  }, []);

  React.useEffect(() => {
    // startFilter(allProductsList, formValue.search);
    pagination(allProductsList);
  }, [views, currentPage, formValue, allProductsList]);

  return (
    <section className='section products' aria-label='Таблица товаров'>
      <h1 className='section-title products__title'>Товары продавцов</h1>
      <div className='products__optoins'>
        <label className='text products__label' htmlFor='views'></label>
      </div>
      <div className='products__options'>
        <label className='text products__label' htmlFor='views'>
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
            onChange={e => setViews(e.target.value)}
          />
        </label>
        <SearchForm formValue={formValue} handleChange={handleChange} />
      </div>
      <div className='products__main'>
        <ProductsList
          productsList={productsList}
          isMatch={isMatch}
          handleMatch={handleMatch}
          handleMatchClose={handleMatchClose}
        />
      </div>
      <Pagination
        views={views}
        currentPage={currentPage}
        totalProducts={allProductsList.length}
        firstProductIndex={currentPage * views - views}
        lastProductIndex={
          currentPage * views > allProductsList.length
            ? allProductsList.length
            : currentPage * views
        }
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </section>
  );
}

export default AllProducts;
