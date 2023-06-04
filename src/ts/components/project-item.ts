import { Autobind } from '../decorators/autobind';
import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project';
import { projectState } from '../state/project-state';
import { Component } from './base-component';

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;
  static selectedItem: HTMLLIElement | null;
  static status: string;
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
  dragStartHandler(event: DragEvent | TouchEvent): void {
    if (event instanceof DragEvent) {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }
    if (event instanceof TouchEvent) {
      const element = event.target as HTMLElement;
      if (element.tagName === 'BUTTON') {
      } else if (element.tagName !== 'LI') {
        const ul = element.parentElement!.parentElement!.id.split('-')[0];
        ProjectItem.status = ul;
        ProjectItem.selectedItem = element.parentElement as HTMLLIElement;
      } else {
        const ul = element.parentElement!.id.split('-')[0];
        ProjectItem.status = ul;
        ProjectItem.selectedItem = element as HTMLLIElement;
      }
      if (ProjectItem.selectedItem) {
        ProjectItem.selectedItem.style.height =
          ProjectItem.selectedItem.clientHeight.toString();
        ProjectItem.selectedItem.style.width =
          ProjectItem.selectedItem.clientWidth.toString();
        ProjectItem.selectedItem.style.position = 'fixed';
        ProjectItem.selectedItem.style.zIndex = '-10';
      }
    }
  }
  TouchMoveHandler = (event: TouchEvent) => {
    event.preventDefault(); // Prevent default touchmove behavior
    if (ProjectItem.selectedItem) {
      const touch = event.touches[0];

      // Update the xPos and yPos with the touch position
      const xPos = touch.clientX;
      const yPos = touch.clientY;

      // Update the position of the element
      ProjectItem.selectedItem.style.left = xPos + 'px';
      ProjectItem.selectedItem.style.top = yPos + 'px';

      const activeProjectsList = document.getElementById(
        'active-projects-list'
      );
      const finishedProjectsList = document.getElementById(
        'finished-projects-list'
      );

      activeProjectsList!.classList.remove('droppable');
      finishedProjectsList!.classList.remove('droppable');

      // Find the target element based on the touch position
      const target = document.elementFromPoint(xPos, yPos);

      // Check if the target lists are the active projects list and finished projects list
      const isTargetActive = activeProjectsList!.contains(target);
      const isTargetFinished = finishedProjectsList!.contains(target);

      // Change the style of the target lists
      if (isTargetActive) {
        activeProjectsList!.classList.add('droppable');
      } else if (isTargetFinished) {
        finishedProjectsList!.classList.add('droppable');
      }
    }
  };

  dragEndHandler(_: DragEvent): void {}

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('touchstart', this.dragStartHandler);
    this.element.addEventListener('touchmove', this.TouchMoveHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
    this.element
      .querySelector('button')!
      .addEventListener('click', this.deleteItem);
  }
  renderContent(): void {
    this.element.querySelector(
      'h2'
    )!.textContent = `Title: ${this.project.title}`;
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
