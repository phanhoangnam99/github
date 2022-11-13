const express = require('express');
const app = express();


app.use(express.json());
app.use(express.static("."))

app.listen(8080, () => { })





app.get('/', (req, res) => {
    let findProxyForURL = () => {
        return "PROXY 192.168.249.141:10809"
    }

    res.send(findProxyForURL())
})