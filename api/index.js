const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const router = express.Router();
app.use('/api', router);

// ===== HEALTH CHECK =====
app.get('/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ status: 'ok', db_test: rows[0].result });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ===== USERS CRUD =====
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name และ email จำเป็นต้องมี' });
    }
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'ไม่พบ user' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await pool.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'ไม่พบ user' });
    }
    res.json({ id: req.params.id, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'ไม่พบ user' });
    }
    res.json({ message: 'ลบสำเร็จ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== CATEGORIES CRUD =====
router.post('/categories', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'name จำเป็นต้องมี' });
    }
    const [result] = await pool.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || null]
    );
    res.status(201).json({ id: result.insertId, name, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'ไม่พบหมวดหมู่' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/categories/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'name จำเป็นต้องมี' });
    }
    const [result] = await pool.query(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description || null, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'ไม่พบหมวดหมู่' });
    }
    res.json({ id: req.params.id, name, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'ไม่พบหมวดหมู่' });
    }
    res.json({ message: 'ลบสำเร็จ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== PRODUCTS CRUD =====
// หมายเหตุ: /products/low-stock ต้องอยู่ก่อน /products/:id เสมอ

router.get('/products/low-stock', async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 5;
    const [rows] = await pool.query(`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.quantity < ?
      ORDER BY p.quantity ASC
    `, [threshold]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    const { sku, name, price, quantity, category_id } = req.body;
    if (!sku || !name) {
      return res.status(400).json({ error: 'sku และ name จำเป็นต้องมี' });
    }

    if (category_id) {
      const [cat] = await pool.query('SELECT id FROM categories WHERE id = ?', [category_id]);
      if (cat.length === 0) {
        return res.status(400).json({ error: 'ไม่พบ category_id นี้' });
      }
    }

    const [result] = await pool.query(
      'INSERT INTO products (sku, name, price, quantity, category_id) VALUES (?, ?, ?, ?, ?)',
      [sku, name, price || 0, quantity || 0, category_id || null]
    );
    res.status(201).json({ id: result.insertId, sku, name, price, quantity, category_id });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'SKU นี้มีอยู่แล้ว' });
    }
    res.status(500).json({ error: err.message });
  }
});

router.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'ไม่พบสินค้า' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { sku, name, price, quantity, category_id } = req.body;
    if (!sku || !name) {
      return res.status(400).json({ error: 'sku และ name จำเป็นต้องมี' });
    }

    if (category_id) {
      const [cat] = await pool.query('SELECT id FROM categories WHERE id = ?', [category_id]);
      if (cat.length === 0) {
        return res.status(400).json({ error: 'ไม่พบ category_id นี้' });
      }
    }

    const [result] = await pool.query(
      'UPDATE products SET sku = ?, name = ?, price = ?, quantity = ?, category_id = ? WHERE id = ?',
      [sku, name, price || 0, quantity || 0, category_id || null, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'ไม่พบสินค้า' });
    }
    res.json({ id: req.params.id, sku, name, price, quantity, category_id });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'SKU นี้มีอยู่แล้ว' });
    }
    res.status(500).json({ error: err.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'ไม่พบสินค้า' });
    }
    res.json({ message: 'ลบสำเร็จ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== STOCK ADJUSTMENT =====
router.patch('/stock/adjust', async (req, res) => {
  const { product_id, adjust_quantity, note } = req.body;

  if (!product_id || adjust_quantity === undefined) {
    return res.status(400).json({ error: 'product_id และ adjust_quantity จำเป็นต้องมี' });
  }
  if (!Number.isInteger(adjust_quantity) || adjust_quantity === 0) {
    return res.status(400).json({ error: 'adjust_quantity ต้องเป็นจำนวนเต็มและไม่เป็น 0 (เช่น +10 หรือ -5)' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [rows] = await conn.query(
      'SELECT id, quantity FROM products WHERE id = ? FOR UPDATE',
      [product_id]
    );
    if (rows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: 'ไม่พบสินค้า' });
    }

    const currentQty = rows[0].quantity;
    const newQty = currentQty + adjust_quantity;

    if (newQty < 0) {
      await conn.rollback();
      return res.status(400).json({
        error: `จำนวนคงเหลือไม่พอ (คงเหลือ ${currentQty}, ขอปรับ ${adjust_quantity})`
      });
    }

    await conn.query('UPDATE products SET quantity = ? WHERE id = ?', [newQty, product_id]);

    const type = adjust_quantity > 0 ? 'IN' : 'OUT';
    await conn.query(
      'INSERT INTO stock_transactions (product_id, type, quantity, note) VALUES (?, ?, ?, ?)',
      [product_id, type, Math.abs(adjust_quantity), note || null]
    );

    await conn.commit();
    res.json({
      product_id,
      previous_quantity: currentQty,
      adjusted_by: adjust_quantity,
      new_quantity: newQty,
      type
    });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});