import {
	Directive,
	ElementRef,
	HostListener,
	Input,
	TemplateRef,
	ViewContainerRef,
	ComponentFactory,
	ComponentRef,
	ComponentFactoryResolver,
	ViewChild
} from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';

@Directive({
	selector: '[appLoading]'
})
export class LoadingDirective {
	loadingFactory: ComponentFactory<LoadingComponent>;
	loadingComponent: ComponentRef<LoadingComponent>;

	@Input()
	set appLoading(loading) {
		console.log('lel: ' + JSON.stringify(this.vcRef.element));
		this.vcRef.clear();

		if (loading === null) {
			// create and embed an instance of the loading component
			this.loadingComponent = this.vcRef.createComponent(this.loadingFactory);

			// this.vcRef.element.nativeElement.setAttribute('class', 'test');
		} else {
			// embed the contents of the host template
			this.vcRef.createEmbeddedView(this.templateRef);
		}
	}

	constructor(
		private templateRef: TemplateRef<any>,
		private vcRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver
	) {
		// Create resolver for loading component
		this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
	}
}
