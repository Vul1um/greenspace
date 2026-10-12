const express = require("express");
const app = express();
const games = [
    {
        id: 1,
        title: "Minecraft",
        genre: "Sandbox"
    },
    {
        id: 2,
        title: "Counter-Strike 2",
        genre: "Shooter"
    },
    {
        id: 3,
        title: "The Witcher 3",
        genre: "RPG"
    }
];

const news = [
    {
        id: 1,
        title: "Dota",
        genre: "MOBA"
    }
]

app.get("/", (req, res) => {
    res.send("Добро пожаловать в каталог игр");
});

app.get("/about", (req, res) => {
    res.send("API каталога игр");
});

app.get("/games", (req, res) => {
    res.json(games);
});

app.get("/news", (req, res) => {
    res.json(news);
});

app.listen(3000, () => {
    console.log("Сервер запущен");
});
