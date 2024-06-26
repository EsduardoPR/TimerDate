import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const desiredPort = 9000;


app.use(express.json());
app.use(cors());

const Hour: Response[] = [];
const Minute: Response[] = [];
const Seg: Response[] = [];

app.get("/Hour", (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    Hour.push(res);

    req.on('close', () => {
        res.end();
    });

    hora()
});
app.get("/Minute", (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    Minute.push(res);

    req.on('close', () => {
        res.end();
    });

    minutos()
});
app.get("/Seg", (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    Seg.push(res);

    req.on('close', () => {
        res.end();
    });

    segundos()
});

const hora = () => {
    const now = new Date();
    const hora = `event: Hour\n` + `data: ${JSON.stringify(now.getHours())}\n\n`;
    for (let hour of Hour) {
        hour.write(hora);
    }
}
const minutos = () => {
    const now = new Date();
    const minutos = `event: Minute\n` + `data: ${JSON.stringify(now.getMinutes())}\n\n`;
    for (let minute of Minute) {
        minute.write(minutos);
    }
}
const segundos = () => {
    const now = new Date();
    const segundos = `event: Second\n` + `data: ${JSON.stringify(now.getSeconds())}\n\n`;
    for (let Second of Seg) {
        Second.write(segundos);
    }
}

setInterval(hora, 1000);
setInterval(minutos, 1000);
setInterval(segundos, 1000);


app.listen(desiredPort, () => {
    console.log(`Servidor Express en el puerto ${desiredPort}`);
});
