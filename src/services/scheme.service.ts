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
    
      public getAllSchemes = async (page: number, limit: number): Promise<{ data: IScheme[]; total: number; page: number; totalPages: number }> => {
        try {
            const total = await Scheme.countDocuments(); // Total number of schemes
            const totalPages = Math.ceil(total / limit); // Total number of pages
            const data = await Scheme.find()
                .skip((page - 1) * limit) // Skip records for previous pages
                .limit(limit);           // Limit the number of records fetched

            return {
                data,
                total,
                page,
                totalPages,
            };
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