import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const RecipeSchema: Schema = new mongoose.Schema({
  shortID: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  stepByStep: {
    type: Array,
    required: true
  },
  additionalInformation: {
    type: String,
    required: false,
    default: 'Sem informações adicionais.'
  }
});

RecipeSchema.plugin(mongoosePaginate);

export default mongoose.model('Recipes', RecipeSchema);