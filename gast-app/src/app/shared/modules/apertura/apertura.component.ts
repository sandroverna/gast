import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from "ngx-modal-dialog";
import { DepositoComponent } from "../deposito/deposito.component";

@Component({
    selector: 'app-apertura',
    templateUrl: './apertura.component.html',
    styleUrls: ['./apertura.component.scss']
})
export class AperturaComponent implements OnInit {

    private titles = ['data', 'offerente', 'codice fiscale', 'offerta', 'stato'];
    private fields = ['data', 'nominativo', 'codice', 'offerta', 'stato'];
    private avvisi = [
        {
            data: '10/09/2017 13:25:56',
            nominativo: 'GIOVANNI MANZONI',
            codice: 'MNZGNN06H29F839G',
            offerta: null,
            stato: 'CHIUSA',
            isOpen: false,
            isWinner: false
        },
        {
            data: '10/09/2017 14:12:33',
            nominativo: 'ARIEL ZUCCHI',
            codice: 'ZCCRLA03H55L219Y',
            offerta: 65485422,
            stato: 'CONFERMATA',
            isOpen: true,
            isWinner: false
        },
        {
            data: '10/09/2017 14:15:08',
            nominativo: 'RENZA TESTA',
            codice: 'TSTRNZ08S52F839F',
            offerta: 987236535,
            stato: 'NON_VALIDA',
            isOpen: true,
            isWinner: false
        },
        {
            data: '10/09/2017 14:18:42',
            nominativo: 'VIOLAINE ROSSINI',
            codice: 'RSSVLN02B41D612D',
            offerta: null,
            stato: 'CHIUSA',
            isOpen: false,
            isWinner: false
        }
    ];

    constructor(
        private modalService: ModalDialogService,
        private viewRef: ViewContainerRef
    ) { }

    ngOnInit() {}

    openDialog() {
        this.modalService.openDialog(this.viewRef, {
            title: 'Deposita busta cartacea',
            childComponent: DepositoComponent,
            data: {pippo: 'pluto'}
        });
    }

    open(index) {
        this.avvisi[index].isOpen = true;
        this.avvisi[index].stato = 'APERTA';
    }

    confermata(index) {
        this.avvisi[index].stato = 'CONFERMATA';
    }

    nonValida(index) {
        this.avvisi[index].stato = 'NON_VALIDA';
    }

    assegna(index){
        this.avvisi.map((avviso, i) => {
            if(i !== index){
                avviso.isWinner = false;
                if(avviso.stato === 'ASSEGNATO'){
                    avviso.stato = 'CONFERMATA';
                }
            }
        });
        if(this.avvisi[index].isWinner){
            this.avvisi[index].stato = 'ASSEGNATO';
        }
    }

    isOfferta(avviso) {
        return avviso.offerta === null;
    }

    isValida(avviso) {
        return avviso.stato === 'CONFERMATA' || avviso.stato === 'ASSEGNATO';
    }

    isConfermata(avviso) {
        return avviso.stato === 'CONFERMATA' || avviso.stato === 'ASSEGNATO' || avviso.offerta === null;
    }

    isNonValida(avviso) {
        return avviso.stato === 'NON_VALIDA' || avviso.offerta === null;
    }

    isAssegnato() {
        let result = false;
        this.avvisi.map((avviso) => {
            if(avviso.isWinner){
                result = true;
            }
        });
        return result;
    }
}
