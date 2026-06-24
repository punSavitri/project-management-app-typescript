//handles to render form element on the page
export class ProjectInput{

    templateElement:HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    //form input fields
    titleInputElement: HTMLInputElement;
    descriptionElement: HTMLTextAreaElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        //selecting the <Template> element containing the form structure
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        //the main div with id="app" where form will be inserted using TypeScript
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        //import the template content into the DOM
        const importNode = document.importNode(this.templateElement.content, true);
        //extract the form element from the imported template
        this.element = importNode.firstElementChild as HTMLFormElement;
        //added id for styling 
        this.element.id = 'user-input';

        //connect form fields to class properties for easy access
        this.titleInputElement = document.querySelector('#title') as HTMLInputElement;
        this.descriptionElement = document.querySelector('#description') as HTMLTextAreaElement;
        this.peopleInputElement = document.querySelector('#people') as HTMLInputElement;

        this.configure();
        //call attach method to render form element
        this.attach();
        
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    //method to render form element at the top of the host element
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    } 

    
}