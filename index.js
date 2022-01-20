import express from 'express';

const app = express();

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

app.get('/holidays', (req, res) => {
    res.send(holidays);
})

function checkHoliday(holiday) {
    const today = new Date();
    const dateHoliday = new Date(holiday.date)
    if (dateHoliday.toLocaleDateString() === today.toLocaleDateString()) return holiday; 
}

app.get('/is-today-holiday', (req, res) => {
    const holiday = holidays.filter(checkHoliday);
    if (holiday.length === 0) res.send('Não, hoje não é feriado');
    res.send(`Sim, hoje é ${holiday[0].name}`);
})

app.get('/holidays/:month', (req, res) => {
    const requiredMonth = req.params.month;
    const filteredHolidays = holidays.filter((holiday) => {
        const date = new Date(holiday.date);
        const month = String(date.getMonth() + 1);
        if (requiredMonth === month) return holiday;
    });
    if (filteredHolidays.length === 0) res.send('Não há feriados previstos para esse mês!');
    res.send(filteredHolidays);
})

app.listen(4000)