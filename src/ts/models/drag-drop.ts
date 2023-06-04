export interface Draggable {
  dragStartHandler: (event: DragEvent | TouchEvent) => void;
  TouchMoveHandler: (event: TouchEvent) => void;
  dragEndHandler: (event: DragEvent) => void;
}
export interface DragTarget {
  dragOverHandler: (event: DragEvent) => void;
  dropHandler: (event: DragEvent | TouchEvent) => void;
  dragLeaveHandler: (event: DragEvent) => void;
}
