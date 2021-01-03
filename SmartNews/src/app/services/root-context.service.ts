import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash'; 

export interface IContext{
    contextId;
    extraproperties;
}

@Injectable({
  providedIn: 'root'
})

export class RootContextService {

  public ContextChange$ = new Subject<IContext>();
  private currentContext: IContext;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  initContext(currentCapability){
    this.currentContext = {
      contextId: '',
      extraproperties: {}
    }
    this.ContextChange$.next(this.currentContext)
  }

  updateCurrentContext(properties){
    _.merge(this.currentContext.extraproperties, properties);
    this.ContextChange$.next(this.currentContext);
  }

  getCurrentContext(){
    return this.currentContext;
  }
}
