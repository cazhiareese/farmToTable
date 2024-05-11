import mongoose  from "mongoose";

await mongoose.connect( 'mongodb+srv://cazhia:E13UKHwTNcHF3PzJ@farm.kzqurki.mongodb.net/ftt?retryWrites=true&w=majority&appName=farm', {  
 useNewUrlParser: true, useUnifiedTopology: true });


const Product = mongoose.model('products',{
    name: String, 
    description: String, 
    imageURL: String,
    type: Number, 
    price: Number, 
    stock: Number
})

const getAllProducts = async(req,res) =>{
    let sorter = req.query.sortBy;
    let orderBy = parseInt(req.query.orderBy)
    
    let product_list = await Product.find().sort({
        [sorter]: orderBy
    })

    res.send(product_list)
}

export {getAllProducts}