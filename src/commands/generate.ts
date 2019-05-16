
import { GluegunToolbox } from 'gluegun'


module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      generateModel,
      //template: { generate },
      print: { info },
    } = toolbox

    const type = parameters.first
    const name = parameters.second

    if (type === 'model') {
      await generateModel('src/models', name)
    }


    //


    // await generate({
    //   template: 'model.js.ejs',
    //   target: `models/${name}-model.js`,
    //   props: { name },
    // })

    // info(`Generated file at models/${name}-model.js`)

    info(parameters);
  },
}
