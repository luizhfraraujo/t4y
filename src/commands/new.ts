import { GluegunToolbox } from 'gluegun';

module.exports = {
    name: 'new',
    description: 'Start a new project with a pre-defined template',
    run: async (toolbox: GluegunToolbox) => {
        const {
            parameters,
            prompt,
            newProject,
            print: { error },
        } = toolbox;

        let name = parameters.first;

        if (!name) {
            const result = await prompt.ask({
                type: 'input',
                name: 'name',
                message: 'Whats the project name?',
            });
            if (result && result.name) { name = result.name }
        }


        if (!name) {
            error('Name must be specified');
            return;
        }

        const result = await prompt.ask({
            type: 'list',
            name: 'select',
            message: 'What shoes are you wearing?',
            choices: ['basic', 'auth'],
        });

        const projectTemplate = (result && result.select)
            ? result.select
            : 'basic';

        await newProject(name, projectTemplate);

    },
}
