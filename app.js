
const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log('Enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: gitName => {
                if(gitName){
                    return true;
                } else {
                    console.log('Enter your Gitname!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};

const promptProject = portfolioData => {
    
    if (!portfolioData.projects) {
    portfolioData.projects = [];
    }
    
    console.log(`
    =================
    Add a New Project
    =================
    `);
        return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectName => {
                if(projectName){
                    return true;
                } else {
                    console.log('Enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescription => {
                if(projectDescription){
                    return true;
                } else {
                    console.log('Enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: gitLink => {
                if(gitLink){
                    return true;
                } else {
                    console.log('Enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData =>{
        portfolioData.projects.push(projectData);

        if(projectData.confirmAddProject){
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};


promptUser()
.then(promptProject)
.then(portfolioData =>{
    console.log(portfolioData);
});
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');


// const [name, github] = profileDataArgs;


// fs.writeFile('./index.html', generatePage(name, github), err =>{
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! Check out index.html to see output!');
// });

