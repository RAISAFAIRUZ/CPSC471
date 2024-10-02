import { useEffect, useState } from "react";
import axios from "axios";
import { fetchEmployees } from "../../lib/dbFunctions";
import { Plus } from "phosphor-react";
import AdminEmployeeCard, { EmployeeColumn } from "../../components/Admin/AdminEmployeeCard";
import dateToString from "../../lib/dateToString";

export default function AdminEmployeePage() {
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const defaultEmployee = {
        hourly_pay: "0",
        hours_logged: "0",
        postal_code: "",
        city: "",
        addr: "",
        start_date: "",
        clerk: false,
        manager: false
    };
    const [employeeData, setEmployeeData] = useState(defaultEmployee);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees(setEmployees);
    }, []);

    const handleEmployeeChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/employee", employeeData);
        } catch (err) {
            console.log(err);
        }

        setSuccess(true);
    }

    return (
        <>
            <div className="py-4">
                <div className='flex flex-col space-y-2'>
                    <h1 className="uppercase font-black text-xl">
                        Add Employee
                    </h1>
                    <div className="flex flex-row flex-wrap w-full space-x-4 bg-zinc-900 border-zinc-800 border-2 py-2 px-4 rounded-md items-center">
                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Hourly Pay</span>
                            <input
                                type={"number"}
                                step={"0.01"}
                                name={"hourly_pay"}
                                value={employeeData.hourly_pay}
                                onChange={handleEmployeeChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Address</span>
                            <input
                                type={"text"}
                                name={"addr"}
                                value={employeeData.addr}
                                onChange={handleEmployeeChange}
                                disabled={false}
                            />
                        </div>
                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Postal Code</span>
                            <input
                                type={"text"}
                                name={"postal_code"}
                                value={employeeData.postal_code}
                                onChange={handleEmployeeChange}
                                disabled={false}
                            />
                        </div>

                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Start Date</span>
                            <input
                                type={"date"}
                                name={"start_date"}
                                value={employeeData.start_date}
                                onChange={handleEmployeeChange}
                                disabled={false}
                            />
                        </div>

                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">City</span>
                            <input
                                type={"text"}
                                name={"city"}
                                value={employeeData.city}
                                onChange={handleEmployeeChange}
                                disabled={false}
                            />
                        </div>

                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Hours Logged</span>
                            <input
                                type={"number"}
                                step={"0.01"}
                                name={"hours_logged"}
                                value={employeeData.hours_logged}
                                onChange={handleEmployeeChange}
                                disabled={false}
                            />
                        </div>

                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Clerk</span>
                            <input
                                className="m-2"
                                type={"checkbox"}
                                name={"clerk"}
                                checked={employeeData.clerk}
                                onChange={() => {
                                    setEmployeeData({ ...employeeData, ["clerk"]: !employeeData.clerk });
                                }}
                                disabled={false}
                            />
                        </div>

                        <div className="flex flex-col w-[10%]">
                            <span className="border-b-2 h-fit">Manager</span>
                            <input
                                className="m-2"
                                type={"checkbox"}
                                name={"manager"}
                                checked={employeeData.manager}
                                onChange={() => {
                                    setEmployeeData({ ...employeeData, ["manager"]: !employeeData.manager });
                                }}
                                disabled={false}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <button
                            onClick={async () => {
                                setSuccess(false);
                                setErrorMessage("");

                                // Logic to send data
                                if (employeeData.employee_id == "") {
                                    setErrorMessage("Employee ID cannot be empty.");
                                    return;
                                } else if (employeeData.hourly_pay == "") {
                                    setErrorMessage("Hourly pay cannot be empty.");
                                    return;
                                } else if (employeeData.hours_logged == "") {
                                    setErrorMessage("Hours logged cannot be empty.");
                                    return;
                                }

                                try {
                                    await axios.post("http://localhost:8800/employee", employeeData);
                                } catch (err) {
                                    console.log(err);
                                }

                                setEmployeeData(defaultEmployee);

                                fetchEmployees(setEmployees);

                                setSuccess(true);
                            }}
                        >
                            <Plus className="w-8 h-8" />
                        </button>
                    </div>

                    {success ?
                        <>
                            <span>Added employee successfully!</span>
                        </>
                        :
                        null}
                    {errorMessage ?
                        <>
                            <span>{errorMessage}</span>
                        </>
                        :
                        null}
                    <h1 className="uppercase font-black text-xl">
                        Edit Employee
                    </h1>
                    {employees.map((employee) => (
                        <>
                            <AdminEmployeeCard
                                employeeId={employee.employee_id}
                                hourlyPay={employee.hourly_pay}
                                hoursLogged={employee.hours_logged}
                                postalCode={employee.postal_code}
                                city={employee.city}
                                addr={employee.addr}
                                startDate={employee.start_date}
                                clerk={employee.clerk}
                                manager={employee.manager}
                            />
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}
