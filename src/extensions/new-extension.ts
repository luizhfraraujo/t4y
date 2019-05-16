
import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {

    const { template, filesystem, print: { success, error, info } } = toolbox;

    async function newProject(name, templateType) {
        if (!name) {
            error('Name must be specified');
            return
        } else {
            if (filesystem.exists(name)) {
                error(`Project ${name} exists...`);
                return
            }
        }

        const timer = toolbox.system.startTimer();

        await template.generate({
            template: 'gitignore.ejs',
            target: `${name}/.gitignore`,
            props: { name },
        });
        success(`Generated ${name}/.gitignore`);


        await template.generate({
            template: `projects/${templateType}/package.json.ejs`,
            target: `${name}/package.json`,
            props: { name },
        });
        success(`Generated ${name}/package.json`);

        await template.generate({
            template: `projects/${templateType}/config.js.ejs`,
            target: `${name}/src/config.js`,
            props: { name },
        });
        success(`Generated ${name}/src/config.js`);

        await template.generate({
            template: `projects/${templateType}/app.js.ejs`,
            target: `${name}/src/app.js`,
            props: { name },
        });
        success(`Generated ${name}/src/app.js`);

        await template.generate({
            template: `projects/${templateType}/server.js.ejs`,
            target: `${name}/bin/server.js`,
            props: { name },
        });
        success(`Generated ${name}/bin/server.js`);

        await template.generate({
            template: 'fluent-validator.js.ejs',
            target: `${name}/src/validators/fluent-validator.js`,
            props: { name },
        });
        success(`Generated ${name}/src/validators/fluent-validator.js`);

        //Repositories
        await template.generate({
            template: 'repository.js.ejs',
            target: `${name}/src/repositories/values-repository.js`,
            props: { name },
        });
        success(`Generated ${name}/src/repositories/values-repository.js`);

        await template.generate({
            template: 'controller.js.ejs',
            target: `${name}/src/controllers/values-controller.js`,
            props: { name },
        });
        success(`Generated ${name}/src/controllers/values-controller.js`);
        info('');
        info('');
        success(` Project ${name} created in ${timer()}ms with template ${templateType}`);
        info('');
        info('');
        info('Next:');
        info(` $ cd ${name}`);
        info(` $ npm install`);
        info(` $ npm start`);
        info('');
        info('');
        info(`- Thanks for using t4y CLI!`);
        info('');
        info('');

    }

    toolbox.newProject = newProject;


    // toolbox.foo = () => {
    //     toolbox.print.info('called foo extension')
    // }
}
