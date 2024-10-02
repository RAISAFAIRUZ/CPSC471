import { Pencil, Trash, Check } from "phosphor-react";
import { useState } from "react";
import axios from "axios";
import dateToString from "../../lib/dateToString";

export function EmployeeColumn({
    title,
    name,
    value,
    handleChange,
    editable,
    type,
    className,
    checked,
}) {
    return (
        <>
            <div className={`flex flex-col max-w-[10%] min-w-sm`}>
                <span className="border-b-2 h-fit overflow-scroll">{title}</span>
                <input
                    className={`${className}`}
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    disabled={!editable}
                    defaultChecked={checked}
                />
            </div>
        </>
    );
}

export default function AdminEmployeeCard({
    employeeId,
    hourlyPay,
    hoursLogged,
    postalCode,
    city,
    addr,
    startDate,
    clerk,
    manager
}) {
    const [editable, setEditable] = useState(false);

    const [employeeData, setEmployeeData] = useState({
        employee_id: employeeId,
        hourly_pay: hourlyPay,
        hours_logged: hoursLogged,
        postal_code: postalCode,
        city: city,
        addr: addr,
        start_date: startDate !== null ? dateToString(new Date(startDate)) : "",
        clerk: clerk,
        manager: manager,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    }

    return (
        <>
            <div className="flex flex-row flex-wrap w-full space-x-4 bg-zinc-900 border-zinc-800 border-2 py-2 px-4 rounded-md items-center my-2">
                <span className="w-[4%]">{employeeData.employeeId}</span>
                <EmployeeColumn
                    title="City"
                    name="city"
                    value={employeeData.city}
                    handleChange={handleChange}
                    editable={editable}
                    type="text"
                />

                <EmployeeColumn
                    title="Address"
                    name="addr"
                    value={employeeData.addr}
                    handleChange={handleChange}
                    editable={editable}
                    type="text"
                />

                <EmployeeColumn
                    title="Postal Code"
                    name="postal_code"
                    value={employeeData.postal_code}
                    handleChange={handleChange}
                    editable={editable}
                    type="text"
                />

                <EmployeeColumn
                    title="Start Date"
                    name="start_date"
                    value={employeeData.start_date}
                    handleChange={handleChange}
                    editable={editable}
                    type="date"
                />

                <EmployeeColumn
                    title="Hourly Pay"
                    name="hourly_pay"
                    value={employeeData.hourly_pay}
                    handleChange={handleChange}
                    editable={editable}
                    type="text"
                />

                <EmployeeColumn
                    title="Hours Logged"
                    name="hours_logged"
                    value={employeeData.hours_logged}
                    handleChange={handleChange}
                    editable={editable}
                    type="text"
                />

                <EmployeeColumn
                    className="m-2"
                    title="Clerk"
                    name="clerk"
                    value={employeeData.clerk}
                    handleChange={handleChange}
                    editable={editable}
                    type="checkbox"
                    checked={employeeData.clerk === 1}
                />

                <EmployeeColumn
                    className="m-2"
                    title="Manager"
                    name="manager"
                    value={employeeData.manager}
                    handleChange={handleChange}
                    editable={editable}
                    type="checkbox"
                    checked={employeeData.manager === 1}
                />

                <div className="flex flex-row">
                    <button
                        onClick={async () => {
                            setEditable(!editable);
                            if (editable) {
                                const confirmed = confirm("Are you sure you want to update this employee?");
                                if (!confirmed) return;
                                // Send data to DB
                                console.log("Sending data to DB...");
                                try {
                                    await axios.put("http://localhost:8800/employee/" + employeeId, employeeData);
                                } catch (err) {
                                    console.log(err);
                                }
                                console.log("Sent data to DB");
                            }
                        }}
                    >
                        {!editable ?
                            <Pencil className="w-8 h-8" />
                            :
                            <Check className="w-8 h-8" />
                        }
                    </button>
                    <button>
                        <Trash className="w-8 h-8" />
                    </button>
                </div>
            </div>
        </>
    )
}