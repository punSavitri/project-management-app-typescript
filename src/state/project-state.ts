import { Project, ProjectStatus } from "../models/project.js";

//project management state class 
export class ProjectState{

    //listener
    private listeners: any[] = []


    //fields
    private projects: Project[] = [];   //apply Project class here 
    private  static instance: ProjectState;

    //private constructor
    private constructor() {}

    static getInstance() {

        if(this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    //added listeners function 
    addListener(listenerFn: Function) {
        this.listeners.push(listenerFn);

    }
    //this method call when user click on Add Project button
    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(), 
            title, 
            description, 
            numOfPeople, 
            ProjectStatus.Active   //setting the project status Active by default
        )
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }  
}
export const projectState = ProjectState.getInstance();