import express, { Express, Request, Response } from 'express';
import client from '../config/pg';

const router = express.Router();

// // Connect to the database
// const connect = client.connect().then(() => { console.log('Connected to PostgreSQL database'); })
//                       .catch((err) => { console.error('Error connecting to PostgreSQL database', err); });
//                       // change to async

async function connect() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database. PG');
  } catch (err) {
    console.error('Error connecting to PostgreSQL database', err);
  }
}
connect();

// Get all posts
router.get('/posts', async (req: Request, res: Response) => {
  // connect().then(() => { console.log('Connected to PostgreSQL database');

  //   // Execute SQL queries here
  //   // + promise
  //   client.query('SELECT * FROM posts', (err, result) => {
  //     if (err) { console.error('Error executing query', err); } else { res.send(result.rows); }

  //     // Close the connection when done
  //     // client.end()
  //     //       .then(() => { console.log('Connection to PostgreSQL closed'); })
  //     //       .catch((err) => { console.error('Error closing connection', err); });
  //   });
  // })
  // .catch((err) => { console.error('Error connecting to PostgreSQL database', err); });

  // try {
    // await connect();
    const p1 = new Promise((resolve, reject) => {
      client.query('SELECT * FROM posts', (err: any, result: any) => {
        if (err) {
          console.error('GET /posts => Error executing query:', err);
          reject(err);
        } else {
          // res.send(result.rows);
          console.error('GET /posts => Result:', result);
          resolve(result.rows);
        }
      });
    });

    // p1
    //   .then((result) => {})
    //   .catch((err) => {});

    try {
      const result2 = await p1;
      console.error('GET /posts => Result2:', result2);
    } catch (err) {
      console.log('err: ', err);
    }

  //} catch (err) {
    //console.error('Error connecting to PostgreSQL database', err); };
});


// Get by id
router.get('/posts/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await client.query(`SELECT * FROM posts WHERE id = ${id}`, (err: any, result: any) => {
      if (err) { console.error('Error executing query', err); } else { res.send(result.rows); }
    });
  } catch (err) {
    console.error('Error connecting to PostgreSQL database', err);
  }
});


// Update
router.put('/posts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, article } = req.body;
  // console.log('title =', title);
  // console.log('article =', article);

  const update = `UPDATE posts SET title = ($1), article = ($2) WHERE id = ${id}`;
  const values = [title, article];

  connect().then(() => { console.log('Connected to PostgreSQL database');
    client.query(update, values, (err: any, result: any) => {
      if (err) { console.error('Error executing query', err); } else { console.log('Data updated successfully'); res.send(result); }
      // client.end();
    });
  })
  .catch((err) => { console.error('Error connecting to PostgreSQL database', err); });
});

// Delete
router.delete('/posts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const del = `DELETE FROM posts WHERE id = ${id}`;

  connect().then(() => { console.log('Connected to PostgreSQL database');
    client.query(del, (err: any, result: any) => {
      if (err) { console.error('Error executing query', err); } else { console.log('Data deleted successfully.' + ' ID #' + id); res.send(result); }
      // client.end();
    });
  })
  .catch((err) => { console.error('Error connecting to PostgreSQL database', err); });
});

// Insert
router.post('/posts', async (req: Request, res: Response) => {
  const { title, article } = req.body;

  const addPost = `INSERT INTO posts (title, article, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())`;
  const values = [title, article];

  connect().then(() => { console.log('Connected to PostgreSQL database');
    client.query(addPost, values, (err: any, result: any) => {
      if (err) { console.error('Error executing query', err); } else { console.log('Data was inserted successfully.'); res.send(result); }
      // client.end();
    });
  })
  .catch((err) => { console.error('Error connecting to PostgreSQL database', err); });
});

// Create a new table
router.post('/create_table/:name', async (req: Request, res: Response) => {
  // const { name, column1, column2 } = req.body;
  const { name } = req.params;
  const { column1, column2 } = req.body;

  // const createTable = `CREATE TABLE $1 (id serial PRIMARY KEY, $2 varchar(255), $3 varchar(255))`;
  const createTable = 'CREATE TABLE ' + name + ' (id serial PRIMARY KEY, ' + column1 + ' varchar(255), ' + column2 + ' varchar(255))';
  const values = [name, column1, column2];

  console.log('name =', name);
  // console.log('name2 =', name2);

  connect().then(() => { console.log('Connected to PostgreSQL database');
    client.query(createTable, (err: any, result: any) => {
      if (err) { console.error('Error executing query', err); } else { console.log('A new table was created successfully.'); res.send(result); }
      // client.end();
    });
  })
  .catch((err) => { console.error('Error connecting to PostgreSQL database', err); });
});

// Delete the table
router.delete('/delete_table/:name', async (req: Request, res: Response) => {
  const { name } = req.params;
  const deleteTable = 'DROP TABLE ' + name;

  connect().then(() => { console.log('Connected to PostgreSQL database');
    client.query(deleteTable, (err: any, result: any) => {
      if (err) { console.error('Error executing query', err); } else { console.log('The table was deleted successfully.'); res.send(result); }
      // client.end();
    });
  })
  .catch((err) => { console.error('Error connecting to PostgreSQL database', err); });
});

// All users
router.get('/users', async (req: Request, res: Response) => {
  connect().then(() => { console.log('Connected to PostgreSQL database');
    client.query('SELECT * FROM users', (err: any, result: any) => {
      if (err) { console.error('Error executing query', err); } else { res.send(result.rows); }
      // client.end();
    });
  })
  .catch((err) => { console.error('Error connecting to PostgreSQL database', err); });
});

// Add a new user
router.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const addUser = `INSERT INTO users (name, email) VALUES ($1, $2)`;
  const values = [name, email];

  connect().then(() => { console.log('Connected to PostgreSQL database');
    client.query(addUser, values, (err: any, result: any) => {
      if (err) { console.error('Error executing query', err); } else { console.log('Data was inserted successfully.'); res.send(result); }
      // client.end();
    });
  })
  .catch((err) => { console.error('Error connecting to PostgreSQL database', err); });
});

export default router;
