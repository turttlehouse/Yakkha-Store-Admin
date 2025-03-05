import React from 'react'
import { useParams } from 'react-router-dom'
import { handleOrderStatusById, handlePaymentStatusById, singleOrder } from '../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { OrderStatus } from '../../types/data';
import { socket } from '../../App';

//single product ordered

    // [
    //     {
    //       id: '8d466c1e-e5f1-44b5-954c-b6ae4ba36371',
    //       quantity: 1,
    //       createdAt: '2025-02-21T11:12:52.000Z',
    //       updatedAt: '2025-02-21T11:12:52.000Z',
    //       orderId: '32ae0352-c333-4db0-b0ca-6d2466313f31',
    //       productId: null,
    //       Product: null,
    //       Order: {
    //         id: '32ae0352-c333-4db0-b0ca-6d2466313f31',
    //         phoneNumber: '9812345678',
    //         shippingAddress: 'itahari',
    //         totalAmount: 5,
    //         orderStatus: 'ontheway',
    //         createdAt: '2025-02-21T11:12:52.000Z',
    //         updatedAt: '2025-02-21T11:21:13.000Z',
    //         paymentId: '54fd78d0-89ee-4abc-b30f-e03d610c8a3d',
    //         userId: 'dc067c0f-366a-4717-89b2-e0acc279c30f',
    //         Payment: { paymentMethod: 'cod', paymentStatus: 'unpaid' },
    //         User: { username: 'hari', email: 'hari@gmail.com' }
    //       }
    //     }
    //   ]

// 2 product ordered
// [
//     {
//       id: 'fdc97e50-d30c-4015-945e-55f75799b9c1',
//       quantity: 1,
//       createdAt: '2025-02-24T02:58:13.000Z',
//       updatedAt: '2025-02-24T02:58:13.000Z',
//       orderId: '269f8b24-d01e-4386-b04c-4c66d9941513',
//       productId: '95cd25d4-f1b2-4a0e-820c-ce119b8927ed',
//       Product: {
//         id: '95cd25d4-f1b2-4a0e-820c-ce119b8927ed',
//         productName: 'T-Shirt',
//         productDescription: 'Yellow Color',
//         productPrice: 800,
//         productTotalStockQty: 90,
//         productImageUrl: '1740136141517-images (1).jpeg',
//         createdAt: '2025-02-21T11:09:01.000Z',
//         updatedAt: '2025-02-21T11:09:01.000Z',
//         userId: null,
//         categoryId: '293d9f8f-3388-44c6-8b51-a288a914af75',
//         Category: { categoryName: 'Clothing' }
//       },
//       Order: {
//         id: '269f8b24-d01e-4386-b04c-4c66d9941513',
//         phoneNumber: '9712345678',
//         shippingAddress: 'pokhara',
//         totalAmount: 1700,
//         orderStatus: 'preparation',
//         createdAt: '2025-02-24T02:58:13.000Z',
//         updatedAt: '2025-02-25T02:41:23.000Z',
//         paymentId: '2b04629b-0b95-4889-9cd5-52c708f51b53',
//         userId: '6bacdcb8-6a22-4acb-81bd-c3a6c1b504d4',
//         Payment: { paymentMethod: 'cod', paymentStatus: 'unpaid' },
//         User: { username: 'sabin', email: 'sabin@gmail.com' }
//       }
//     },
//     {
//       id: 'fe33afd1-a56a-484e-9124-5b1796f6f6c7',
//       quantity: 1,
//       createdAt: '2025-02-24T02:58:13.000Z',
//       updatedAt: '2025-02-24T02:58:13.000Z',
//       orderId: '269f8b24-d01e-4386-b04c-4c66d9941513',
//       productId: '62768b87-7bca-4561-8672-fe3be2bff7be',
//       Product: {
//         id: '62768b87-7bca-4561-8672-fe3be2bff7be',
//         productName: 'Jeans Pants',
//         productDescription: 'Yellow Color',
//         productPrice: 900,
//         productTotalStockQty: 80,
//         productImageUrl: '1740136212387-download.jpeg',
//         createdAt: '2025-02-21T11:10:12.000Z',
//         updatedAt: '2025-02-21T11:10:12.000Z',
//         userId: null,
//         categoryId: '293d9f8f-3388-44c6-8b51-a288a914af75',
//         Category: { categoryName: 'Clothing' }
//       },
//       Order: {
//         id: '269f8b24-d01e-4386-b04c-4c66d9941513',
//         phoneNumber: '9712345678',
//         shippingAddress: 'pokhara',
//         totalAmount: 1700,
//         orderStatus: 'preparation',
//         createdAt: '2025-02-24T02:58:13.000Z',
//         updatedAt: '2025-02-25T02:41:23.000Z',
//         paymentId: '2b04629b-0b95-4889-9cd5-52c708f51b53',
//         userId: '6bacdcb8-6a22-4acb-81bd-c3a6c1b504d4',
//         Payment: { paymentMethod: 'cod', paymentStatus: 'unpaid' },
//         User: { username: 'sabin', email: 'sabin@gmail.com' }
//       }
//     }
//   ]
    
    // console.log(orderDetails)

