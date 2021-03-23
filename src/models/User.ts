import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const UserSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    ativo: { type: Boolean, required: false, default: true },
    created_at: { type: Date },
    updated_at: { type: Date },
  },
  {
    timestamps: true,
  },
);

UserSchema.set('toObject', { virtuals: true, getters: true });
UserSchema.set('toJSON', { virtuals: true, getters: true });

autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {
  model: 'usuarios',
  field: '_id',
  startAt: 1,
  incrementBy: 1,
});

export default mongoose.model('usuarios', UserSchema);
