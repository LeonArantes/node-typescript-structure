import SolicitationModel from '@models/Solicitation';

interface SolicitationIndex {
  limit: string;
  offset: string;
  fields: string;
  ativo: boolean;
}

interface SolicitationShow {
  id?: string;
  limit: string;
  offset: string;
  fields: string;
  ativo: boolean;
}

interface SolicitationStore {
  user?: number;
  category?: string;
  protocol?: number;
  address: Array<AddressSolicitation>;
  ativo: boolean;
}

interface AddressSolicitation {
  city: string;
  state: string;
  street: string;
  number: 10;
  district: string;
  zip_code: string;
}

interface SolicitationUpdate {
  id?: string;
  nome?: string;
  email?: string;
  senha?: string;
  ativo: boolean;
}

class SolicitationsService {
  async index(dataSolicitationIndex: SolicitationIndex) {
    return await SolicitationModel.find(dataSolicitationIndex.ativo && { ativo: dataSolicitationIndex.ativo  }).populate('user')
      .skip(dataSolicitationIndex && dataSolicitationIndex.offset ? parseInt(dataSolicitationIndex.offset) : null)
      .limit(dataSolicitationIndex && dataSolicitationIndex.limit ? parseInt(dataSolicitationIndex.limit) : null).exec();
  }

  async show(dataSolicitationShow: SolicitationShow) {
    console.log(dataSolicitationShow)
    return await SolicitationModel.find();

  }

  async store(dataSolicitationStore: SolicitationStore) {
    return await SolicitationModel.create(dataSolicitationStore);
  }

  async update(dataSolicitationUpdate: SolicitationUpdate, user_id: string) {
   
  }
}

export default new SolicitationsService();
