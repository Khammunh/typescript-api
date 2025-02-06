//importing modules
import  {Schema, model,} from 'mongoose'
import Joi from 'joi'

//validation schema
export const PostschemaValidate = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    // datetime: Joi.date().required(),
    published: Joi.boolean().required(),

})
//creating an interface 
interface IPosts {
    title: string,
    description: string,
    author: string,
    // datetime: Date,
    
    published: boolean,

}
//Postschema
const postSchema = new Schema<IPosts>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    
    published: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });  // ✅ ເພີ່ມ timestamps

//creating a model
export const Post = model<IPosts>('Post', postSchema )