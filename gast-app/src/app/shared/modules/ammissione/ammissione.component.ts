import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from "ngx-modal-dialog";
import {DepositoComponent} from "../deposito/deposito.component";

@Component({
    selector: 'app-ammissione',
    templateUrl: './ammissione.component.html',
    styleUrls: ['./ammissione.component.scss']
})
export class AmmissioneComponent implements OnInit {

    private titles = ['data', 'offerente', 'codice fiscale', 'stato'];
    private fields = ['data', 'nominativo', 'codice', 'stato'];
    private avvisi = [
        {
            data: '10/09/2017 13:25:56',
            nominativo: 'GIOVANNI MANZONI',
            codice: 'MNZGNN06H29F839G',
            stato: null
        },
        {
            data: '10/09/2017 14:12:33',
            nominativo: 'ARIEL ZUCCHI',
            codice: 'ZCCRLA03H55L219Y',
            stato: 'ACCETTATO'
        },
        {
            data: '10/09/2017 14:15:08',
            nominativo: 'RENZA TESTA',
            codice: 'TSTRNZ08S52F839F',
            stato: 'RIFIUTATO'
        },
        {
            data: '10/09/2017 14:18:42',
            nominativo: 'VIOLAINE ROSSINI',
            codice: 'RSSVLN02B41D612D',
            stato: null
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

    accetta(index) {
        this.avvisi[index].stato = 'ACCETTATO';
    }

    rifiuta(index) {
        this.avvisi[index].stato = 'RIFIUTATO';
    }

    isAccetta(stato) {
        return stato === 'ACCETTATO';
    }

    isRifiuta(stato) {
        return stato === 'RIFIUTATO';
    }
}
