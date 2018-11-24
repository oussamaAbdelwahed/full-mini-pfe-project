export abstract class User{
    constructor(
      private nom: string,
      private prenom: string,
      private email: string,
      private cin: number,
      private id?:number
    ) {}
}