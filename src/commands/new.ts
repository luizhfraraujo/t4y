
import { GluegunToolbox } from 'gluegun'


module.exports = {
    name: 'new',
    run: async (toolbox: GluegunToolbox) => {
        const {
            parameters,
            generateModel,
            //template: { generate },
            print: { info },
        } = toolbox

        const name = parameters.first


    },
}
