import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LoadingComponent } from './components/_shared/loading/loading.component';
import { IRMStorage } from './utils/storage.utils';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/pages/login/login.component';
import { IRMToolbarComponent } from './components/_shared/design/irm-toolbar/irm-toolbar.component';
import { IRMSidenavComponent } from './components/_shared/design/irm-sidenav/irm-sidenav.component';
import { AuthService } from './services/auth.api.service';
import { notification } from './utils/notification.utils';
import { IRMScheduler } from './utils/scheduler.utils';
import { NodeApiService } from './services/api/node.api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, CommonModule, LoginComponent, IRMToolbarComponent,
            IRMSidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  storage = IRMStorage
  public readonly route = inject(ActivatedRoute)
  public readonly auth  = inject(AuthService)
  public readonly nodes = inject(NodeApiService)

  public readonly custom_urls = ['login']
  public readonly get_url = () => window.location.href

  private readonly renew_token = async () => {
    const tokenStatus = await this.auth.renew()
    if(tokenStatus.token){
      this.auth.set_token(tokenStatus.token)
    }
    return tokenStatus.token
  }

  private readonly init = async () => {
    const token = this.auth.get_token()
    this.nodes.Get()
    if(token){
      const tokenStatus = await this.auth.renew()
      if(tokenStatus.token){
        this.auth.set_token(tokenStatus.token)
        // IRMStorage.User = {}
        IRMScheduler.Schedule('renew_token', this.renew_token, 1800)
        notification.Toast.Info('Bienvenido a Mercurio')



      }
    }

  }

  async ngOnInit() {
    await this.init()
    this.storage.AppLoading.next(false)
  }
}
