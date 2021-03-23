import mongoose, { Schema } from 'mongoose';
import UserModels from '../models/User'
import autoIncrement from 'mongoose-auto-increment';

const SolicitationSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true, unique: true },
    user: { type: Number, required: true, ref: 'usuarios'},
    category: { type: String, required: true },
    protocol: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: {
      city: { type: String, required: false },
      state: { type: String, required: false },
      street: { type: String, required: false },
      number: { type: Number, required: false },
      district: { type: String, required: false },
      zip_code: { type: String, required: false },
      latitude: { type: String, required: false },
      longitude: { type: String, required: false },
    },

    // status: [
    //   {
    //     date: { type: Date },
    //     type_status: { required: true, type: Number, default: 0 },
    //     description: { type: String, required: false },
    //   },
    // ],
    // comments: [
    //   {
    //     date: { type: Date },
    //     comment: { type: String, required: true },
    //     user: { type: Number, required: true, ref: 'usuarios' },
    //   },
    // ],
    date: { type: Date, required: true },
    ativo: { type: Boolean, required: false, default: 0 },
    created_at: { type: Date },
    updated_at: { type: Date },
  },
  {
    timestamps: true,
  },
);

SolicitationSchema.set('toObject', { virtuals: true, getters: true });
SolicitationSchema.set('toJSON', { virtuals: true, getters: true });

autoIncrement.initialize(mongoose.connection);
SolicitationSchema.plugin(autoIncrement.plugin, {
  model: 'solicitacoes',
  field: '_id',
  startAt: 1,
  incrementBy: 1,
});


export default mongoose.model('solicitacoes', SolicitationSchema);
