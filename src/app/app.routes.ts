import { Routes } from '@angular/router';
import { ListaContatosComponent } from './pages/lista-contatos/lista-contatos.component';
import { FormularioContatoComponent } from './pages/formulario-contato/formulario-contato.component';
import { PerfilContatoComponent } from './pages/perfil-contato/perfil-contato.component';

export const routes: Routes = [
    {
        path: 'formulario',
        component: FormularioContatoComponent
    },
    {
        path: 'formulario/:id', 
        component: FormularioContatoComponent
    },
    {
        path: 'lista-contatos',
        component: ListaContatosComponent
    },
    {
        path: '',
        redirectTo: '/lista-contatos',
        pathMatch: 'full'
    },
    { 
        path: 'perfil-contato/:id', 
        component: PerfilContatoComponent 
    },
];
