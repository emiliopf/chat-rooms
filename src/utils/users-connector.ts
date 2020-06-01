import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersConnector {

  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  getToken(data: any) {
    const path = this.config.get('MICRO_USERS_GET_TOKEN_PATH')
    const url = this.url(path);

    return this.http.post(url, data).toPromise();
  }

  create(data: any) {
    const path = this.config.get('MICRO_USERS_CREATE_PATH');
    const url = this.url(path);

    return this.http.post(url, data).toPromise();
  }

  private url(path: string): string {
    const protocol = this.config.get('MICRO_USERS_PROTOCOL');
    const host = this.config.get('MICRO_USERS_HOST');
    const port = this.config.get('MICRO_USERS_PORT');
    
    return `${protocol}://${host}:${port}/${path}`;
  }

}