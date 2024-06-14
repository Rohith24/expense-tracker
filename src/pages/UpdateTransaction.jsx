import 'rsuite/DatePicker/styles/index.css';
import { addTransactionAction } from "../actions/addTransaction";
import { getAccounts } from "../Service/AccountService";
import { getBudgets } from "../Service/BudgetService";
import TransactionForm from '../components/TransactionForm';
import { useLoaderData } from 'react-router-dom';
import { RecentTransactions } from '../components/RecentTransactions';
import { getTransaction } from '../Service/TransactionService';

export async function AddTransactionAction({request}){
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    return await addTransactionAction(formData);
}


export async function updateTransactionLoader({params}){
    
    const [budgetsData, accountsData, data] = await Promise.all([
        getBudgets(),
        getAccounts(),
        getTransaction(params.id)
    ]);
  
    const transaction = data.transaction;
    const budgets = budgetsData.budgets;
    const accounts = accountsData.accounts;
    return { transaction, budgets,accounts }
}


const UpdateTransaction = () => {
    
    const {transaction, budgets,accounts} = useLoaderData()
    return (
        <TransactionForm title={"Edit Transaction"} isEdit={true} accounts={accounts} budgets={budgets} transaction={transaction} />
    )
}

export default UpdateTransaction