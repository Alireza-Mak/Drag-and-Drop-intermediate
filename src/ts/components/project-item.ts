import { Autobind } from "../decorators/autobind";
import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { projectState } from "../state/project-state";
import { Component } from "./base-component";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;
  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  get person() {
    if (this.project.people === 1) {
      return `Participants: ${this.project.people.toString()} person assigned.`;
    }
    return `Participants: ${this.project.people.toString()} people assigned.`;
  }
  @Autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent): void {}

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
    this.element
      .querySelector('button')!
      .addEventListener('click', this.deleteItem);
  }
  renderContent(): void {
    this.element.querySelector('h2')!.textContent =`Title: ${this.project.title}`;
    this.element.querySelector('h3')!.textContent = this.person;
    this.element.querySelector('button')!.textContent = 'Delete';
    this.element.querySelector('button')!.id = this.project.id;
    this.element.querySelector(
      'p'
    )!.textContent = `Description:  ${this.project.description}`;
  }
  @Autobind
  deleteItem(): void {
    projectState.deleteProject(this.project.id);
  }
}
