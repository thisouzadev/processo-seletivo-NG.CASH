import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
const cors = require('cors');
// const bodyParser = require('body-parser');

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())
	// app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cors());
	app.use(routes)

	console.log(`Api rodando na porta 3001`);
	return app.listen(process.env.PORT|| 3001)
})
