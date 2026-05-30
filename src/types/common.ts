export interface Amount {
    description: string;
    amount: number | string;
    amountCreation: Date | string;
    type: string;
    id: string;
}

export type Income = number | string;