import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AvvisoService } from '../../shared/services/avviso.service';
import { User, Avviso } from '../../model';
import { ModalDialogService, SimpleModalComponent } from "ngx-modal-dialog";
import { DepositoComponent } from "../../shared/modules/deposito/deposito.component";


@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
    private user: User;
    private avviso: Avviso;

    constructor(
        private router: Router,
        private activate: ActivatedRoute,
        private userService: UserService,
        private avvisoService: AvvisoService,
        private modalService: ModalDialogService,
        private viewRef: ViewContainerRef
    ) {
        this.userService.userInfo().subscribe(res => {
            this.user = res;
        });
        this.avvisoService.avvisoInfo().subscribe(res => {
            this.avviso = res;
        });
    }

    ngOnInit() {
        this.user = this.userService.init();
        this.avviso = this.avvisoService.init();
    }

    openDialog() {
        this.modalService.openDialog(this.viewRef, {
            title: 'Deposita busta cartacea',
            childComponent: DepositoComponent,
            data: {pippo: 'pluto'}
        });
    }
}
