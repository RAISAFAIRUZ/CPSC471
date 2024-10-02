/* 
    Contains all functions related to the account table.
*/

export async function verifyAccount(db, req, res) {
  try {
    const query =
      "SELECT `account_id` FROM `account` WHERE `email` = ? AND `password` = ?";
    const [results] = await db.query(query, [
      req.query.email,
      req.query.password,
    ]);
    console.log(email);
    return res.json({
      account_id: results[0].account_id,
    });
  } catch (err) {
    console.log(err);
    return res.json("Could not find user with those credentials.");
  }
}

export async function getAccountData(db, req, res) {
  try {
    const query =
      "SELECT `email`, `creation_date`, `balance`, `first_name`, `last_name` FROM `account` WHERE `account_id` = ?";
    const [results] = await db.query(query, [req.query.account_id]);
    return res.json(results);
  } catch (err) {
    console.log(err);
    return res.json("Could not find user with those credentials.");
  }
}

export async function addAccount(db, req, res) {
  try {
    const values = [
      req.body.email,
      req.body.password,
      req.body.creation_date,
      req.body.balance,
      req.body.first_name,
      req.body.last_name,
    ];

    const query1 = "INSERT INTO `customer` (`email`) VALUES (?)";

    const [results1] = await db.query(query1, [req.body.email]);

    const query2 =
      "INSERT INTO `account` (`email`, `password`, `creation_date`, `balance`, `first_name`, `last_name`) VALUES (?)";

    const [results2] = await db.query(query2, [values]);

    const [results3] = await db.query(
      "SELECT * FROM `account` WHERE `email` = ?",
      [req.body.email]
    );

    const query3 = "UPDATE `customer` SET `account_id` = ? WHERE `email` = ?";

    const [results4] = await db.query(query3, [
      results3[0].account_id,
      req.body.email,
    ]);

    return res.json("Account has been added");
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

export async function updateAccount(db, req, res) {
  try {
    const email = req.body.email;
    const query =
      "UPDATE `account` SET `password` = ?, `creation_date` = ?, `balance` = ? WHERE `email` = ?";
    const values = [
      req.body.password,
      req.body.creation_date,
      req.body.balance,
    ];
    const [results] = await db.query(query, [...values, email]);
    return res.json("Account has been updated.");
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

export async function getPurchaseHistory(db, req, res) {
  try {
    const [results] = await db.query("SELECT * FROM purchase_history WHERE `account_email` = ?", [req.query.account_email]);
    return res.json(results);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}
