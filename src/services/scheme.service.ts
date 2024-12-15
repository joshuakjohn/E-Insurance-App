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
    
    public getAllSchemes = async (): Promise<IScheme[]> => {
        try {
          const schemes = await Scheme.find();
          if(!schemes || schemes.length === 0) {
            throw new Error('No scheme found');
        }
          return schemes;
        } catch (error) {
         
          throw new Error(`Error fetching schemes: ${error.message}`);
        }
      };

 }
 export default SchemaService;