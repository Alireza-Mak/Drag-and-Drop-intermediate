import { Project, ProjectStatus } from "../models/project";
// State Component  Class
class StateComponent<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

// Project State Class
type Listener<T> = (projects: T[]) => void;

class ProjectState extends StateComponent<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }
  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }
  addProject(title: string, description: string, people: number) {
    const id = Math.random().toString();
    const project = new Project(
      id,
      title,
      description,
      people,
      ProjectStatus.ACTIVE
    );
    this.projects.push(project);
    this.updatedListeners();
  }

  moveProject(prjId: string, prjstatus: ProjectStatus) {
    const prj = this.projects.find((prj) => prj.id === prjId);
    if (prj && prj.status !== prjstatus) {
      prj.status = prjstatus;
      this.updatedListeners();
    }
  }
  deleteProject(prjId: string) {
    this.projects = this.projects.filter((project) => project.id !== prjId);
    this.updatedListeners();
  }

  private updatedListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}
// Instantiation
export const projectState = ProjectState.getInstance();
