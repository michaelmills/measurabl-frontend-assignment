import { Component, OnInit } from '@angular/core';
import { forkJoin } from "rxjs";
import { MockMsrService } from "../../service/mock-msr.service";

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

    result: any[] = [];

    constructor(private mockMsrService: MockMsrService) {
    }

    ngOnInit() {
        forkJoin([this.mockMsrService.pullAges(), this.mockMsrService.pullNames()])
            .subscribe(([ages, names]) => {
                let ids = new Set([...ages, ...names].map(i => i.id));

                ids.forEach(entry => {
                    let id = entry.valueOf();
                    let person = names.find(i => i.id === id);
                    let age = ages.find(i => i.id === id);

                    this.result.push({id: id, person: person, age: age});
                });

                this.result.sort((a,b) => +a.id < +b.id ? -1 : 0);
            }, () => console.log("failed"));
    }

}
