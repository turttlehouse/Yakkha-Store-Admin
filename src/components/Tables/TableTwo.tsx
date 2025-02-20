// import { Product } from '../../types/product';
// import ProductOne from '../../images/product/product-01.png';
// import ProductTwo from '../../images/product/product-02.png';
// import ProductThree from '../../images/product/product-03.png';
// import ProductFour from '../../images/product/product-04.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import React from 'react';
import { fetchProducts } from '../../store/dataSlice';

// const productData: Product[] = [
//   {
//     image: ProductOne,
//     name: 'Apple Watch Series 7',
//     category: 'Electronics',
//     price: 296,
//     sold: 22,
//     profit: 45,
//   },
//   {
//     image: ProductTwo,
//     name: 'Macbook Pro M1',
//     category: 'Electronics',
//     price: 546,
//     sold: 12,
//     profit: 125,
//   },
//   {
//     image: ProductThree,
//     name: 'Dell Inspiron 15',
//     category: 'Electronics',
//     price: 443,
//     sold: 64,
//     profit: 247,
//   },
//   {
//     image: ProductFour,
//     name: 'HP Probook 450',
//     category: 'Electronics',
//     price: 499,
//     sold: 72,
//     profit: 103,
//   },
// ];


// {
//   id: '0b5ba2f0-f0ee-431b-b93c-c78329af2dbc',
//   productName: 'Hoody',
//   productDescription: 'Yellow Color',
//   productPrice: 400,
//   productTotalStockQty: 90,
//   productImageUrl: './src/uploads/default.png',
//   createdAt: '2025-02-05T15:25:38.000Z',
//   updatedAt: '2025-02-05T15:25:38.000Z',
//   userId: 'e7c86066-7cfb-4e97-a819-a0f0afc304b9',
//   categoryId: 'e3128e4e-cfd1-4381-910f-d7e1ca0150a1',
//   User: {
//     username: 'helloadmin',
//     id: 'e7c86066-7cfb-4e97-a819-a0f0afc304b9',
//     email: 'helloadmin@gmail.com'
//   },
//   Category: { categoryName: 'Books' }
// },




const TableTwo = () => {
  const dispatch = useAppDispatch();
  
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

  console.log(SERVER_URL);

  const {products} = useAppSelector(state=>state.datas)
  // console.log(products);

  const callback = ()=>{
    dispatch(fetchProducts())
  }

  React.useEffect(callback,[])

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Products
        </h4>
      </div>

      <div className="grid grid-cols-7 border-t border-stroke py-4.5 px-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Id</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stocks</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Created At</p>
        </div>
      </div>

      {products?.map((product, id) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={id}
        >
           <div className="col-span-1 hidden items-center sm:flex">
           <div className="h-12.5 w-15 rounded-md">
                <img src={`${SERVER_URL}${product?.productImageUrl}`} alt="Product" />
              </div>
            <p className="text-sm text-black dark:text-white">
              {product?.id}
            </p>
          </div>

          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                {/* <img src={product.image} alt="Product" /> */}
              </div>
              <p className="text-sm text-black dark:text-white">
                {product?.productName}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product?.Category?.categoryName}
            </p>
          </div>
         
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              Rs.{product?.productPrice}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product?.productTotalStockQty}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{product?.createdAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
