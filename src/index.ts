import express, { Request, Response } from 'express'
import cors from 'cors'
import { PostController } from './controller/PostController'
import { UserController } from './controller/UserController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send( "Pong!" )
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

const postController = new PostController();
const userController = new UserController();
//user
//Signup
app.post('/users/signup', userController.signup);
//Login
app.post('/users/login', userController.login);

//posts
//GetAllPosts
app.get('/posts', postController.getAllPosts);
// //CreatePost
app.post('/posts', postController.createPost);
// //updatePost
app.put('/posts/:id', postController.editPost);
// //deletePost
app.delete('/posts/:id', postController.deletePost);
//likeDislike
app.put('/posts/:id/like', postController.likeDislikePost);

