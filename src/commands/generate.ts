
import { GluegunToolbox } from 'gluegun'


module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      generateModel,
      //template: { generate },
      print: { info, error },
    } = toolbox

    const type = parameters.first;
    const name = parameters.second;

    info(parameters);

    switch (type.toLowerCase()) {
      case 'model': {
        await generateModel('src/models', name)
        break;
      }

      default: {
        error("Type must be passed");
        return;
      }
    }

    //


    // await generate({
    //   template: 'model.js.ejs',
    //   target: `models/${name}-model.js`,
    //   props: { name },
    // })

    // info(`Generated file at models/${name}-model.js`)

  },
}
