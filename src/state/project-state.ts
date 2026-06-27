//import { Project, ProjectStatus } from "../models/project";

//project management state class 
export class ProjectState{

    //fields
    private projects: any[] = [];
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
    //this method call when user click on Add Project button
    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople,

        };
        this.projects.push(newProject);
    }  
}
//const projectState = ProjectState.getInstance();