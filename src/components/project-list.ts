import { Project, ProjectStatus } from "../models/project.js";
import { projectState } from "../state/project-state.js";
import { Component } from "./base-component.js";

//this class responsible to render the project list based on template
export class ProjectList extends Component<HTMLDivElement, HTMLElement>{      

    assignedProjects: Project[] = [];  //used Project custom class to assigned an array of projects


    //the contructor receive the type of project list: 'active' or 'finished'
    constructor(private type: 'active' | 'finished') {

        super('project-list', 'app', false, `${type}-projects`) ;          
        this.assignedProjects = [];
        this.configure();

        //call to update text content and IDs inside the component
        this.renderContent();

    }
    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        //clear list item before to append new project
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }    
     configure() {
        //event listener to assigned new projects
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
                }
             )
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })
     }
    //the method updates the internal content of the component(title + list ID )
     renderContent() {
        
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;         
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}