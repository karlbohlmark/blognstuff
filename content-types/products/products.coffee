{Schema} = mongoose = require 'mongoose'

Products = new Schema
    Name     : String

mongoose.model 'Products', Products

exports.Products = Products

