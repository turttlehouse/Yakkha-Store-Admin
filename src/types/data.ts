import { Status } from "./status";


export interface User{
    id : string;
    email : string;
    username : string;
    createdAt : string;
    role : string;
}

export interface Category{
    id : string;
    categoryName : string;
}

export interface Product{
    id?: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productTotalStockQty: number;
    productImageUrl:string;
    createdAt?: string;
    updatedAt?: string;
    userId: string;
    categoryId: string;
    User?: User,
    Category?: Category

}

export enum PaymentMethod{
    COD = 'cod',
    KHALTI = 'khalti',
}

interface Payment{
    paymentMethod : PaymentMethod;
    paymentStatus : string;
}

export interface ItemDetails{
    productId : string;
    quantity : number;
}

export enum OrderStatus{
    Pending = 'pending',
    Delivered = 'delivered',
    Ontheway = 'ontheway',
    Cancelled = 'cancelled',
    Preparation = 'preparation'
}

export interface OrderData{
    phoneNumber : string;
    shippingAddress : string;
    totalAmount : number;
    paymentDetails : Payment,
    items : ItemDetails[],
    id : string,
    orderStatus : OrderStatus
}

export interface SingleOrder{
    id : string;
    quantity : number;
    orderId : string;
    createdAt : string;
    // Product : Product[];
    // Order : Payment;
    Product : {
        id : string;
        productName : string;
        productPrice : number;
        productTotalStockQty : number;
        productImageUrl : string;
        categoryId : string;
        Category : {
            categoryName? : string;
        }
    };
    Order : {
        id : string;
        phoneNumber : string;
        shippingAddress : string;
        totalAmount : number;
        orderStatus : OrderStatus;
        userId : string;
        Payment : {
            paymentMethod : PaymentMethod;
            paymentStatus : string;
        }
        User :{
            username : string;
            email : string;
        }
    };
}

export interface InitialState{
    products: Product[],
    users: User[],
    orders : OrderData[],
    status : Status,
    singleProduct : Product | null,
    categories : Category[],
    singleOrder : SingleOrder[]
}