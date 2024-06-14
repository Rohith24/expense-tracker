import 'rsuite/DatePicker/styles/index.css';
import { addTransactionAction } from "../actions/addTransaction";
import { getAccounts } from "../Service/AccountService";
import { getBudgets } from "../Service/BudgetService";
import TransactionForm from '../components/TransactionForm';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { RecentTransactions } from '../components/RecentTransactions';

export async function AddTransactionAction({request}){
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    let response = await addTransactionAction(formData);
    if(response.code === '0'){
        return redirect("/");
    }
    return response;
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
        <TransactionForm title="Add Transaction" accounts={accounts} budgets={budgets} />
    )
}

export default CreateTransaction