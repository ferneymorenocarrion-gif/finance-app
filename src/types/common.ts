export interface Amount {
    description: string;
    amount: number | string;
    amountCreation: Date;
    type: string;
}

export type Income = number | string;