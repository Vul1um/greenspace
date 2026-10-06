const http = require("http");

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8"
    });

    response.end("Сервер успешно работает");
});

server.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});
