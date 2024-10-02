/* 
    Contains all functions related to the movie table.
*/

export async function getMovies(db, req, res) {
  try {
    const [results] = await db.query("SELECT * FROM `movie`");
    return res.json(results);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

export async function addMovie(db, req, res) {
  try {
    const values = [
      req.body.name,
      req.body.quality,
      req.body.language,
      req.body.genre,
      req.body.rating,
      req.body.release_date,
      req.body.price,
      req.body.quantity,
    ];
    const [results] = await db.query(
      "INSERT INTO `movie` (`name`, `quality`, `language`, `genre`, `rating`, `release_date`, `price`, `quantity`) VALUES (?)",
      [values]
    );
    return res.json("Movie has been created.");
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

export async function updateMovie(db, req, res) {
  try {
    const id = req.body.id;
    const query = "UPDATE `movie` SET `name` = ?, `quality` = ?, `language` = ?, `genre` = ?, `rating` = ?, `release_date` = ?, `price` = ?, `quantity` = ? WHERE `id` = ?";
    const values = [
      req.body.name,
      req.body.quality,
      req.body.language,
      req.body.genre,
      req.body.rating,
      req.body.release_date,
      req.body.price,
      req.body.quantity,
    ];

    const [results] = await db.query(query, [...values, id]);
    return res.json("Movie has been updated.");
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}
export async function addMovieWatchlist(db, req, res) {
  try {
    const values = [
      req.body.email,
      req.body.wishlist_id,
      req.body.name,
    ];
    const [results] = await db.query(
      "INSERT INTO contains (`email`, `wishlist_id`, `name`) VALUES (?)",
      [values]
    );
    return res.json("Movie has been added to wishlist.");
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

export async function removeMovieWatchlist(db, req, res) {
  try {
      const email = req.params.email;
      const wishlist_id = req.params.wishlist_id;
      const name = req.params.name;
      const [results] = await db.query("DELETE FROM `contains` WHERE email = ? AND wishlist_id = ? AND name = ?");
      return res.json(results);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
}

export async function deleteMovie(db, req, res) {
  try {
      const name = req.params.name;
      const [results] = await db.query("DELETE FROM `movies` WHERE name = ?");
      return res.json(results);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
}

export async function rentMovie(db, req, res){
  try {
    const values = [
      req.body.email,
      req.body.name,
      req.body.day,
      req.body.month,
      req.body.year,
      req.body.amount,
      req.body.due_date,
    ];
    const [results] = await db.query(
      "INSERT INTO `purchase_history` (`email`, 'name', 'day', 'month', 'year', `amount`, `due_date`) VALUES (?)",
      [values]
    );
    return res.json("Movie has been rented");
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}

export async function buyMovie(db, req, res){
  try {
    const values = [
      req.body.email,
      req.body.name,
      req.body.day,
      req.body.month,
      req.body.year,
      req.body.amount,
      //req.body.due_date,
    ];
    const [results] = await db.query(
      "INSERT INTO `purchase_history` (`email`, 'name', 'day', 'month', 'year', `amount`) VALUES (?)",
      [values]
    );
    return res.json("Movie has been purchased");
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
}


