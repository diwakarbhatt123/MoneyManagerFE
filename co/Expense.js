export class Expense {
    merchant: string;
    date: Date;
    amount: number;
    paidTo: string;
    category: string;
    recurring: string;

    constructor(merchant: string,
                date: Date,
                amount: number,
                paidTo: string,
                category: string,
                recurring: string) {
        this.merchant = merchant;
        this.date = date;
        this.paidTo = paidTo;
        this.category = category;
        this.recurring = recurring;
    }
}