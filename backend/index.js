const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Item = require('./model/item');
const app = express();
const { Rcon } = require("rcon-client");

const { connect, sync } = require('./database');
const User = require('./model/user');
const ranks = require('./model/ranks');

async function initDB() {
    await connect();
    await sync();
}

initDB();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.get('/', async (req, res) => {
    res.send('test');
});

app.get('/Item', async (req, res) => {
    const item = await Item.findAll();
    res.json(item);
});

app.get('/ranks', async (req, res) => {
    const rank = await ranks.findAll();
    res.json(rank);
});

app.post('/login', async (req, res) => {
    const saltRounds = 10;
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(404).send({ status: false, error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ status: false, error: 'Invalid password' });
    }
    const tokon = jwt.sign({ realname: user.realname }, 'secret', { expiresIn: '1d' });
    res.status(200).json({ status: true, data: tokon });
});

app.get('/user/:token', async (req, res) => {
    const token = req.params.token;
    jwt.verify(token, 'secret', async (err, decoded) => {
        if (err) return res.status(401).json({ status: false, error: 'Invalid token' });

        try {
            const data = await User.findOne({ where: { realname: decoded.realname } });
            if (!data) return res.status(404).json({ status: false, error: 'User not found' });
            
            const  { realname, point, id, username } = data;

            return res.status(200).json({
                status: true,
                data: {realname, point, username, id}
            });
        } catch (error) {
            return res.status(500).json({ status: false, error: 'Server error' });
        }
    });
});


app.post("/buy", async (req, res) => {
    const { itemId, userId, quantity } = req.body; 

    if (!itemId || !userId || !quantity) {
        return res.status(400).json({ status: false, message: "Missing itemId, userId, or quantity" });
    }

    const item = await Item.findByPk(itemId);
    if (!item) return res.status(404).json({ status: false, message: "Item not found" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ status: false, message: "User not found" });

    const totalPrice = item.price * quantity;
    if (user.point < totalPrice) {
        return res.status(400).json({ status: false, message: "คุณมี point ไม่พอ" });
    }

    try {
        const rcon = await Rcon.connect({
            host: "127.0.0.1",
            port: 25575,
            password: "preecha_06333",
        });

        const itemCommand = item.command
            .replace("%player%", user.username)
            .replace("%quantity%", quantity);
            
        await rcon.send(itemCommand);
        await rcon.end();

        res.json({ status: true, message: "คุณซื้อสำเร็จ", newPoint: user.point });
        user.point -= totalPrice;
        await user.save();
    } catch (error) {
        console.error("RCON Error:", error);
        res.status(500).json({ status: false, message: "เซิฟไม่ได้ออนไลน์" });
    }
});

app.post("/buyrank", async (req, res) => {
    const { rankId, userId, quantity, idrank} = req.body; 
    console.log("Received rankId:", idrank);

    if (!rankId || !userId || !quantity) {
        return res.status(400).json({ status: false, message: "Missing itemId, userId, or quantity" });
    }

    if (!rankId || !userId || !quantity) {
        return res.status(400).json({ status: false, message: "Missing itemId, userId, or quantity" });
    }

    const rank = await ranks.findByPk(rankId);
    if (!rank) return res.status(404).json({ status: false, message: "Item not found" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ status: false, message: "User not found" });

    const totalPrice = ranks.price * quantity;
    if (user.point < totalPrice) {
        return res.status(400).json({ status: false, message: "คุณมี point ไม่พอ" });
    }
    
    if(idrank > 0 && idrank == user.rank){
        try {
            const rcon = await Rcon.connect({
                host: "127.0.0.1",
                port: 25575,
                password: "preecha_06333",
            });
    
            const itemCommand = rank.command
                .replace("%player%", user.username)
                .replace("%quantity%", quantity);
                
            await rcon.send(itemCommand);
            await rcon.end();
    
            res.json({ status: true, message: "คุณซื้อสำเร็จ", newPoint: user.point });
            user.point -= totalPrice;
            user.rank += 1;
            await user.save();
        } catch (error) {
            console.error("RCON Error:", error);
            res.status(500).json({ status: false, message: "เซิฟไม่ได้ออนไลน์" });
        }
    } 
    
    if(idrank == 0 && rankId > user.rank) {
        user.point -= totalPrice;
        user.rank = rankId;
        await user.save();

        try {
            const rcon = await Rcon.connect({
                host: "127.0.0.1",
                port: 25575,
                password: "preecha_06333",
            });
    
            const itemCommand = item.command
                .replace("%player%", user.username)
                .replace("%quantity%", quantity);
                
            await rcon.send(itemCommand);
            await rcon.end();
    
            res.json({ status: true, message: "คุณซื้อสำเร็จ", newPoint: user.point });
        } catch (error) {
            console.error("RCON Error:", error);
            res.status(500).json({ status: false, message: "เซิฟไม่ได้ออนไลน์" });
        }
    }else{
        return res.status(404).json({ status: false, message: "คุณไม่สามารถซื้อแรงที่ต่ำกว่าได้" });
    }
});


app.listen(3001, () => {
    console.log("http://localhost:3001/");
});
