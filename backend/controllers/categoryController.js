const Category = require("../models/CategoryModel")



//find a category
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort({name: "asc"}).orFail() //makes the query promise reject if no documents matched the query conditions, if not fpund, throw error
        res.json(categories) //send json response
    } catch(error) {
        next(error)
    }
}





//create new category
const newCategory = async (req, res, next) => {
    try {
        //if no category input, remind
        const {category} = req.body
        if(!category) {
            res.status(400).send("Category input is required")
        }
        //if category exists, remind, otherwise, create new category
        const categoryExists = await Category.findOne({name: category})
        if(categoryExists) {
            res.status(400).send("Category already exists")
        } else {
            const categoryCreated = await Category.create({
                name: category
            })
            res.status(201).send({categoryCreated: categoryCreated})
        }
    } catch (err) {
        next(err)
    }
}





//delete a category
const deleteCategory = async (req, res, next) => {
    // return res.send(req.params.category)
    try {
        //if choose a category to delete, find that category, and remove it
        if(req.params.category !== "Choose category") {
            const categoryExists = await Category.findOne({
                name: decodeURIComponent(req.params.category)
            }).orFail()
            await categoryExists.remove()
            res.json({categoryDeleted: true})
        }
    } catch (err) {
        next(err)
    }
}




//update or add new attribute values
const saveAttr = async (req, res, next) => {
    const {key, val, categoryChoosen} = req.body
    //if one of these three data not exist, remind
    if(!key || !val || !categoryChoosen) {
        return res.status(400).send("All inputs are required")
    }

    //find the category to be added the attributes    
    try {
        const category = categoryChoosen.split("/")[0]
        const categoryExists = await Category.findOne({name: category}).orFail()

        // if the category exists in the database, then add a value
        if(categoryExists.attrs.length > 0) {
            var keyDoesNotExistsInDatabase = true
            //map the attribute array
            categoryExists.attrs.map((item, idx) => {
                //existing category, and also existing key
                if(item.key === key) {
                    keyDoesNotExistsInDatabase = false //existing key
                    //find the value array correspond to the attri
                    var copyAttributeValues = [...categoryExists.attrs[idx].value]
                    //push to the value array of new attribute
                    copyAttributeValues.push(val)
                    var newAttributeValues = [...new Set(copyAttributeValues)] // use "Set" to ensures unique values
                    categoryExists.attrs[idx].value = newAttributeValues
                }
            })
            //no existing key
            if(keyDoesNotExistsInDatabase) {
                categoryExists.attrs.push({key: key, value: [val]})
            }
        } else {
            // if no existing category, push to the array with new category and new value
            categoryExists.attrs.push({key: key, value: [val]})
        }

        //save after updates
        await categoryExists.save()
        let cat = await Category.find({}).sort({name: "asc"})
        return res.status(201).json({categoriesUpdated: cat})
    } catch(err) {
        next(err)
    }
}

module.exports = {getCategories, newCategory, deleteCategory, saveAttr}
