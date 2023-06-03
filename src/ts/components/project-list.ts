import { Autobind } from "../decorators/autobind";
import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project-state";
import { Component } from "./base-component";
import { ProjectItem } from "./project-item";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignProjects = [];

    this.configure();
    this.renderContent();
  }
  @Autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const ulElement = this.element.querySelector('ul')! as HTMLUListElement;
      ulElement.classList.add('droppable');
    }
  }
  @Autobind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHIED
    );
  }

  @Autobind
  dragLeaveHandler(_: DragEvent): void {
    const ulElement = this.element.querySelector('ul')! as HTMLUListElement;
    ulElement.classList.remove('droppable');
  }
  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj: Project) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.ACTIVE;
        } else {
          return prj.status === ProjectStatus.FINISHIED;
        }
      });
      this.assignProjects = relevantProjects;
      this.renderProjects();
    });
  }
  renderContent(): void {
    const listid = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listid;
    this.element.querySelector('h2')!.textContent =
      `${this.type} projects`.toUpperCase();
  }
  private renderProjects() {
    const ulElement = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    ulElement.innerHTML = '';
    for (const project of this.assignProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, project);
    }
  }
}