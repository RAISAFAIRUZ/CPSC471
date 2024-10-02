import dateToString from "../lib/dateToString";

export default function PurchaseCard({
    purchaseDate,
    amount,
    dueDate
}) {
    return (
        <>
            <div className="flex flex-col">
                <span><b>Due date: </b>{dateToString(new Date(purchaseDate))}</span>
                <span><b>Amount: </b>{amount}</span>
                {dueDate ?
                    <span><b>Due date: </b>{dateToString(new Date(dueDate))}</span>
                    : null}
            </div>
        </>
    );
}