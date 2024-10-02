/* 
    Contains all functions related to the employee table.
*/

export async function getEmployees(db, req, res) {
    try {
        const [results] = await db.query("SELECT * FROM `employee`");
        return res.json(results);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
}

export async function deleteEmployee(db, req, res) {
    try {
        const employee_id = req.params.employee_id;
        const [results] = await db.query("DELETE FROM `employee` WHERE employee_id = ?");
        return res.json(results);
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
}

export async function addEmployee(db, req, res) {
  try {
    const values = [
      req.body.employee_id,
      req.body.postal_code,
      req.body.city,
      req.body.addr,
      req.body.start_date,
      req.body.hourly_pay,
      req.body.hours_logged,
      req.body.clerk,
      req.body.manager,

    ];
    const [results] = await db.query(
      "INSERT INTO employee (`employee_id`, `postal_code`, `city`, `addr`, `start_date`, `hourly_pay`, `hours_logged`, `clerk`, `manager`) VALUES (?)",
      [values]
    );
    return res.json("Employee has been added.");
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

export async function updateEmployee(db, req, res) {
  try {
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}