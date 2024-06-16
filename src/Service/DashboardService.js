import { toast } from "react-toastify";
import { getAccounts } from "./AccountService";
import { getBudgets } from "./BudgetService";
import { getLatestTransactions, formatTransactions } from "./TransactionService";

export async function getDashboardData() {
    try {
        const [accounts, budgets, latestTransactions] = await Promise.all([
            getAccounts(),
            getBudgets(),
            getLatestTransactions()
        ]);

        if(accounts.code === "-1"){
            toast.error(accounts.message);
        }

        
        if(budgets.code === "-1"){
            toast.error(budgets.message);
        }

        
        if(latestTransactions.code === "-1"){
            toast.error(latestTransactions.message);
        }

        let transactions = [];
        if(accounts.accounts && budgets.budgets && latestTransactions.code !== "-1"){
            transactions =  await formatTransactions(accounts.accounts, budgets.budgets, latestTransactions.transactions);
        }
        return {
            code: accounts.code || budgets.code,
            accounts: accounts.accounts,
            budgets: budgets.budgets,
            recentTransactions: transactions,
            message: accounts.message + " " + budgets.message
        };
        
    } catch (error) {
        throw error;
    }

}