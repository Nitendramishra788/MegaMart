const mongoose = require("mongoose");
 const  slugify = require("slugify");

 const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },

    slug:{
        type:String,
        unique:true,
    },

    parentCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        default:null,
    },

    level:{
        type:Number,
        default:0,
    },

    image:{
        type:String,
        default:"",
    },

    isActive:{
        type:Boolean,
        default:true,

    },

 },

 {
    timestamps:true
 },


);


// generate auto slug

categorySchema.pre("save", function (next) {

  if (this.isModified("name")) {

    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });

  }

  
});


// INDEXES
// categorySchema.index({ slug: 1 });

categorySchema.index({
  parentCategory: 1,
});


module.exports = mongoose.model("Category" , categorySchema);