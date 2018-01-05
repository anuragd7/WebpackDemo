import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { DeviceType } from "ui/enums";
import { device, isAndroid, isIOS } from "platform";
import * as application from "application";
import * as fs from "tns-core-modules/file-system";
import { setBoolean } from "application-settings";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent
    ],
    providers: [
        ItemService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
    constructor() {
        if (device.deviceType === DeviceType.Tablet) {
            setBoolean('isTablet', true);
            // if (isIOS) {
            const cssFileName = fs.path.join(fs.knownFolders.currentApp().path, "tablet.css");
            fs.File.fromPath(cssFileName).readText().then((result: string) => {
                application.addCss(result);
            });
            console.log("tablet css is chosen");
        }
        else {
            setBoolean('isTablet', false);
            const cssFileName = fs.path.join(fs.knownFolders.currentApp().path, "phone.css");
            fs.File.fromPath(cssFileName).readText().then((result: string) => {
                application.addCss(result);
            });
            console.log("phone css is chosen");
        }
    }
}
