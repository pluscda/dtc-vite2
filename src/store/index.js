import { Subject,BehaviorSubject } from 'rxjs';

export const pharmacyTab$ =  new Subject();
export const logout$ = new Subject();
export const leftSideBar$ =  new BehaviorSubject(1);
export const opdAddPerson$ =  new BehaviorSubject('');
export const opdRegister$ = new Subject();