import Scheme from '../models/scheme.model'
import { IScheme } from '../interfaces/scheme.interface'

 class SchemaService{
    public createScheme = async (body: IScheme): Promise<IScheme> => {
        try {
          const scheme = await Scheme.create(body);
          return scheme;
        } catch (error) {
          throw new Error(`Error creating scheme: ${error.message}`);
        }
    }

 }
 export default SchemaService;