const SingleOrder : React.FC = () => {
    const SERVER_URL = (import.meta as any).env.VITE_APP_SERVER_URL;

    const {id} = useParams<{id : string}>();

    const {singleOrder : orderDetails} = useAppSelector((state)=>state.datas);
    console.log(orderDetails)
    const dispatch = useAppDispatch();

    React.useEffect(()=>{
        if(id){
            dispatch(singleOrder(id));
        }

    },[id])

    // const [orderStatus, setOrderStatus] = React.useState(orderDetails[0]?.Order?.orderStatus as string);


    const handleOrderStatusChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        // console.log(e.target.value);
        const newOrderStatus = e.target.value as OrderStatus
        // setOrderStatus(newOrderStatus)
        // setOrderStatus(e.target.value);

        if(id){
            // console.log(id);

            socket.emit('updatedOrderStatus',{
                status : e.target.value,
                orderId : id,
                userId : orderDetails[0]?.Order?.userId
            })

            // This way, you are passing the new status directly from the event target, 
            // ensuring it is the most up-to-date value.
            dispatch(handleOrderStatusById(id,newOrderStatus))
            // The issue is that the orderStatus state is not updated immediately after 
            // calling setOrderStatus. React state updates are asynchronous, so the orderStatus
            //  value inside handleOrderStatusChange might not reflect the latest change when 
            // you call handleOrderStatusById.
            // dispatch(handleOrderStatusById(id,status:orderStatus))
        }
    }

    // const [statePaymentStatus, setStatePaymentStatus] = React.useState(orderDetails[0]?.Order?.Payment?.paymentStatus as string);
    // console.log(statePaymentStatus);

    const handlePaymentChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        console.log(e.target.value);
        // setStatePaymentStatus(e.target.value);
        if(id){

            dispatch(handlePaymentStatusById(id,e.target.value))
        }

    }

    // React.useEffect(()=>{
    //     if(orderDetails && orderDetails.length > 0){
    //         setStatePaymentStatus(orderDetails[0]?.Order?.Payment?.paymentStatus as string);
    //     }

    // },[orderDetails])

  return (
    <div className="py-[100px] dark:bg-gray-200 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">


    {/* Heading */}
    <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-xl dark:text-black lg:text-xl font-semibold leading-7 lg:leading-9 text-gray-600">Order Id&nbsp;{id}</h1>
        <p className="text-base dark:text-gray-800 font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
    </div>

    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    
        {/*customer cart, summary & shipping */}

        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            
            {/* Customer Cart */}
            <div className="flex flex-col justify-start items-start text-black  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                
                <p className="text-lg md:text-xl text-black  font-semibold leading-6 xl:leading-5">My Order</p>

                {
                    orderDetails && orderDetails.length > 0 && orderDetails.map((order)=>{
                        // console.log(order);


//                         {
//     id: '81244176-4734-4023-b587-5dcf074d73a9',
//     quantity: 2,
//     createdAt: '2025-02-24T02:28:59.000Z',
//     updatedAt: '2025-02-24T02:28:59.000Z',
//     orderId: '59148134-d582-483b-84bd-0c0946d32ab9',
//     productId: '62768b87-7bca-4561-8672-fe3be2bff7be',
//     Product: {
//       id: '62768b87-7bca-4561-8672-fe3be2bff7be',
//       productName: 'Jeans Pants',
//       productDescription: 'Yellow Color',
//       productPrice: 900,
//       productTotalStockQty: 80,
//       productImageUrl: '1740136212387-download.jpeg',
//       createdAt: '2025-02-21T11:10:12.000Z',
//       updatedAt: '2025-02-21T11:10:12.000Z',
//       userId: null,
//       categoryId: '293d9f8f-3388-44c6-8b51-a288a914af75',
//       Category: { categoryName: 'Clothing' }
//     },
//     Order: {
//       id: '59148134-d582-483b-84bd-0c0946d32ab9',
//       phoneNumber: '9812345678',
//       shippingAddress: 'itahari',
//       totalAmount: 5,
//       orderStatus: 'pending',
//       createdAt: '2025-02-24T02:28:59.000Z',
//       updatedAt: '2025-02-24T02:28:59.000Z',
//       paymentId: '520d7256-2590-4bae-bd0d-9e94b861f6db',
//       userId: 'dc067c0f-366a-4717-89b2-e0acc279c30f',
//       Payment: { paymentMethod: 'cod', paymentStatus: 'unpaid' },
//       User: { username: 'hari', email: 'hari@gmail.com' }
//     }
//   }
                    
                        return(

                            <div  className="mt-4 p-2 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img className="w-full hidden md:block" src={`${SERVER_URL}${order?.Product?.productImageUrl}`} alt="product" />
                                    <img className="w-full md:hidden" src={`${SERVER_URL}${order?.Product?.productImageUrl}`} alt="product" />

                                </div>
    
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    
                                        <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">{order?.Product?.productName}</h3>
    
                                    </div>
    
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base  xl:text-lg leading-6">Rs.{order?.Product?.productPrice}</p>
                                        <p className="text-base  xl:text-lg leading-6 text-gray-800">Qty:{order?.quantity}</p>
                                        <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">Rs.{order?.Product?.productPrice*order?.quantity}</p>
                                    </div>
    
                                </div>

                            </div>



                         )
                    })
                }
            

            </div>


            {/* summary & shipping */}
            <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                
                {/* summary */}
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                    
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        
                        <div className="flex justify-between w-full">
                            <p className="text-base dark:text-white leading-4 text-gray-800">Payment Method</p>
                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{orderDetails[0]?.Order?.Payment?.paymentMethod}</p>
                        </div>

                        <div className="flex justify-between items-center w-full">
                            <p className="text-base dark:text-white leading-4 text-gray-800">Payment Status</p>
                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{orderDetails[0]?.Order?.Payment?.paymentStatus}</p>
                        </div>

                        <div className="flex justify-between items-center w-full">
                            <p className="text-base dark:text-white leading-4 text-gray-800">Order Status</p>
                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{orderDetails[0]?.Order?.orderStatus}</p>
                        </div>

                    </div>

                    <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                        <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">Rs.{orderDetails[0]?.Order?.totalAmount}</p>
                    </div>

                </div>


                {/* shipping */}
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                    
                    <div className="flex justify-between items-start w-full">
                    
                        <div className="flex justify-center items-center space-x-4">
                        
                            <div className="w-8 h-8">
                                <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                            </div>

                            <div className="flex flex-col justify-start items-center">
                                <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">Delivery Charge<br /><span className="font-normal">Delivery within 24 Hours</span></p>
                            </div>

                        </div>

                        <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs.100</p>
                    
                    </div>

                    

                </div>

            </div>


        </div>

            {/* Shipping Address  */}
            <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                
                <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full  w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                    
                
                    <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                        
                        <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                            
                            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer Details</h3>
                                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">User:{orderDetails[0]?.Order?.User?.username}</p>
                                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address :{orderDetails[0]?.Order?.shippingAddress}</p>
                                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Phone Number :{orderDetails[0]?.Order?.phoneNumber} </p>
                                
                                   
                                    <label htmlFor="countries" className="block mb-2 p-2 rounded bg-blue-700 text-white text-sm font-medium  dark:text-white">Update Order Status</label>
                                   
                                    <select onChange={handleOrderStatusChange}  id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {/* <option value={filteredOrder?.orderStatus}>{filteredOrder?.orderStatus}</option> */}
                                        <option value="pending">Pending</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="ontheway">On the Way</option>
                                        <option value="preparation">Preparation</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>

                                    <label htmlFor="countries" className="block mb-2 p-2 rounded bg-blue-700 text-white text-sm font-medium  dark:text-white">Update Payment Status</label>
                                   
                                    <select
                                    //  value={statePaymentStatus}
                                     onChange={handlePaymentChange}  id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="unpaid">Unpaid</option>
                        
                                    </select>


                                {/* {
                                filteredOrder?.orderStatus !=="cancelled" &&(
                                    <>
                                    
                                        <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Update Order</button>
                                        <button onClick={deleteOrder} class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Delete Order</button>
                                        <button onClick={cancelOrder} class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Cancel Order</button>
                                    
                                    </>
                                )
                            } */}
                            </div>
                            
                        

                        </div>


                        {/* <div class="flex mt-2 w-full justify-center items-center md:justify-start md:items-start"> */}

                            {/* {
                                filteredOrder?.orderStatus !=="cancelled" &&(
                                    <>
                                    
                                        <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Update Order</button>
                                        <button onClick={deleteOrder} class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Delete Order</button>
                                        <button onClick={cancelOrder} class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-40 2xl:w-full text-base font-medium leading-4 text-gray-800">Cancel Order</button>
                                    
                                    </>
                                )
                            } */}
                        {/* </div> */}

                    </div>

                </div>

            </div>


    </div>

</div>
  )
}

export default SingleOrder
