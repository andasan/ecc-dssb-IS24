interface IDeveloper {
    text: string;
    id: string;
}

export interface IProduct {
    productId: number;
    productName: string;
    productOwnerName: string;
    developers: IDeveloper[];
    scrumMasterName: string;
    startDate: string;
    methodology: string;
    location: string;
}