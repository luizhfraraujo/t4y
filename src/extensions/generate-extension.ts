
import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {

    const { filesystem, template, print: { success, error } } = toolbox;


    async function isTypescript() {
        const projectPackage = await filesystem.read('package.json', 'json');

        return !!projectPackage.dependencies['typescript'];

    }

    async function generateModel(folder, name) {
        if (!name) {
            error('Name must be specified');
            return
        }

        const modelTemplate = (await isTypescript())
            ? 'model.ts.ejs'
            : 'model.js.ejs';

        const modelExtension = (await isTypescript())
            ? 'model.ts'
            : 'model.js';

        await template.generate({
            template: modelTemplate,
            target: `${folder}/${name}.${modelExtension}`,
        })

    }

    async function createComponent(folder, name) {
        if (!name) {
            error('Name must be specified');
            return
        }

        await template.generate({
            template: 'component.js.ejs',
            target: `${folder}/${name}/index.js`,
            props: { name },
        })

        const styleTemplate = (await isTypescript())
            ? 'styles-rn.ts.ejs'
            : 'styles-react.js.ejs'

        await template.generate({
            template: styleTemplate,
            target: `${folder}/${name}/styles.js`,
        })

        success(`Generated ${folder}/${name}.`)
    }

    toolbox.createComponent = createComponent;
    toolbox.generateModel = generateModel;


    // toolbox.foo = () => {
    //     toolbox.print.info('called foo extension')
    // }
}
