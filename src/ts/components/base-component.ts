export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    private templateId: string,
    private hostElementId: string,
    private insertAtStart: boolean,
    private newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      this.templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(this.hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (this.newElementId) this.element.id = this.newElementId;

    this.attach();
  }
  abstract configure(): void;
  abstract renderContent(): void;
  private attach() {
    this.hostElement.insertAdjacentElement(
      this.insertAtStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}
