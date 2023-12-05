export interface Ifriend {
    name: string;
    payments : Ipayment[]
}

export interface Ipayment {
    costID : number;
    cost : number;
    reciver: string;
    payed: boolean;
}