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

      public getSchemeById = async (schemeId: string): Promise<IScheme | null> => {
        try {
          const scheme = await Scheme.findById(schemeId);
          if (!scheme) {
            throw new Error('Scheme not found');
          }
    
          return scheme;
        } catch (error) {
          throw new Error(`Error fetching scheme by ID: ${error.message}`);
        }
      };
      public updateScheme = async (id: string, updateData: Partial<IScheme>): Promise<IScheme | null> => {
        try {
          const updatedScheme = await Scheme.findByIdAndUpdate(id, updateData, { new: true });
          if (!updatedScheme) {
            throw new Error('Scheme not found');
          }
          return updatedScheme;
        } catch (error) {
          throw new Error(`Error updating scheme: ${error.message}`);
        }
      };

      public deleteScheme = async (schemeId: string): Promise<IScheme | null> => {
        try {
          const deletedScheme = await Scheme.findByIdAndDelete(schemeId);
          if (!deletedScheme) {
            throw new Error('Scheme not found');
          }
          return deletedScheme;
        } catch (error) {
          throw new Error(`Error deleting scheme: ${error.message}`);
        }
      };
    }
   
 export default SchemaService;