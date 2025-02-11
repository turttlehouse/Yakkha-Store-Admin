import { Status } from "./status";


export interface User{
    id : string;
    email : string;
    username : string;
}

interface Category{
    id : string;
    categoryName : string;
}

export interface Product{
    id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productTotalStockQty: number;
    productImageUrl:string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    categoryId: string;
    User: User,
    Category: Category

}

export enum PaymentMethod{
    COD = 'cod',
    KHALTI = 'khalti',
}

interface Payment{
    paymentMethod : PaymentMethod;
}

export interface ItemDetails{
    productId : string;
    quantity : number;
}

export interface OrderData{
    phoneNumber : string;
    shippingAddress : string;
    totalAmount : number;
    paymentDetails : Payment,
    items : ItemDetails[]
}

export interface InitialState{
    products: Product[],
    users: User[],
    orders : OrderData[],
    status : Status,
    singleProduct : Product | null
}