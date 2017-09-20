import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AvvisoService } from '../../shared/services/avviso.service';
import { User, Avviso } from '../../model';
import * as moment from 'moment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private user: User;
    private avviso: Avviso;

    private titles = ['avviso', 'descrizione', 'prezzo base', 'delegato', 'n. offerte', 'stato'];
    private fields = ['avviso', 'descrizione', 'prezzo', 'delegato', 'offerte', 'stato'];
    private avvisi = [
        {
            avviso: '200',
            descrizione: 'Praesent eget euismod dui, et venenatis sapien.',
            prezzo: 985400.25,
            delegato: 'Francesco Riparelli',
            offerte: 2,
            stato: 'OFFERTE'
        },
        {
            avviso: '100',
            descrizione: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            prezzo: 20000.75,
            delegato: 'Francesco Riparelli',
            offerte: 5,
            stato: 'AMMISSIONE_OFFERTE'
        },
        {
            avviso: '200',
            descrizione: 'Donec eu tortor cursus, congue mi nec, bibendum ex.',
            prezzo: 5400.00,
            delegato: 'Francesco Riparelli',
            offerte: 12,
            stato: 'APERTURA_BUSTE'
        },
        {
            avviso: '200',
            descrizione: 'Sed metus magna, porttitor ut diam non, porta efficitur quam.',
            prezzo: 5895400.80,
            delegato: 'Francesco Riparelli',
            offerte: 8,
            stato: 'ASTA_INCANTO'
        }
    ];
    private accessByState = {
        OFFERTE: false,
        AMMISSIONE_OFFERTE: true,
        APERTURA_BUSTE: true,
        ASTA_INCANTO: true
    };

    constructor(
        private router: Router,
        private activate: ActivatedRoute,
        private userService: UserService,
        private avvisoService: AvvisoService
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
        this.avviso = this.avvisoService.reset();
        console.log('user home', this.user);
    }

    goRoom(room: string, stato: string) {
        this.avviso = {
            id: room,
            state: stato
        };
        this.avvisoService.avvisoSelect(this.avviso);
        this.router.navigate(['./room']);
    }

    isDisabled(stato) {
        return !this.accessByState[stato];
    }

}
