(()=>{"use strict";function e(e,t,r){const n=r.value;return{configurable:!0,enumerable:!1,get(){return n.bind(this)}}}var t;!function(e){e[e.ACTIVE=0]="ACTIVE",e[e.FINISHIED=1]="FINISHIED"}(t||(t={}));class r{constructor(e,t,r,n,s){this.id=e,this.title=t,this.description=r,this.people=n,this.status=s}}class n{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}class s extends n{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new s),this.instance}addProject(e,n,s){const i=Math.random().toString(),o=new r(i,e,n,s,t.ACTIVE);this.projects.push(o),this.updatedListeners()}moveProject(e,t){const r=this.projects.find((t=>t.id===e));r&&r.status!==t&&(r.status=t,this.updatedListeners())}deleteProject(e){this.projects=this.projects.filter((t=>t.id!==e)),this.updatedListeners()}updatedListeners(){for(const e of this.listeners)e(this.projects.slice())}}const i=s.getInstance();function o(e){return e.required&&0===e.value.toString().length?"Value is required.":null!=e.minLength&&"string"==typeof e.value&&e.value.length<e.minLength?`Character should have a minimum length of ${e.minLength}.`:null!=e.maxLength&&"string"==typeof e.value&&e.value.length>e.maxLength?`Character should have a maximum length of ${e.maxLength}.`:null!=e.min&&"number"==typeof+e.value&&+e.value<e.min?`Participants should be greater than or equal to ${e.min}.`:null!=e.max&&"number"==typeof+e.value&&+e.value>e.max?`Participants should be less than or equal to ${e.max}.`:""}class l{constructor(e,t,r,n){this.templateId=e,this.hostElementId=t,this.insertAtStart=r,this.newElementId=n,this.templateElement=document.getElementById(this.templateId),this.hostElement=document.getElementById(this.hostElementId);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,this.newElementId&&(this.element.id=this.newElementId),this.attach()}attach(){this.hostElement.insertAdjacentElement(this.insertAtStart?"afterbegin":"beforeend",this.element)}}class a extends l{constructor(){super("project-input","app",!0,"user-input"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.peopleInputElement=this.element.querySelector("#people"),this.titleErrorElement=this.element.querySelector("#title_error"),this.descriptionErrorElement=this.element.querySelector("#description_error"),this.peopleErrorElement=this.element.querySelector("#people_error"),this.configure()}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}gatherUserInput(){const e=this.titleInputElement.value.trim(),t=this.descriptionInputElement.value.trim(),r=this.peopleInputElement.value.trim(),n={value:e,required:!0,minLength:4,maxLength:10},s={value:t,required:!0,minLength:4,maxLength:10},i={value:r,required:!0,min:0,max:5};if(!(o(n)||o(s)||o(i)))return[e,t,+r];this.showInputsError(o(n),o(s),o(i))}showInputsError(e,t,r){this.cleanErrors(),e&&(this.titleErrorElement.textContent=e),t&&(this.descriptionErrorElement.textContent=t),r&&(this.peopleErrorElement.textContent=r)}cleanErrors(){this.titleErrorElement.textContent="",this.descriptionErrorElement.textContent="",this.peopleErrorElement.textContent=""}clearInputs(){this.titleInputElement.value="",this.descriptionInputElement.value="",this.peopleInputElement.value=""}submitHandler(e){e.preventDefault();const t=this.gatherUserInput();if(Array.isArray(t)){const[e,r,n]=t;i.addProject(e,r,n),this.clearInputs(),this.cleanErrors()}}}!function(e,t,r,n){var s,i=arguments.length,o=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(i<3?s(o):i>3?s(t,r,o):s(t,r))||o);i>3&&o&&Object.defineProperty(t,r,o)}([e],a.prototype,"submitHandler",null);var c=function(e,t,r,n){var s,i=arguments.length,o=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(i<3?s(o):i>3?s(t,r,o):s(t,r))||o);return i>3&&o&&Object.defineProperty(t,r,o),o};class h extends l{constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}get person(){return 1===this.project.people?`Participants: ${this.project.people.toString()} person assigned.`:`Participants: ${this.project.people.toString()} people assigned.`}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler),this.element.querySelector("button").addEventListener("click",this.deleteItem)}renderContent(){this.element.querySelector("h2").textContent=`Title: ${this.project.title}`,this.element.querySelector("h3").textContent=this.person,this.element.querySelector("button").textContent="Delete",this.element.querySelector("button").id=this.project.id,this.element.querySelector("p").textContent=`Description:  ${this.project.description}`}deleteItem(){i.deleteProject(this.project.id)}}c([e],h.prototype,"dragStartHandler",null),c([e],h.prototype,"deleteItem",null);var d=function(e,t,r,n){var s,i=arguments.length,o=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(i<3?s(o):i>3?s(t,r,o):s(t,r))||o);return i>3&&o&&Object.defineProperty(t,r,o),o};class p extends l{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignProjects=[],this.configure(),this.renderContent()}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dropHandler(e){const r=e.dataTransfer.getData("text/plain");i.moveProject(r,"active"===this.type?t.ACTIVE:t.FINISHIED)}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("drop",this.dropHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),i.addListener((e=>{const r=e.filter((e=>"active"===this.type?e.status===t.ACTIVE:e.status===t.FINISHIED));this.assignProjects=r,this.renderProjects()}))}renderContent(){const e=`${this.type}-projects-list`;this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent=`${this.type} projects`.toUpperCase()}renderProjects(){document.getElementById(`${this.type}-projects-list`).innerHTML="";for(const e of this.assignProjects)new h(this.element.querySelector("ul").id,e)}}d([e],p.prototype,"dragOverHandler",null),d([e],p.prototype,"dropHandler",null),d([e],p.prototype,"dragLeaveHandler",null),new a,new p("active"),new p("finished")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b3AvLi9zcmMvZGVjb3JhdG9ycy9hdXRvYmluZC50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL3N0YXRlL3Byb2plY3Qtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL3V0aWwvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LnRzIiwid2VicGFjazovL2RyYWctZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaXRlbS50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gQXV0b2JpbmQoXzogYW55LCBfMjogc3RyaW5nIHwgbnVtYmVyLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcclxuICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgY29uc3QgYWRqRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICBnZXQoKSB7XHJcbiAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xyXG4gICAgICByZXR1cm4gYm91bmRGbjtcclxuICAgIH0sXHJcbiAgfTtcclxuICByZXR1cm4gYWRqRGVzY3JpcHRvcjtcclxufVxyXG4iLCJleHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtcclxuICBBQ1RJVkUsXHJcbiAgRklOSVNISUVELFxyXG59XHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBpZDogc3RyaW5nLFxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHB1YmxpYyBwZW9wbGU6IG51bWJlcixcclxuICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcclxuICApIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xyXG4vLyBTdGF0ZSBDb21wb25lbnQgIENsYXNzXHJcbmNsYXNzIFN0YXRlQ29tcG9uZW50PFQ+IHtcclxuICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBMaXN0ZW5lcjxUPltdID0gW107XHJcbiAgYWRkTGlzdGVuZXIobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXJGbik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBQcm9qZWN0IFN0YXRlIENsYXNzXHJcbnR5cGUgTGlzdGVuZXI8VD4gPSAocHJvamVjdHM6IFRbXSkgPT4gdm9pZDtcclxuXHJcbmNsYXNzIFByb2plY3RTdGF0ZSBleHRlbmRzIFN0YXRlQ29tcG9uZW50PFByb2plY3Q+IHtcclxuICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFByb2plY3RTdGF0ZSgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICB9XHJcbiAgYWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBwZW9wbGU6IG51bWJlcikge1xyXG4gICAgY29uc3QgaWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoXHJcbiAgICAgIGlkLFxyXG4gICAgICB0aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIHBlb3BsZSxcclxuICAgICAgUHJvamVjdFN0YXR1cy5BQ1RJVkVcclxuICAgICk7XHJcbiAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgICB0aGlzLnVwZGF0ZWRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIG1vdmVQcm9qZWN0KHByaklkOiBzdHJpbmcsIHByanN0YXR1czogUHJvamVjdFN0YXR1cykge1xyXG4gICAgY29uc3QgcHJqID0gdGhpcy5wcm9qZWN0cy5maW5kKChwcmopID0+IHByai5pZCA9PT0gcHJqSWQpO1xyXG4gICAgaWYgKHByaiAmJiBwcmouc3RhdHVzICE9PSBwcmpzdGF0dXMpIHtcclxuICAgICAgcHJqLnN0YXR1cyA9IHByanN0YXR1cztcclxuICAgICAgdGhpcy51cGRhdGVkTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGRlbGV0ZVByb2plY3QocHJqSWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkICE9PSBwcmpJZCk7XHJcbiAgICB0aGlzLnVwZGF0ZWRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlZExpc3RlbmVycygpIHtcclxuICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICBsaXN0ZW5lckZuKHRoaXMucHJvamVjdHMuc2xpY2UoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbi8vIEluc3RhbnRpYXRpb25cclxuZXhwb3J0IGNvbnN0IHByb2plY3RTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xyXG4iLCJleHBvcnQgaW50ZXJmYWNlIHZhbGlkYXRlVHlwZSB7XHJcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxuICByZXF1aXJlZD86IHRydWUgfCBmYWxzZTtcclxuICBtaW5MZW5ndGg/OiBudW1iZXI7XHJcbiAgbWF4TGVuZ3RoPzogbnVtYmVyO1xyXG4gIG1pbj86IG51bWJlcjtcclxuICBtYXg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZSh2YWxpZGF0YWJsZUlucHV0OiB2YWxpZGF0ZVR5cGUpIHtcclxuICBpZiAodmFsaWRhdGFibGVJbnB1dC5yZXF1aXJlZCkge1xyXG4gICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQudmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuICdWYWx1ZSBpcyByZXF1aXJlZC4nO1xyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoXHJcbiAgICB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aCAhPSBudWxsICYmXHJcbiAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ3N0cmluZydcclxuICApIHtcclxuICAgIGlmICh2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA8IHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBgQ2hhcmFjdGVyIHNob3VsZCBoYXZlIGEgbWluaW11bSBsZW5ndGggb2YgJHt2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aH0uYDtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKFxyXG4gICAgdmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGggIT0gbnVsbCAmJlxyXG4gICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnXHJcbiAgKSB7XHJcbiAgICBpZiAodmFsaWRhdGFibGVJbnB1dC52YWx1ZS5sZW5ndGggPiB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aCkge1xyXG4gICAgICByZXR1cm4gYENoYXJhY3RlciBzaG91bGQgaGF2ZSBhIG1heGltdW0gbGVuZ3RoIG9mICR7dmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGh9LmA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChcclxuICAgIHZhbGlkYXRhYmxlSW5wdXQubWluICE9IG51bGwgJiZcclxuICAgIHR5cGVvZiArdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcidcclxuICApIHtcclxuICAgIGlmICgrdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA8IHZhbGlkYXRhYmxlSW5wdXQubWluKSB7XHJcbiAgICAgIHJldHVybiBgUGFydGljaXBhbnRzIHNob3VsZCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJHt2YWxpZGF0YWJsZUlucHV0Lm1pbn0uYDtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKFxyXG4gICAgdmFsaWRhdGFibGVJbnB1dC5tYXggIT0gbnVsbCAmJlxyXG4gICAgdHlwZW9mICt2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnbnVtYmVyJ1xyXG4gICkge1xyXG4gICAgaWYgKCt2YWxpZGF0YWJsZUlucHV0LnZhbHVlID4gdmFsaWRhdGFibGVJbnB1dC5tYXgpIHtcclxuICAgICAgcmV0dXJuIGBQYXJ0aWNpcGFudHMgc2hvdWxkIGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAke3ZhbGlkYXRhYmxlSW5wdXQubWF4fS5gO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuICcnO1xyXG59XHJcbiIsImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcclxuICB0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgaG9zdEVsZW1lbnQ6IFQ7XHJcbiAgZWxlbWVudDogVTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdGVtcGxhdGVJZDogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBob3N0RWxlbWVudElkOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIGluc2VydEF0U3RhcnQ6IGJvb2xlYW4sXHJcbiAgICBwcml2YXRlIG5ld0VsZW1lbnRJZD86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgdGhpcy50ZW1wbGF0ZUlkXHJcbiAgICApISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgdGhpcy5ob3N0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaG9zdEVsZW1lbnRJZCkhIGFzIFQ7XHJcblxyXG4gICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShcclxuICAgICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQuY29udGVudCxcclxuICAgICAgdHJ1ZVxyXG4gICAgKTtcclxuICAgIHRoaXMuZWxlbWVudCA9IGltcG9ydGVkTm9kZS5maXJzdEVsZW1lbnRDaGlsZCBhcyBVO1xyXG4gICAgaWYgKHRoaXMubmV3RWxlbWVudElkKSB0aGlzLmVsZW1lbnQuaWQgPSB0aGlzLm5ld0VsZW1lbnRJZDtcclxuXHJcbiAgICB0aGlzLmF0dGFjaCgpO1xyXG4gIH1cclxuICBhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZDtcclxuICBhYnN0cmFjdCByZW5kZXJDb250ZW50KCk6IHZvaWQ7XHJcbiAgcHJpdmF0ZSBhdHRhY2goKSB7XHJcbiAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgdGhpcy5pbnNlcnRBdFN0YXJ0ID8gJ2FmdGVyYmVnaW4nIDogJ2JlZm9yZWVuZCcsXHJcbiAgICAgIHRoaXMuZWxlbWVudFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvcHJvamVjdC1zdGF0ZSc7XHJcbmltcG9ydCB7IHZhbGlkYXRlLCB2YWxpZGF0ZVR5cGUgfSBmcm9tICcuLi91dGlsL3ZhbGlkYXRpb24nO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudD4ge1xyXG4gIHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHBlb3BsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuICB0aXRsZUVycm9yRWxlbWVudDogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgZGVzY3JpcHRpb25FcnJvckVsZW1lbnQ6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gIHBlb3BsZUVycm9yRWxlbWVudDogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoJ3Byb2plY3QtaW5wdXQnLCAnYXBwJywgdHJ1ZSwgJ3VzZXItaW5wdXQnKTtcclxuXHJcbiAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcjdGl0bGUnXHJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcjZGVzY3JpcHRpb24nXHJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnI3Blb3BsZSdcclxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMudGl0bGVFcnJvckVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJyN0aXRsZV9lcnJvcidcclxuICAgICkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uRXJyb3JFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcjZGVzY3JpcHRpb25fZXJyb3InXHJcbiAgICApIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgdGhpcy5wZW9wbGVFcnJvckVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJyNwZW9wbGVfZXJyb3InXHJcbiAgICApIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG5cclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgfVxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpO1xyXG4gIH1cclxuICByZW5kZXJDb250ZW50KCk6IHZvaWQge31cclxuICBwcml2YXRlIGdhdGhlclVzZXJJbnB1dCgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcclxuICAgIGNvbnN0IGVudGVyZWRUaWx0bGUgPSB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlLnRyaW0oKTtcclxuICAgIGNvbnN0IGVudGVyZWREZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWUudHJpbSgpO1xyXG4gICAgY29uc3QgZW50ZXJlZFByb3BsZSA9IHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlLnRyaW0oKTtcclxuICAgIGNvbnN0IHRpdGxlVmFsaWRhdGU6IHZhbGlkYXRlVHlwZSA9IHtcclxuICAgICAgdmFsdWU6IGVudGVyZWRUaWx0bGUsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW5MZW5ndGg6IDQsXHJcbiAgICAgIG1heExlbmd0aDogMTAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb25WYWxpZGF0ZTogdmFsaWRhdGVUeXBlID0ge1xyXG4gICAgICB2YWx1ZTogZW50ZXJlZERlc2NyaXB0aW9uLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgbWluTGVuZ3RoOiA0LFxyXG4gICAgICBtYXhMZW5ndGg6IDEwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBlb3BsZVZhbGlkYXRlOiB2YWxpZGF0ZVR5cGUgPSB7XHJcbiAgICAgIHZhbHVlOiBlbnRlcmVkUHJvcGxlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgbWluOiAwLFxyXG4gICAgICBtYXg6IDUsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChcclxuICAgICAgdmFsaWRhdGUodGl0bGVWYWxpZGF0ZSkgfHxcclxuICAgICAgdmFsaWRhdGUoZGVzY3JpcHRpb25WYWxpZGF0ZSkgfHxcclxuICAgICAgdmFsaWRhdGUocGVvcGxlVmFsaWRhdGUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5zaG93SW5wdXRzRXJyb3IoXHJcbiAgICAgICAgdmFsaWRhdGUodGl0bGVWYWxpZGF0ZSksXHJcbiAgICAgICAgdmFsaWRhdGUoZGVzY3JpcHRpb25WYWxpZGF0ZSksXHJcbiAgICAgICAgdmFsaWRhdGUocGVvcGxlVmFsaWRhdGUpXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gW2VudGVyZWRUaWx0bGUsIGVudGVyZWREZXNjcmlwdGlvbiwgK2VudGVyZWRQcm9wbGVdO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIHNob3dJbnB1dHNFcnJvcihcclxuICAgIHRpdGxlRXJyb3I6IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uRXJyb3I6IHN0cmluZyxcclxuICAgIHBlb3BsZUVycm9yOiBzdHJpbmdcclxuICApIHtcclxuICAgIHRoaXMuY2xlYW5FcnJvcnMoKTtcclxuICAgIGlmICh0aXRsZUVycm9yKSB7XHJcbiAgICAgIHRoaXMudGl0bGVFcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSB0aXRsZUVycm9yO1xyXG4gICAgfVxyXG4gICAgaWYgKGRlc2NyaXB0aW9uRXJyb3IpIHtcclxuICAgICAgdGhpcy5kZXNjcmlwdGlvbkVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uRXJyb3I7XHJcbiAgICB9XHJcbiAgICBpZiAocGVvcGxlRXJyb3IpIHtcclxuICAgICAgdGhpcy5wZW9wbGVFcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBwZW9wbGVFcnJvcjtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBjbGVhbkVycm9ycygpIHtcclxuICAgIHRoaXMudGl0bGVFcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcclxuICAgIHRoaXMuZGVzY3JpcHRpb25FcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcclxuICAgIHRoaXMucGVvcGxlRXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFySW5wdXRzKCkge1xyXG4gICAgdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcclxuICB9XHJcbiAgQEF1dG9iaW5kXHJcbiAgcHJpdmF0ZSBzdWJtaXRIYW5kbGVyKGV2ZW50OiBFdmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KCk7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh1c2VySW5wdXQpKSB7XHJcbiAgICAgIGNvbnN0IFt0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZV0gPSB1c2VySW5wdXQ7XHJcbiAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjcmlwdGlvbiwgcGVvcGxlKTtcclxuICAgICAgdGhpcy5jbGVhcklucHV0cygpO1xyXG4gICAgICB0aGlzLmNsZWFuRXJyb3JzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcclxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3BcIjtcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtXHJcbiAgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTFVMaXN0RWxlbWVudCwgSFRNTExJRWxlbWVudD5cclxuICBpbXBsZW1lbnRzIERyYWdnYWJsZVxyXG57XHJcbiAgcHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0O1xyXG4gIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KSB7XHJcbiAgICBzdXBlcignc2luZ2xlLXByb2plY3QnLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKTtcclxuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG4gIGdldCBwZXJzb24oKSB7XHJcbiAgICBpZiAodGhpcy5wcm9qZWN0LnBlb3BsZSA9PT0gMSkge1xyXG4gICAgICByZXR1cm4gYFBhcnRpY2lwYW50czogJHt0aGlzLnByb2plY3QucGVvcGxlLnRvU3RyaW5nKCl9IHBlcnNvbiBhc3NpZ25lZC5gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGBQYXJ0aWNpcGFudHM6ICR7dGhpcy5wcm9qZWN0LnBlb3BsZS50b1N0cmluZygpfSBwZW9wbGUgYXNzaWduZWQuYDtcclxuICB9XHJcbiAgQEF1dG9iaW5kXHJcbiAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLnByb2plY3QuaWQpO1xyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG4gIH1cclxuXHJcbiAgZHJhZ0VuZEhhbmRsZXIoXzogRHJhZ0V2ZW50KTogdm9pZCB7fVxyXG5cclxuICBjb25maWd1cmUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kSGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpIVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRlbGV0ZUl0ZW0pO1xyXG4gIH1cclxuICByZW5kZXJDb250ZW50KCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID1gVGl0bGU6ICR7dGhpcy5wcm9qZWN0LnRpdGxlfWA7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSB0aGlzLnBlcnNvbjtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKSEudGV4dENvbnRlbnQgPSAnRGVsZXRlJztcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKSEuaWQgPSB0aGlzLnByb2plY3QuaWQ7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJ3AnXHJcbiAgICApIS50ZXh0Q29udGVudCA9IGBEZXNjcmlwdGlvbjogICR7dGhpcy5wcm9qZWN0LmRlc2NyaXB0aW9ufWA7XHJcbiAgfVxyXG4gIEBBdXRvYmluZFxyXG4gIGRlbGV0ZUl0ZW0oKTogdm9pZCB7XHJcbiAgICBwcm9qZWN0U3RhdGUuZGVsZXRlUHJvamVjdCh0aGlzLnByb2plY3QuaWQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kXCI7XHJcbmltcG9ydCB7IERyYWdUYXJnZXQgfSBmcm9tIFwiLi4vbW9kZWxzL2RyYWctZHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0XCI7XHJcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFByb2plY3RJdGVtIH0gZnJvbSBcIi4vcHJvamVjdC1pdGVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3RcclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+XHJcbiAgaW1wbGVtZW50cyBEcmFnVGFyZ2V0XHJcbntcclxuICBhc3NpZ25Qcm9qZWN0czogUHJvamVjdFtdO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogJ2FjdGl2ZScgfCAnZmluaXNoZWQnKSB7XHJcbiAgICBzdXBlcigncHJvamVjdC1saXN0JywgJ2FwcCcsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xyXG4gICAgdGhpcy5hc3NpZ25Qcm9qZWN0cyA9IFtdO1xyXG5cclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICB9XHJcbiAgQEF1dG9iaW5kXHJcbiAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgdWxFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICAgIHVsRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKTtcclxuICAgIH1cclxuICB9XHJcbiAgQEF1dG9iaW5kXHJcbiAgZHJvcEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgcHJqSWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChcclxuICAgICAgcHJqSWQsXHJcbiAgICAgIHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScgPyBQcm9qZWN0U3RhdHVzLkFDVElWRSA6IFByb2plY3RTdGF0dXMuRklOSVNISUVEXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgQEF1dG9iaW5kXHJcbiAgZHJhZ0xlYXZlSGFuZGxlcihfOiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHVsRWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpISBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgdWxFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xyXG4gIH1cclxuICBjb25maWd1cmUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuZHJvcEhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XHJcbiAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgY29uc3QgcmVsZXZhbnRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJqOiBQcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScpIHtcclxuICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFDVElWRTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRklOSVNISUVEO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuYXNzaWduUHJvamVjdHMgPSByZWxldmFudFByb2plY3RzO1xyXG4gICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmVuZGVyQ29udGVudCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGxpc3RpZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGA7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSEuaWQgPSBsaXN0aWQ7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPVxyXG4gICAgICBgJHt0aGlzLnR5cGV9IHByb2plY3RzYC50b1VwcGVyQ2FzZSgpO1xyXG4gIH1cclxuICBwcml2YXRlIHJlbmRlclByb2plY3RzKCkge1xyXG4gICAgY29uc3QgdWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGBcclxuICAgICkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICB1bEVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgdGhpcy5hc3NpZ25Qcm9qZWN0cykge1xyXG4gICAgICBuZXcgUHJvamVjdEl0ZW0odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkLCBwcm9qZWN0KTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQgeyBQcm9qZWN0SW5wdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dCc7XG5pbXBvcnQgeyBQcm9qZWN0TGlzdCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC1saXN0XCI7XG5cbi8vIEluc3RhbnRpYXRpb25cbm5ldyBQcm9qZWN0SW5wdXQoKTtcbm5ldyBQcm9qZWN0TGlzdCgnYWN0aXZlJyk7XG5uZXcgUHJvamVjdExpc3QoJ2ZpbmlzaGVkJyk7XG4iXSwibmFtZXMiOlsiQXV0b2JpbmQiLCJfIiwiXzIiLCJkZXNjcmlwdG9yIiwib3JpZ2luYWxNZXRob2QiLCJ2YWx1ZSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJiaW5kIiwidGhpcyIsIlByb2plY3RTdGF0dXMiLCJQcm9qZWN0IiwiY29uc3RydWN0b3IiLCJpZCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJwZW9wbGUiLCJzdGF0dXMiLCJTdGF0ZUNvbXBvbmVudCIsImxpc3RlbmVycyIsImFkZExpc3RlbmVyIiwibGlzdGVuZXJGbiIsInB1c2giLCJQcm9qZWN0U3RhdGUiLCJzdXBlciIsInByb2plY3RzIiwic3RhdGljIiwiaW5zdGFuY2UiLCJhZGRQcm9qZWN0IiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwicHJvamVjdCIsIkFDVElWRSIsInVwZGF0ZWRMaXN0ZW5lcnMiLCJtb3ZlUHJvamVjdCIsInByaklkIiwicHJqc3RhdHVzIiwicHJqIiwiZmluZCIsImRlbGV0ZVByb2plY3QiLCJmaWx0ZXIiLCJzbGljZSIsInByb2plY3RTdGF0ZSIsImdldEluc3RhbmNlIiwidmFsaWRhdGUiLCJ2YWxpZGF0YWJsZUlucHV0IiwicmVxdWlyZWQiLCJsZW5ndGgiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJtaW4iLCJtYXgiLCJDb21wb25lbnQiLCJ0ZW1wbGF0ZUlkIiwiaG9zdEVsZW1lbnRJZCIsImluc2VydEF0U3RhcnQiLCJuZXdFbGVtZW50SWQiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaG9zdEVsZW1lbnQiLCJpbXBvcnRlZE5vZGUiLCJpbXBvcnROb2RlIiwiY29udGVudCIsImVsZW1lbnQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImF0dGFjaCIsImluc2VydEFkamFjZW50RWxlbWVudCIsIlByb2plY3RJbnB1dCIsInRpdGxlSW5wdXRFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImRlc2NyaXB0aW9uSW5wdXRFbGVtZW50IiwicGVvcGxlSW5wdXRFbGVtZW50IiwidGl0bGVFcnJvckVsZW1lbnQiLCJkZXNjcmlwdGlvbkVycm9yRWxlbWVudCIsInBlb3BsZUVycm9yRWxlbWVudCIsImNvbmZpZ3VyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWJtaXRIYW5kbGVyIiwicmVuZGVyQ29udGVudCIsImdhdGhlclVzZXJJbnB1dCIsImVudGVyZWRUaWx0bGUiLCJ0cmltIiwiZW50ZXJlZERlc2NyaXB0aW9uIiwiZW50ZXJlZFByb3BsZSIsInRpdGxlVmFsaWRhdGUiLCJkZXNjcmlwdGlvblZhbGlkYXRlIiwicGVvcGxlVmFsaWRhdGUiLCJzaG93SW5wdXRzRXJyb3IiLCJ0aXRsZUVycm9yIiwiZGVzY3JpcHRpb25FcnJvciIsInBlb3BsZUVycm9yIiwiY2xlYW5FcnJvcnMiLCJ0ZXh0Q29udGVudCIsImNsZWFySW5wdXRzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInVzZXJJbnB1dCIsIkFycmF5IiwiaXNBcnJheSIsIlByb2plY3RJdGVtIiwiaG9zdElkIiwicGVyc29uIiwiZHJhZ1N0YXJ0SGFuZGxlciIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJlZmZlY3RBbGxvd2VkIiwiZHJhZ0VuZEhhbmRsZXIiLCJkZWxldGVJdGVtIiwiUHJvamVjdExpc3QiLCJ0eXBlIiwiYXNzaWduUHJvamVjdHMiLCJkcmFnT3ZlckhhbmRsZXIiLCJ0eXBlcyIsImNsYXNzTGlzdCIsImFkZCIsImRyb3BIYW5kbGVyIiwiZ2V0RGF0YSIsIkZJTklTSElFRCIsImRyYWdMZWF2ZUhhbmRsZXIiLCJyZW1vdmUiLCJyZWxldmFudFByb2plY3RzIiwicmVuZGVyUHJvamVjdHMiLCJsaXN0aWQiLCJ0b1VwcGVyQ2FzZSIsImlubmVySFRNTCJdLCJzb3VyY2VSb290IjoiIn0=