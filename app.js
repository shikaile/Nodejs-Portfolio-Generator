const {writeFile, copyFile} = require('./utils/generate-site.js');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');

//for temp use to be deleted
// const mockData = {
//     name: 'Lernantino',
//     github: 'lernantino',
//     confirmAbout: true,
//     about:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
    
//         projects: [
//         {
//         name: 'Run Buddy',
//         description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['HTML', 'CSS'],
//         link: 'https://github.com/lernantino/run-buddy',
//         feature: true,
//         confirmAddProject: true
//         },
//         {
//         name: 'Taskinator',
//         description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['JavaScript', 'HTML', 'CSS'],
//         link: 'https://github.com/lernantino/taskinator',
//         feature: true,
//         confirmAddProject: true
//         },
//         {
//         name: 'Taskmaster Pro',
//         description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//         link: 'https://github.com/lernantino/taskmaster-pro',
//         feature: false,
//         confirmAddProject: true
//         },
//         {
//         name: 'Robot Gladiators',
//         description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//         languages: ['JavaScript'],
//         link: 'https://github.com/lernantino/robot-gladiators',
//         feature: false,
//         confirmAddProject: false
//         }
//     ]
// };

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
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if(confirmAbout){
                    return true;
                }else {
                    return false;
                }
            }
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
    return generatePage(portfolioData);
})
.then(pageHTML => {
    return writeFile(pageHTML);
})
.then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
})
.then(copyFileResponse => {
    console.log(copyFileResponse);
})
.catch(err => {
    console.log(err);
});
//for temp use, to be deleted
// const pageHTML = generatePage(mockData);

// const [name, github] = profileDataArgs;




