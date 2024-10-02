import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Layout from "../components/Layout";
import { fetchAccountData, fetchPurchaseHistory } from "../lib/dbFunctions";
import dateToString from "../lib/dateToString";
import PurchaseCard from "../components/PurchaseCard";

function AccountField({
  type,
  name,
  value
}) {
  return (
    <>
      <div className={`flex flex-col w-fit`}>
        <span className="font-bold text-lg uppercase">{name}</span>
        <input
          type={type}
          name={name}
          value={value}
        // onChange={handleChange}
        // disabled={!editable}
        />
      </div>
    </>
  )
}

export default function ProfilePage({ }) {
  const [account, setAccount] = useState({});
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const accountId = localStorage.getItem("user");
    fetchAccountData(setAccount, Number(accountId));
  }, []);

  useEffect(() => {
    fetchPurchaseHistory(setPurchaseHistory, account.email);
  }, [account]);

  return (
    <>
      <Layout>
        <h1 className="font-black text-3xl uppercase mb-4">Profile Settings</h1>
        {account ?
          <div className="p-2 flex flex-row space-x-4">
            <div className="flex flex-col">
              <span className="font-bold text-lg uppercase">Account Creation Date</span>
              <span className="px-4">{dateToString(new Date(account.creation_date))}</span>
              <span className="font-bold text-lg uppercase">Account Balance</span>
              <span className="px-4"><b>CAD $</b> {account.balance}</span>
              <AccountField
                type={"text"}
                name={"first name"}
                value={account.first_name}
              />
              <AccountField
                type={"text"}
                name={"last name"}
                value={account.last_name}
              />
              <AccountField
                type={"text"}
                name={"email"}
                value={account.email}
              />
              <AccountField
                type={"text"}
                name={"password"}
                value={""}
              />
            </div>
            <div className="flex flex-col border-l border-slate-600 px-4">
              <span className="font-bold text-lg uppercase">Purchase History</span>
              {
                purchaseHistory.map((purchase) => (
                  <>
                    <PurchaseCard
                      purchaseDate={purchase.purchase_date}
                      amount={purchase.amount}
                      dueDate={purchase.due_date}
                    />
                  </>
                ))
              }
            </div>
          </div>
          : null}
      </Layout>
    </>
  )
}