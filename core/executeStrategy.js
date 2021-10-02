const checkMissingFunctions = require("./utils/checkMissingFunctions");

module.exports = (sequence) => {
  return async (story, ...args) => {
    const storyContext = requireStory(story);
    const globalContext = requireGlobal();

    const context = {
      ...storyContext,
      ...globalContext,
    };

    const handlerFunctions = Object.keys(context);
    let missingFunctions = checkMissingFunctions(handlerFunctions, sequence);

    if (!missingFunctions.length) {
      let executionContext = Object.assign(
        {
          storyName: story,
        },
        ...args
      );

      try {
        for (const ord of sequence) {
          executionContext[`${ord}Result`] = await context[ord].apply(null, [
            executionContext,
          ]);
        }

        return executionContext;
      } catch (error) {
        throw error;
      }
    } else {
      throw {
        statusCode: 500,
        message: "Missing Functions or Files",
        missingFunctions,
      };
    }
  };
};
