import ErrorHandler from "../Middleware/ErrorHandler.js"
import Category from "../Models/Category.js"

export const addCategory = async(req,res, next) => {
    const { name } = req.body
    if(name === "") return next(new ErrorHandler("Enter name properly!", 400))
    
    const ifExists = await Category.findOne({name})

    if(ifExists) return next(new ErrorHandler("Category already exists!", 400))
    
    const response = await Category.create({
        name
    })

    if(response) {
        res.json({
            message: "Category Added Successfully!"
        })
    } else {
        res.json({
            message: "Something went wrong!"
        })
    }
}

export const getCategory = async(req,res,next) => {
    const allCategory = await Category.find({})
    return res.json({
        allCategory
    })
}