
//this class responsible to render the project list based on template
export class ProjectList{
    //reference to the template element in the DOM
    templateElement: HTMLTemplateElement;

    //the host element where this component will be rendered (the #app div)
    hostElement: HTMLDivElement;

    //the actual DOM element created from the template
    element: HTMLElement;

    //the contructor receive the type of project list: 'active' or 'finished'
    constructor(private type: 'active' | 'finished') {

        //get the template element that defines the structure of project list
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        
        //get the host element where the list will be inserted
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        
        //import the content of the template (deep clone = true)
        const importNode = document.importNode(this.templateElement.content, true);
        
        //grab the first element inside the template<section>
        this.element = importNode.firstElementChild as HTMLElement;

        //assign the ID like 'active-projects' or 'finished-projects'
        this.element.id = `${this.type}-projects`;
        
        // call to insert the element into the DOM
        this.attach();

        //call to update text content and IDs inside the component
        this.rendercontent();
    }
    
    //the method use to insert the components into the host element
    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }

    //the method updates the internal content of the component(title + list ID )
    private rendercontent() {
        
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;         
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}