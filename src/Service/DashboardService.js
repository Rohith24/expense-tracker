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

        if(accounts.code === "0" && budgets.code === "0" && latestTransactions.code === "0"){
            
            const transactions = await formatTransactions(accounts.accounts, budgets.budgets, latestTransactions.transactions);
            return {
                code: accounts.code || budgets.code,
                accounts: accounts.accounts,
                budgets: budgets.budgets,
                recentTransactions: transactions,
                message: accounts.message + " " + budgets.message
            };
        }
        else{
            throw new Error(accounts.message ? accounts.message : budgets.message ? budgets.message: latestTransactions.message ? latestTransactions.message: "Error occurred");
        }
        
    } catch (error) {
        throw error;
    }

}