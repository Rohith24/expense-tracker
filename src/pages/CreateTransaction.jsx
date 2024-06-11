import 'rsuite/DatePicker/styles/index.css';
import { addTransactionAction } from "../actions/addTransaction";
import { getAccounts } from "../Service/AccountService";
import { getBudgets } from "../Service/BudgetService";
import AddTransaction from '../components/AddTransaction';
import { useLoaderData } from 'react-router-dom';
import { RecentTransactions } from '../components/RecentTransactions';

export async function AddTransactionAction({request}){
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    return await addTransactionAction(formData);
}

export async function createTransactionLoader(){

    const [accountsData, budgetsData] = await Promise.all([
      getAccounts(),
      getBudgets(),
    ]);
    const accounts = accountsData.accounts;
    const budgets = budgetsData.budgets;

    return { accounts, budgets }
}


const CreateTransaction = () => {
    
    const {accounts, budgets} = useLoaderData()
    return (
        <AddTransaction accounts={accounts} budgets={budgets} />
    )
}

export default CreateTransaction