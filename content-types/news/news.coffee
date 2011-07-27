{Schema} = mongoose = require 'mongoose'

News = new Schema
    title     : String
  , body      : String
  , date      : Date


mongoose.model 'News', News

exports.News = News

