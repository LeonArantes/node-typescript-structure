import UsersModels from '@models/User';

interface UserIndex {
  limit: string;
  offset: string;
  fields: string;
  ativo: boolean;
}

interface UserShow {
  id?: string;
  limit: string;
  offset: string;
  fields: string;
  ativo: boolean;
}

interface UserStore {
  nome?: string;
  email?: string;
  senha?: string;
  ativo: boolean;
}

interface updateData {
  id?: string;
  nome?: string;
  email?: string;
  senha?: string;
  ativo: boolean;
}

class UsersServices {
  async index(dataUserIndex: UserIndex) {
      return UsersModels.find(dataUserIndex.ativo && { ativo: dataUserIndex.ativo })
        .skip(dataUserIndex && dataUserIndex.offset ? parseInt(dataUserIndex.offset) : null)
        .limit(dataUserIndex && dataUserIndex.limit ? parseInt(dataUserIndex.limit) : null);
   
  }

  async show(dataUserShow: UserShow) {
    return UsersModels.find({
      id: parseInt(dataUserShow.id),
    });
  }

  async store(dataUserStore: UserStore) {
    return await UsersModels.create(dataUserStore);
  }

  async update(dataDB: updateData, userId: string) {
  
    console.log('Testr')
    const response = await UsersModels.findOneAndUpdate(
      {
        _id: parseInt(userId),
      },
      {
        $set: {
        nome: dataDB.nome,
        email: dataDB.email,
        senha: dataDB.senha,
        ativo: dataDB.ativo,
        }
      },
      result => {
        if (result) {
          return result;
        }
      },
    );

    return response;
  }
}

export default new UsersServices();
