import { f7, Page } from 'framework7-react'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa6"
import PageTitle from '../components/pageTitle'
import store from '../js/store'
import axios from 'axios'
import { formatDate } from '../config/utils'

export default function transactionDetail({ f7router }) {
  const [transaction, setTransaction] = useState({});

  const fetchTransactions = async () => {
    try {
      const response = await axios.post(
        `https://torux.app/api/user/agentmilestones/${store.state.user.token}`,
        {}, // This is the request body, currently empty
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.user.access_token}`,
          },
        }
      );
      const transactionData = response.data;
      console.log('transaction Data', transactionData);
      setTransaction(transactionData);
    } catch (error) {
      console.error('Error fetching farmer:', error.response.data);
      f7.dialog.alert('Unable to fetch transaction data');
    }
  }  

    useEffect(() => {
      fetchTransactions();
    }, []);

    return (
    <Page name="registerFarmer">
      <div className="w-full h-auto">
        <div className="px-5 flex items-center bg-white h-[60px]">
          <button
            className="flex items-center gap-x-2"
            onClick={() => f7router.navigate('/welcome/') }
          >
            <FaChevronLeft className="text-[0.8em] text-primary-dark" />
            <h6>Back to Welcome</h6>
          </button>  
        </div>     
        <PageTitle title="Transaction Details" />
        <div className="h-full w-full p-5 flex flex-col gap-y-5">
          <div>
            <h4 className="text-lg font-bold text-slate-600">Account Balance</h4>
            <div className="w-full h-[1px] bg-slate-300 my-1" />
            <h6 className="text-3xl font-bold text-primary">{transaction?.account_balance || 'N/A'}</h6>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-600">Pending Payout</h4>
            <div className="w-full h-[1px] bg-slate-300 my-1" />
            <h6 className="text-3xl font-bold text-primary">{transaction?.total_pendingpayout || 'N/A'}</h6>
          </div>
          {transaction?.last_10withdrawals?.length > 0 && (<div>
            <h4 className="text-lg font-bold text-slate-600">Recent Withdrawals</h4>
            <div className="w-full h-[1px] bg-slate-300 my-1" />
            <div className="flex flex-col gap-y-3">{
              transaction?.last_10withdrawals?.map((transaction, index) => (
                <>
                  <div className="" key={transaction.invoiceid}>
                    <div className="flex mb-1">
                      <h6 className="w-[90px] font-bold">Amount:</h6>
                      <h6>{`Ghc ${transaction.amount}`}</h6>
                    </div>
                    <div className="flex">
                      <h6 className="w-[90px] font-bold">Date:</h6>
                      <h6>{formatDate(transaction.created_at)}</h6>
                    </div>
                  </div>
                  { (index + 1) !== transaction?.last_10withdrawals?.length  && <div className="w-full h-[1px] bg-slate-200 my-1" />}
                </>
              ))
            }</div>
          </div>)}
          {transaction?.last_10withdrawals?.length === 0 && (<div>
            <h4 className="text-lg font-bold text-slate-600">Recent Withdrawals</h4>
            <div className="w-full h-[1px] bg-slate-300 my-1" />
            <h6 className="text-xl font-bold text-primary text-slate-400">No withdrawals have been made</h6>
          </div>)}
        </div>
      </div>
    </Page>  
  )
}
