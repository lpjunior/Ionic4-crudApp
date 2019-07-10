import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            loadChildren: '../cadastro/cadastro.module#CadastroPageModule'
          }
        ]
      },
      {
        path: 'cadastro/:id',
        children: [
          {
            path: '',
            loadChildren: '../cadastro/cadastro.module#CadastroPageModule'
          }
        ]
      },
      {
        path: 'lista',
        children: [
          {
            path: '',
            loadChildren: '../lista/lista.module#ListaPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/cadastro',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/cadastro',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
