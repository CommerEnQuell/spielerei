import { NgModule }  from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuakeComponent } from './quakes/quake/quake.component';
import { KnmiComponent } from './weer/knmi/knmi.component';



const mainRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'aardbevingen', component: QuakeComponent },
    { path: 'weerhistorie', component: KnmiComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(mainRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {}