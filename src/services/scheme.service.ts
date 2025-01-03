import Scheme from '../models/scheme.model'
import { IScheme } from '../interfaces/scheme.interface'
import redisClient from '../config/redis';

 class SchemaService{
    public createScheme = async (body: IScheme): Promise<IScheme> => {
        try {
          const scheme = await Scheme.create(body);

           // Invalidate cache for all schemes
           await redisClient.flushAll();

          return scheme;
        } catch (error) {
          throw new Error(`Error creating scheme: ${error.message}`);
        }
    }
    
      public getAllSchemes = async (planId:string,page: number, limit: number): Promise<{ data: IScheme[]; total: number; page: number; totalPages: number; source: string }> => {
        const cacheKey = `schemes:planId=${planId}:page=${page}:limit=${limit}`;

        try {
            const total = await Scheme.countDocuments(); // Total number of schemes
            const totalPages = Math.ceil(total / limit); // Total number of pages
            const data = await Scheme.find({ planId })
            .skip((page - 1) * limit)
            .limit(limit);
            // Cache the data for 60 seconds
            await redisClient.setEx(cacheKey, 60, JSON.stringify({ data, total, page, totalPages }));

            return {
                data,
                total,
                page,
                totalPages,
                source: 'Database'
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

          // Invalidate cache for this specific scheme and all schemes
          await redisClient.del(`schemes:${id}`);
          await redisClient.del('schemes:all');

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

          // Invalidate cache for this specific scheme and all schemes
          await redisClient.del(`schemes:${schemeId}`);
          await redisClient.del('schemes:all');
          
          return deletedScheme;
        } catch (error) {
          throw new Error(`Error deleting scheme: ${error.message}`);
        }
      };

      public search = async (search: string, page: number, limit: number): Promise<any> => {
        try {
            const searchResult = await Scheme.find({$or: [{ schemeName: { $regex: search, $options:'i' } },{ description: { $regex: search, $options:'i' } }]}).skip((page - 1) * limit) .limit(limit); 
            if (searchResult.length === 0) {
                throw new Error('No results found');
            }
            return { results: searchResult};
         } catch (error) {
            throw new Error(`Error performing search: ${error.message}`);
        }
    };

    public filter = async (sortOrder: 'asc' | 'desc'): Promise<any> => {
      try {
        const sortDirection = sortOrder === 'asc' ? 1 : -1;
        const filterResult = await Scheme.find().sort({ premium: sortDirection });
    
        if (filterResult.length === 0) {
          throw new Error('No results found');
        }
    
        return filterResult;
      } catch (error) {
        throw new Error(`Error sorting the schemes: ${error.message}`);
      }
    };
     
}
   
 export default SchemaService;  