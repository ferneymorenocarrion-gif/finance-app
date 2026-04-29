export interface Amount {
    description: string;
    amount: number | string;
    amountCreation: Date;
    type: string;
    id: string;
}

export type Income = number | string;