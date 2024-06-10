import { getAccounts } from "./AccountService";
import { getBudgets } from "./BudgetService";

export async function getDashboardData() {
    try {
        const accounts = await getAccounts();
        const budget = await getBudgets();
        return {
            code: accounts.code || budget.code,
            accounts: accounts.accounts,
            budgets: budget.budgets,
            message: accounts.message + " " + budget.message
        };
    } catch (error) {
        throw new Error("Network request failed");
    }

}