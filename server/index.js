const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'detailstudio',
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error('❌ Ошибка подключения к MySQL:', err);
        return;
    }
    console.log('✅ Подключено к MySQL базе данных');
});

app.get('/api/services', (req, res) => {
    db.query('SELECT * FROM services ORDER BY id DESC', (err, results) => {
        if (err) {
            console.error('Ошибка получения услуг:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        res.json(results);
    });
});

app.get('/api/services/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM services WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Ошибка получения услуги:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Услуга не найдена' });
        }
        res.json(results[0]);
    });
});

app.post('/api/services', (req, res) => {
    const { name, icon, description, price } = req.body;
    
    if (!name || !icon || !description || !price) {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }
    
    db.query(
        'INSERT INTO services (name, icon, description, price) VALUES (?, ?, ?, ?)',
        [name, icon, description, price],
        (err, result) => {
            if (err) {
                console.error('Ошибка добавления услуги:', err);
                return res.status(500).json({ message: 'Ошибка сервера' });
            }
            
            db.query('SELECT * FROM services WHERE id = ?', [result.insertId], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Ошибка получения добавленной услуги' });
                }
                res.status(201).json(results[0]);
            });
        }
    );
});

app.put('/api/services/:id', (req, res) => {
    const id = req.params.id;
    const { name, icon, description, price } = req.body;
    
    db.query(
        'UPDATE services SET name = ?, icon = ?, description = ?, price = ? WHERE id = ?',
        [name, icon, description, price, id],
        (err, result) => {
            if (err) {
                console.error('Ошибка обновления услуги:', err);
                return res.status(500).json({ message: 'Ошибка сервера' });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Услуга не найдена' });
            }
            
            db.query('SELECT * FROM services WHERE id = ?', [id], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Ошибка получения обновленной услуги' });
                }
                res.json(results[0]);
            });
        }
    );
});

app.delete('/api/services/:id', (req, res) => {
    const id = req.params.id;
    
    db.query('DELETE FROM services WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Ошибка удаления услуги:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Услуга не найдена' });
        }
        
        res.json({ message: 'Услуга удалена' });
    });
});

app.get('/api/reviews', (req, res) => {
    db.query('SELECT * FROM reviews WHERE is_approved = TRUE ORDER BY date DESC', (err, results) => {
        if (err) {
            console.error('Ошибка получения отзывов:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        res.json(results);
    });
});

app.get('/api/admin/reviews', (req, res) => {
    db.query('SELECT * FROM reviews ORDER BY date DESC', (err, results) => {
        if (err) {
            console.error('Ошибка получения отзывов:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        res.json(results);
    });
});

app.post('/api/reviews', (req, res) => {
    const { name, car, rating, comment } = req.body;
    
    if (!name || !rating || !comment) {
        return res.status(400).json({ message: 'Имя, рейтинг и комментарий обязательны' });
    }
    
    db.query(
        'INSERT INTO reviews (name, car, rating, comment, is_approved) VALUES (?, ?, ?, ?, ?)',
        [name, car || null, rating, comment, false],
        (err, result) => {
            if (err) {
                console.error('Ошибка добавления отзыва:', err);
                return res.status(500).json({ message: 'Ошибка сервера' });
            }
            
            db.query('SELECT * FROM reviews WHERE id = ?', [result.insertId], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Ошибка получения добавленного отзыва' });
                }
                res.status(201).json(results[0]);
            });
        }
    );
});

app.put('/api/admin/reviews/:id/approve', (req, res) => {
    const id = req.params.id;
    
    db.query('UPDATE reviews SET is_approved = TRUE WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Ошибка одобрения отзыва:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Отзыв не найден' });
        }
        
        db.query('SELECT * FROM reviews WHERE id = ?', [id], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Ошибка получения отзыва' });
            }
            res.json(results[0]);
        });
    });
});

app.delete('/api/admin/reviews/:id', (req, res) => {
    const id = req.params.id;
    
    db.query('DELETE FROM reviews WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Ошибка удаления отзыва:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Отзыв не найден' });
        }
        
        res.json({ message: 'Отзыв удален' });
    });
});

// ==================== PORTFOLIO ROUTES ====================

app.get('/api/portfolio', (req, res) => {
    db.query('SELECT * FROM portfolio ORDER BY id DESC', (err, results) => {
        if (err) {
            console.error('Ошибка получения работ:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        res.json(results);
    });
});

app.get('/api/portfolio/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM portfolio WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Ошибка получения работы:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Работа не найдена' });
        }
        res.json(results[0]);
    });
});

app.post('/api/portfolio', (req, res) => {
    const { title, car, category, image_path, description } = req.body;
    
    if (!title || !category || !image_path) {
        return res.status(400).json({ message: 'Название, категория и ссылка на изображение обязательны' });
    }
    
    db.query(
        'INSERT INTO portfolio (title, car, category, image_path, description) VALUES (?, ?, ?, ?, ?)',
        [title, car || null, category, image_path, description || null],
        (err, result) => {
            if (err) {
                console.error('Ошибка добавления работы:', err);
                return res.status(500).json({ message: 'Ошибка сервера' });
            }
            
            db.query('SELECT * FROM portfolio WHERE id = ?', [result.insertId], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Ошибка получения добавленной работы' });
                }
                res.status(201).json(results[0]);
            });
        }
    );
});

app.put('/api/portfolio/:id', (req, res) => {
    const id = req.params.id;
    const { title, car, category, image_path, description } = req.body;
    
    db.query(
        'UPDATE portfolio SET title = ?, car = ?, category = ?, image_path = ?, description = ? WHERE id = ?',
        [title, car || null, category, image_path, description || null, id],
        (err, result) => {
            if (err) {
                console.error('Ошибка обновления работы:', err);
                return res.status(500).json({ message: 'Ошибка сервера' });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Работа не найдена' });
            }
            
            db.query('SELECT * FROM portfolio WHERE id = ?', [id], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Ошибка получения обновленной работы' });
                }
                res.json(results[0]);
            });
        }
    );
});

app.delete('/api/portfolio/:id', (req, res) => {
    const id = req.params.id;
    
    db.query('DELETE FROM portfolio WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Ошибка удаления работы:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Работа не найдена' });
        }
        
        res.json({ message: 'Работа удалена' });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Ошибка авторизации:', err);
            return res.status(500).json({ success: false, message: 'Ошибка сервера' });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Неверный email или пароль' 
            });
        }
        
        const user = results[0];
        const { password: _, ...userWithoutPassword } = user;
        
        res.json({
            success: true,
            message: 'Вход выполнен успешно',
            user: userWithoutPassword
        });
    });
});

app.get('/api/health', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            return res.json({ status: 'OK', message: 'Server is running, but DB error', db: err.message });
        }
        res.json({ 
            status: 'OK', 
            message: 'Server is running', 
            db: 'Connected',
            test: results[0].solution
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`📦 Подключение к MySQL: detailstudio`);
    console.log(`📋 Доступные маршруты:`);
    console.log(`   GET  /api/health - проверка`);
    console.log(`   GET  /api/services - все услуги`);
    console.log(`   POST /api/services - добавить услугу`);
    console.log(`   GET  /api/reviews - одобренные отзывы`);
    console.log(`   POST /api/reviews - добавить отзыв`);
    console.log(`   GET  /api/portfolio - все работы`);
    console.log(`   POST /api/portfolio - добавить работу`);
    console.log(`   POST /api/login - авторизация`);
});