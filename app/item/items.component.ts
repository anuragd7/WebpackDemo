import { Component, OnInit } from "@angular/core";


import { Item } from "./item";
import { ItemService } from "./item.service";
import { getBoolean } from "application-settings";


@Component({
    selector: "ns-items",
    moduleId: __filename,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    public isTablet: boolean;
    items: Item[];

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) {
        this.isTablet = getBoolean('isTablet');
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }
}