import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { TestComponent } from './test/test.component';
import { RouterModule } from '@angular/router';


const routes = [
  { path: 'characters', component: TabsComponent,
  children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: ':side', component: ListComponent }
  ] },
  { path: 'new-character', component: CreateCharacterComponent },
  { path: 'test', component: TestComponent},
  { path: '**', redirectTo: '/characters' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
