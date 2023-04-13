import express  from "express"
import cors from 'cors'
import morgan from "morgan"
//importamos nuestro enrutador
import blogRoutes from './routes/routes.js'

const app = express()

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Routes
app.use('/', blogRoutes)

// Routes que no existen
app.use((req, res, next) => {
  res.status(404).json({
    message: 'endPoind not found'
  })
})

export default app;