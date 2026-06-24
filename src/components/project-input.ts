import {autobind} from "../util/autobind.js";
import { Validatable, validate } from "../util/validation.js";

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
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionElement = this.element.querySelector('#description') as HTMLTextAreaElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

       
        //call attach method to render form element
            this.attach();
            this.configure();
        
    }
    private gatherUserInput():[string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionElement.value;
        const enteredPeople = this.peopleInputElement.value;

        //validation rules for each field
        const titleValid: Validatable = {value: enteredTitle, required: true  };
        const descValid: Validatable = {value: enteredDescription, required: true, minLength: 5};
        const peopleValid: Validatable = {value: +enteredPeople, required: true, min: 1, max:5 };

        //run validation checks
        if (!validate(titleValid) || !validate(descValid) || !validate(peopleValid)) {
            alert('Invalid input, please try again!');
            return;
        }
        //return validates values as a tuple
        return [enteredTitle, enteredDescription, +enteredPeople];

    }

     // @autobind ensures "this" refers to the class instance even when used as a callback
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        //console.log(this.titleInputElement.value);
        //get validated user input
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [enteredTitle, enteredDescription, enteredPeople] = userInput;
            console.log(enteredTitle, enteredDescription,enteredPeople );
        }

        //clear input fields after succeessfully submission
        this.clearInputsField();

    }
    private clearInputsField() {
        this.titleInputElement.value = '';
        this.descriptionElement.value = '';
        this.peopleInputElement.value = '';
    }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    //method to render form element at the top of the host element
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    } 

    
}