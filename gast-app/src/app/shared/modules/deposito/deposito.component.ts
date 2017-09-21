import { Component, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { IModalDialog, IModalDialogOptions, IModalDialogSettings, IModalDialogButton }  from 'ngx-modal-dialog';
import { Observable, Subject } from "rxjs";

@Component({
    selector: 'app-deposito',
    templateUrl: './deposito.component.html',
    styleUrls: ['./deposito.component.scss'],
})
export class DepositoComponent implements IModalDialog {
    actionButtons: IModalDialogButton[];

    public settings: IModalDialogSettings = {
        overlayClass: 'modal-backdrop',
        modalClass: 'modal',
        contentClass: 'modal-content',
        headerClass: 'modal-header',
        headerTitleClass: 'modal-title',
        closeButtonClass: 'close glyphicon glyphicon-remove',
        closeButtonTitle: 'CLOSE',
        bodyClass: 'modal-body',
        footerClass: 'modal-footer',
        alertClass: 'shake',
        alertDuration: 250,
        notifyWithAlert: true,
        buttonClass: 'btn btn-primary'
    };

    public title: string;
    public onClose: () => Promise<any> | Observable<any> | boolean;
    public showAlert: boolean = false;

    private _inProgress = false;
    private _alertTimeout: number;
    private _childInstance: any;

    private _closeDialog$: Subject<void>;

    constructor() {
        this.actionButtons = [
            { text: 'chiudi senza salvare' }, // no special processing here
            { text: 'registra', onAction: () => true }
        ];
    }

    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        // no processing needed
    }

}
