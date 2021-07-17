
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
const jwtConfig = require('../util/jwt')
const app = require('../app')
const Subsection = require('../models/subsection.model')
const ssl = process.env.HTTP_ACTIVE

exports.register = async (req, res) => {
    const {firstName, lastName, email, address, phoneNumber, password, confirmPassword, subsectionId} = req.body
    if (password !== confirmPassword) {
        return res.status(400).json({
            status: 'failed',
            message: 'A palavra-passe e a confirmação não coincidem.'
        })
    }
    if (subsectionId) {
        const idSplit = subsectionId.split('')
        if (!idSplit || !idSplit[1]) {
            return res.status(400).json({
                status: 'failed',
                message: 'Código de grupo inválido.'
            })
        }
        const subsectionExists = await Subsection.findOne({
            where: {
                id: idSplit[1],
                sectionId: idSplit[0]
            }
        })
        if (!subsectionExists) {
            return res.status(400).json({
                status: 'failed',
                message: 'Não existe nenhum grupo com o código ' + sectionId + '.'
            })
        }
    }
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user) {
            return res.status(400).json({
                status: 'failed',
                message: 'Já existe um utilizador com o email indicado.'
            })
        }
        return bcrypt.hash(password, bcryptSalt)
    }).then(hashedPw => {
        const newUser = new User({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            password: hashedPw,
            subsectionId
        })
        return newUser.save().catch(err => {
            res.status(400).json({
                status: 'failed',
                message: err.errors[0].message,
            })
        })
    }).then(() => {
        return res.status(201).json({
            status: 'success',
            message: 'O utilizador foi registado com sucesso.'
        })
    }).catch(err => {
        res.status(400).json({
            status: 'failed',
            message: err.errors[0].message,
        })
    })
}

exports.login = (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body
    User.findOne({
        where: {
            email
        }
    }).then(user => {
        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'Utilizador ou senha inválidos!'  //Não divulgamos apenas que o email não existe por razões de segurança
            })
        }
        bcrypt.compare(password, user.password).then(result => {
            if (!result) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Utilizador ou senha inválidos!'  //Não divulgamos apenas que a senha está errada por razões de segurança
                })
            } else {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION,
                    algorithm: process.env.JWT_ALGORITHM
                })
                res.cookie('jwt', token, {
                    httpOnly: ssl,
                    secure: false,
                    //sameSite: 'secure'
                })
                console.log(process.env.HTTP_ACTIVE)
                return res.status(200).json({
                    status: 'success',
                    message: 'Sessão iniciada',
                    token: token
                })
            }
        }).catch(err => {
            res.status(202).json({
                status: 'failed',
                message: err
            })
        })
    })
}

exports.verify = async (req, res, next) => {
    const userToken = req.cookies.jwt
    if (!userToken) {
        return res.status(401).json({
            status: 'failed',
            message: 'Não tem sessão iniciada.'
        })
    }
    jwt.verify(userToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 'failed',
                message: 'O token não é válido.'
            })
        } else {
            // Verifica se utilizador ao qual o token pertence ainda existe
            const user = await User.findByPk(decoded.id)
            if (!user) {
                return res.status(401).json({
                    status: 'failed',
                    message: 'O utilizador já não existe.'
                })
            }
            req.user = user
            next()
        }
    })
}

exports.logout = (req, res) => {
    if (req.cookies.jwt) {
        res.clearCookie('jwt').status(200).json({
            status: 'success',
            message: 'Sessão terminada.'
        })
    } else {
        res.status(401).json({
            status: 'failed',
            message: 'JWT inválido.'
        })
    }
}