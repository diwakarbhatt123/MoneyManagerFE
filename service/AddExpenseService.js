import {Expense} from "../co/Expense";

export class AddExpenseService {
     saveExpense(expense: Expense): string {
        console.log("Called Save expense ",JSON.stringify(expense));
        // return fetch('https://mywebsite.com/endpoint/', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(expense)
        // }).then((response) => {
        //     return response;
        // }).catch((error) => {
        //     console.error(error)
        // });
    }
}