
import { Component } from "./base-component.js";
import { Project } from "../models/project.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>{
    private project: Project;

    //getter function
    get persons() {
        
        if(this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }
    constructor(hostId: string, project: Project ){
        super('single-project', hostId, false, project.id );
        this.project = project;
        this.configure();
        this.renderContent();
    }
    configure(){}
    renderContent(){
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.descripton;
        
    }
}