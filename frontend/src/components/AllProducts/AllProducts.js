import React, { useCallback } from 'react';

import products from '../Products/Products';
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
  const { formValue, errorMessage, isValid, handleChange, resetForm } = useValidate();

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
<<<<<<< HEAD
    /*props.setLoading(true);*/
    setAllProductsList(products);
    /*props.setLoading(false);*/
  }, []);

  //console.log(formValue);
    // props.setLoading(true);
    //setAllProductsList(products);
    // props.setLoading(false);
    //console.log(allProductsList);
    // localStorage.setItem('allProductsList', JSON.stringify(allProductsList));

  //console.log(formValue.search);

  /*React.useEffect(() => {
    if (formValue.search !== undefined) {
      console.log(formValue.search);
      const filtredProducts = allProductsList.filter(prod => {
=======
    // props.setLoading(true);
    console.log(products);
    // if (localStorage.allProductsList) {
    //   const allProductsLS = JSON.parse(localStorage.getItem('allProductsList'));
    //   setAllProductsList(allProductsLS);
    //   console.log(allProductsList);
    // } else {
    setAllProductsList(products);
    // localStorage.setItem('allProductsList', JSON.stringify(allProductsList));
    // }

    // props.setLoading(false);
    console.log(allProductsList);
    startFilter(allProductsList, formValue.search);
  }, []);

  //   console.log(formValue.search);

  // Фильтрация поискового запроса
  const startFilter = useCallback((prods, formValue) => {
    if (formValue !== undefined) {
      console.log(formValue);
      const filtredProducts = prods.filter(prod => {
>>>>>>> b4fac7750277a477a42570d22f1311bd397fe044
        const searchProd =
          prod.product_name.toLowerCase().includes(formValue.toLowerCase()) ||
          //   prod.product_key.toLowerCase().includes(formValue.toLowerCase()) ||
          prod.date.toLowerCase().includes(formValue.toLowerCase());
        //   || prod.price.toLowerCase().includes(formValue.toLowerCase());
        return searchProd;
      });
      setFiltredProductsList(filtredProducts);
    } else {
      setFiltredProductsList(prods);
    }
<<<<<<< HEAD
    console.log(filtredProductsList);

    // localStorage.setItem('filtredProducts', JSON.stringify(filtredProducts));
  }, [formValue]);

  React.useEffect(() => {
    /*props.setLoading(true);*/
    /*const firstProductIndex = currentPage * views - views;
    console.log(firstProductIndex);
=======
  }, []);

  React.useEffect(() => {
    // if (formValue.search !== undefined) {
    //   console.log(formValue.search);
    //   const filtredProducts = allProductsList.filter(prod => {
    //     const searchProd =
    //       prod.product_name.toLowerCase().includes(formValue.search.toLowerCase()) ||
    //       //   prod.product_key.toLowerCase().includes(formValue.search.toLowerCase()) ||
    //       prod.date.toLowerCase().includes(formValue.search.toLowerCase());
    //     //   || prod.price.toLowerCase().includes(formValue.search.toLowerCase());
    //     return searchProd;
    //   });
    //   setFiltredProductsList(filtredProducts);
    // } else {
    //   setFiltredProductsList(allProductsList);
    // }
    // console.log(filtredProductsList);
    startFilter(allProductsList, formValue.search);
>>>>>>> b4fac7750277a477a42570d22f1311bd397fe044

    const firstProductIndex = currentPage * views - views;
    const lastProductIndex =
      currentPage * views > filtredProductsList.length
        ? filtredProductsList.length
        : currentPage * views;

    if (firstProductIndex >= filtredProductsList.length) {
      setCurrentPage(1);
    }
<<<<<<< HEAD

    /*props.setLoading(false);*/
  //}, [views, currentPage]);

    /*setProductsList(() => {
=======
    setProductsList(() => {
>>>>>>> b4fac7750277a477a42570d22f1311bd397fe044
      if (filtredProductsList !== null) {
        if (filtredProductsList.length >= views) {
          return filtredProductsList.slice(firstProductIndex, lastProductIndex);
        } else {
          return filtredProductsList;
        }
      } else {
        setCurrentPage(1);
      }
<<<<<<< HEAD
  }, [views, currentPage, formValue.search]);*/
=======
    });
  }, [views, currentPage, formValue.search]);
>>>>>>> b4fac7750277a477a42570d22f1311bd397fe044

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
