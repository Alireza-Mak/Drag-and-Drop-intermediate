import { Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { validate, validateType } from '../util/validation';
import { Component } from './base-component';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  titleErrorElement: HTMLParagraphElement;
  descriptionErrorElement: HTMLParagraphElement;
  peopleErrorElement: HTMLParagraphElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.titleErrorElement = this.element.querySelector(
      '#title_error'
    ) as HTMLParagraphElement;
    this.descriptionErrorElement = this.element.querySelector(
      '#description_error'
    ) as HTMLParagraphElement;
    this.peopleErrorElement = this.element.querySelector(
      '#people_error'
    ) as HTMLParagraphElement;

    this.configure();
  }
  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  renderContent(): void {}
  private gatherUserInput(): [string, string, number] | void {
    const enteredTiltle = this.titleInputElement.value.trim();
    const enteredDescription = this.descriptionInputElement.value.trim();
    const enteredProple = this.peopleInputElement.value.trim();
    const titleValidate: validateType = {
      value: enteredTiltle,
      required: true,
      minLength: 4,
      maxLength: 10,
    };
    const descriptionValidate: validateType = {
      value: enteredDescription,
      required: true,
      minLength: 4,
      maxLength: 10,
    };
    const peopleValidate: validateType = {
      value: enteredProple,
      required: true,
      min: 0,
      max: 5,
    };

    if (
      validate(titleValidate) ||
      validate(descriptionValidate) ||
      validate(peopleValidate)
    ) {
      this.showInputsError(
        validate(titleValidate),
        validate(descriptionValidate),
        validate(peopleValidate)
      );
    } else {
      return [enteredTiltle, enteredDescription, +enteredProple];
    }
  }
  private showInputsError(
    titleError: string,
    descriptionError: string,
    peopleError: string
  ) {
    this.cleanErrors();
    if (titleError) {
      this.titleErrorElement.textContent = titleError;
    }
    if (descriptionError) {
      this.descriptionErrorElement.textContent = descriptionError;
    }
    if (peopleError) {
      this.peopleErrorElement.textContent = peopleError;
    }
  }
  private cleanErrors() {
    this.titleErrorElement.textContent = '';
    this.descriptionErrorElement.textContent = '';
    this.peopleErrorElement.textContent = '';
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }
  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
      this.cleanErrors();
    }
  }
}
