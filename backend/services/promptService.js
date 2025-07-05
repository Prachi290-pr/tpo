// const Prompt = require('../models/Prompt');
// const Subcategory = require('../models/Subcategory');

const connection = require("../config/dbConfig");

// async function getPromptBySubcategory(subcategoryId) {
//   const prompt = await Prompt.findBySubcategory(subcategoryId);
//   if (!prompt) throw new Error('No prompts found for this subcategory');
  
//   return {
//     text: prompt.prompt_text,
//     params: prompt.parameters ? JSON.parse(prompt.parameters) : null,
//     difficulty: prompt.difficulty_level
//   };
// }

// async function getSubcategoryDetails(subcategoryId) {
//   const details = await Subcategory.findWithCategory(subcategoryId);
//   if (!details) throw new Error('Subcategory not found');
//   return details;
// }

// module.exports = { getPromptBySubcategory, getSubcategoryDetails };


// const Prompt = require('../models/practiceTestModel/Prompt');
// const Subcategory = require('../models/practiceTestModel/Subcategory');

// class PromptService {
//   static async getPromptBySubcategory(subcategoryId) {
//     const prompt = await Prompt.findBySubcategory(subcategoryId);
//     if (!prompt) throw new Error('No prompts found for this subcategory');
    
//     return {
//       text: prompt.prompt_text,
//       params: prompt.parameters ? JSON.parse(prompt.parameters) : {},
//       difficulty: prompt.difficulty_level
//     };
//   }

//   static async getSubcategoryDetails(subcategoryId) {
//     const details = await Subcategory.findWithCategory(subcategoryId);
//     if (!details) throw new Error('Subcategory not found');
    
//     return {
//       category: details.category,
//       subcategory: details.subcategory
//     };
//   }
// }

// module.exports = PromptService;




// const Prompt = require('../models/practiceTestModel/Prompt');
// const Subcategory = require('../models/practiceTestModel/Subcategory');

// class PromptService {
//   static async getPromptBySubcategory(subcategoryId) {
//     const prompt = await Prompt.findBySubcategory(subcategoryId);
//     if (!prompt) throw new Error('No prompts found for this subcategory');

//     return {
//       text: prompt.prompt_text,
//       params: prompt.parameters ? JSON.parse(prompt.parameters) : {},
//       difficulty: prompt.difficulty_level
//     };
//   }

//   static async getSubcategoryDetails(subcategoryId) {
//     const details = await Subcategory.findWithCategory(subcategoryId);
//     if (!details) throw new Error('Subcategory not found');

//     return {
//       category: details.category,
//       subcategory: details.subcategory
//     };
//   }
// }

// module.exports = PromptService;




// const Prompt = require('../models/practiceTestModel/Prompt');
// const Subcategory = require('../models/practiceTestModel/Subcategory');

// class PromptService {
//   static getPromptBySubcategory(subcategoryId, callback) {
//     Prompt.findBySubcategory(subcategoryId, (error, prompt) => {
//       if (error) return callback(error);
//       if (!prompt) return callback(new Error('No prompts found for this subcategory'));

//       try {
//         callback(null, {
//           text: prompt.prompt_text,
//           params: prompt.parameters ? JSON.parse(prompt.parameters) : {},
//           difficulty: prompt.difficulty_level
//         });
//       } catch (parseError) {
//         callback(parseError);
//       }
//     });
//   }

//   static getSubcategoryDetails(subcategoryId, callback) {
//     Subcategory.findWithCategory(subcategoryId, (error, details) => {
//       if (error) return callback(error);
//       if (!details) return callback(new Error('Subcategory not found'));

//       callback(null, {
//         category: details.category,
//         subcategory: details.subcategory
//       });
//     });
//   }
// }

// module.exports = PromptService;

// Example usage in a route handler
// const PromptService = require('./services/PromptService');

// function someRouteHandler(req, res) {
//   const subcategoryId = req.params.id;
  
//   PromptService.getSubcategoryDetails(subcategoryId, (error, details) => {
//     if (error) {
//       console.error('Error:', error);
//       return res.status(500).json({ error: error.message });
//     }
    
//     PromptService.getPromptBySubcategory(subcategoryId, (error, prompt) => {
//       if (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ error: error.message });
//       }
      
//       res.json({
//         category: details.category,
//         subcategory: details.subcategory,
//         prompt: prompt
//       });
//     });
//   });
// }



// pool
class Prompt {
  static findBySubcategory(subcategoryId, callback) {
    const query = 'SELECT * FROM prompts WHERE subcategory_id = ?';
    connection.query(query, [subcategoryId], (error, results) => {
      if (error) return callback(error);
      if (!results || results.length === 0) {
        return callback(new Error('No prompts found for this subcategory'));
      }
      
      try {
        const prompt = results[0];
        // Ensure parameters is a string before parsing
        if (prompt.parameters && typeof prompt.parameters !== 'string') {
          prompt.parameters = JSON.stringify(prompt.parameters);
        }
        callback(null, prompt);
      } catch (err) {
        callback(err);
      }
    });
  }
}

module.exports = Prompt;